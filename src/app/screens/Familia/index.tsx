import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { useUsuarioAtual } from "@/hooks/useUsuarioAtual";
import { useCarteirasFamilia } from "@/hooks/useCarteirasFamilia";
import { formatarValor } from "@/utils/formatadores";

import styles from "./styles";

export default function Familia() {
  const { usuario } = useUsuarioAtual();

  const {
    carteirasVisiveisNaFamilia,
    saldoTotalFamilia,
    carregando,
  } = useCarteirasFamilia({
    usuario,
    carregarMovimentacoes: false,
  });

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerCentralizado}>
          <Text style={styles.textoCarregando}>
            Carregando família...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Família</Text>
        </View>

        <View style={styles.cardResumo}>
          <MaterialIcons name="groups" size={42} color="#007BFF" />

          <Text style={styles.resumoTitulo}>
            Filhos cadastrados
          </Text>

          <Text style={styles.quantidadeMembros}>
            {carteirasVisiveisNaFamilia.length}
          </Text>

          <Text style={styles.resumoSaldoLabel}>
            Saldo dos filhos
          </Text>

          <Text style={styles.resumoSaldoValor}>
            {formatarValor(saldoTotalFamilia)}
          </Text>
        </View>

        <Text style={styles.secaoTitulo}>
          Cofrinhos da família
        </Text>

        {carteirasVisiveisNaFamilia.length === 0 ? (
          <View style={styles.cardMembro}>
            <View style={styles.iconeContainer}>
              <MaterialIcons
                name="child-care"
                size={24}
                color="#007BFF"
              />
            </View>

            <View style={styles.membroInfo}>
              <Text style={styles.nomeMembro}>
                Nenhum filho cadastrado
              </Text>

              <Text style={styles.emailMembro}>
                Cadastre ou vincule um filho para visualizar a família.
              </Text>
            </View>
          </View>
        ) : (
          carteirasVisiveisNaFamilia.map((carteira) => (
            <View
              key={carteira.id_carteira}
              style={styles.cardMembro}
            >
              <View style={styles.iconeContainer}>
                <MaterialIcons
                  name="child-care"
                  size={24}
                  color="#007BFF"
                />
              </View>

              <View style={styles.membroInfo}>
                <Text style={styles.nomeMembro}>
                  {carteira.usuario?.nome ?? "Filho"}
                </Text>

                <Text style={styles.emailMembro}>
                  {carteira.usuario?.email ?? "Sem e-mail informado"}
                </Text>

                <Text style={styles.perfilMembro}>
                  Filho
                </Text>
              </View>

              <View style={styles.saldoContainer}>
                <Text style={styles.saldoLabel}>
                  Cofrinho
                </Text>

                <Text style={styles.saldoValor}>
                  {formatarValor(carteira.saldo)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}