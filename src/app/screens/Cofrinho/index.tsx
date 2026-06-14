import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { getCurrentUser } from "@/services/mesadinha/session.service";
import {
  CarteiraComUsuario,
  listarCarteiras,
  listarMovimentacoes,
} from "@/services/mesadinha/carteira.services";
import type { Movimentacao } from "@/types/navigation";
import { formatarValor } from "@/utils/formatadores";
import styles from "./styles";

export default function Cofrinho() {
  const usuario = getCurrentUser();
  const [carteiras, setCarteiras] = React.useState<CarteiraComUsuario[]>([]);
  const [movimentacoes, setMovimentacoes] = React.useState<Movimentacao[]>([]);

  async function carregarCofrinho() {
    try {
      const [carteirasResponse, movimentacoesResponse] = await Promise.all([
        listarCarteiras(),
        listarMovimentacoes(),
      ]);

      setCarteiras(carteirasResponse);
      setMovimentacoes(movimentacoesResponse);
    } catch (error) {
      console.log("Erro ao carregar cofrinho:", error);
      Alert.alert("Erro", "Não foi possível carregar o cofrinho.");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarCofrinho();
    }, []),
  );

  const saldoTotal = carteiras.reduce(
    (total, carteira) => total + carteira.saldo,
    0,
  );
  const usuarioEhPai = usuario?.id_tipo === 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Cofrinho</Text>
        </View>

        <View style={styles.cardResumo}>
          <MaterialIcons name="savings" size={42} color="#007BFF" />

          <Text style={styles.resumoTitulo}>
            {usuarioEhPai ? "Saldo da família" : "Meu saldo"}
          </Text>

          <Text style={styles.valorTotal}>{formatarValor(saldoTotal)}</Text>
        </View>

        {usuarioEhPai && (
          <>
            <Text style={styles.secaoTitulo}>Saldos por filho</Text>

            {carteiras.map((carteira) => (
              <View key={carteira.id_carteira} style={styles.cardFilho}>
                <View style={styles.cardFilhoIcone}>
                  <MaterialIcons name="person" size={22} color="#007BFF" />
                </View>

                <View style={styles.cardFilhoInfo}>
                  <Text style={styles.nomeFilho}>
                    {carteira.usuario?.nome ?? "Usuário"}
                  </Text>

                  <Text style={styles.emailFilho}>
                    {carteira.usuario?.email ?? "Sem e-mail"}
                  </Text>
                </View>

                <View style={styles.cardFilhoSaldo}>
                  <Text style={styles.labelSaldo}>Saldo</Text>
                  <Text style={styles.valorFilho}>
                    {formatarValor(carteira.saldo)}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        <Text style={styles.historicoTitulo}>Histórico</Text>

        {movimentacoes.length === 0 ? (
          <View style={styles.cardInfo}>
            <Text style={styles.infoTitulo}>Sem movimentações</Text>
            <Text style={styles.infoTexto}>
              As recompensas aprovadas aparecerão aqui.
            </Text>
          </View>
        ) : (
          movimentacoes.map((movimentacao) => (
            <View
              key={movimentacao.id_movimentacao}
              style={styles.cardMovimentacao}
            >
              <View style={styles.movimentacaoIcone}>
                <MaterialIcons
                  name={
                    movimentacao.tipo_movimentacao === "entrada"
                      ? "arrow-downward"
                      : "arrow-upward"
                  }
                  size={22}
                  color={
                    movimentacao.tipo_movimentacao === "entrada"
                      ? "#28a745"
                      : "#dc3545"
                  }
                />
              </View>

              <View style={styles.movimentacaoInfo}>
                <Text style={styles.movimentacaoTitulo}>
                  {movimentacao.tipo_movimentacao === "entrada"
                    ? "Recompensa recebida"
                    : "Saque"}
                </Text>
                <Text style={styles.movimentacaoData}>
                  {new Date(movimentacao.data).toLocaleDateString("pt-BR")}
                </Text>
              </View>

              <Text
                style={
                  movimentacao.tipo_movimentacao === "entrada"
                    ? styles.movimentacaoValorEntrada
                    : styles.movimentacaoValorSaida
                }
              >
                {formatarValor(movimentacao.valor)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
