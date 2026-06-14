import React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { useUsuarioAtual } from "@/hooks/useUsuarioAtual";
import { useCarteirasFamilia } from "@/hooks/useCarteirasFamilia";
import {
  converterMoedaParaNumero,
  formatarMoedaDigitada,
  formatarValor,
} from "@/utils/formatadores";

import styles from "./styles";

export default function Cofrinho() {
  const {
    usuario,
    usuarioEhPai,
    usuarioEhFilho,
  } = useUsuarioAtual();

  const {
    carteirasVisiveisNoCofrinho,
    movimentacoesVisiveisNoCofrinho,
    saldoTotalCofrinho,
    carregando,
  } = useCarteirasFamilia({
    usuario,
    carregarMovimentacoes: true,
  });

  const [carteiraSaque, setCarteiraSaque] =
    React.useState<(typeof carteirasVisiveisNoCofrinho)[number] | null>(null);

  const [valorSaque, setValorSaque] = React.useState("");

  function formatarData(data?: string) {
    if (!data) {
      return "Data não informada";
    }

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
      return "Data não informada";
    }

    return dataConvertida.toLocaleDateString("pt-BR");
  }

  function abrirSaque(
    carteira: (typeof carteirasVisiveisNoCofrinho)[number]
  ) {
    setCarteiraSaque(carteira);
    setValorSaque("");
  }

  function fecharSaque() {
    setCarteiraSaque(null);
    setValorSaque("");
  }

  function confirmarSaque() {
    if (!carteiraSaque) {
      return;
    }

    const valor = converterMoedaParaNumero(valorSaque);

    if (!valor || valor <= 0) {
      Alert.alert("Atenção", "Digite um valor válido para sacar.");
      return;
    }

    if (valor > carteiraSaque.saldo) {
      Alert.alert("Atenção", "O valor do saque é maior que o saldo.");
      return;
    }

    Alert.alert(
      "Saque pendente",
      "A tela já está preparada, mas a rota de saque no back-end ainda será implementada."
    );
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerCentralizado}>
          <Text style={styles.textoCarregando}>
            Carregando cofrinho...
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
          <Text style={styles.titulo}>Cofrinho</Text>
        </View>

        <View style={styles.cardResumo}>
          <MaterialIcons name="savings" size={42} color="#007BFF" />

          <Text style={styles.resumoTitulo}>
            {usuarioEhPai ? "Saldo dos filhos" : "Meu saldo"}
          </Text>

          <Text style={styles.valorTotal}>
            {formatarValor(saldoTotalCofrinho)}
          </Text>
        </View>

        {usuarioEhPai && (
          <>
            <Text style={styles.secaoTitulo}>
              Saldos por filho
            </Text>

            {carteirasVisiveisNoCofrinho.length === 0 ? (
              <View style={styles.cardInfo}>
                <Text style={styles.infoTitulo}>
                  Nenhum filho encontrado
                </Text>

                <Text style={styles.infoTexto}>
                  Cadastre ou vincule filhos para visualizar os cofrinhos.
                </Text>
              </View>
            ) : (
              carteirasVisiveisNoCofrinho.map((carteira) => (
                <View
                  key={carteira.id_carteira}
                  style={styles.cardFilho}
                >
                  <View style={styles.cardFilhoIcone}>
                    <MaterialIcons
                      name="person"
                      size={22}
                      color="#007BFF"
                    />
                  </View>

                  <View style={styles.cardFilhoInfo}>
                    <Text style={styles.nomeFilho}>
                      {carteira.usuario?.nome ?? "Filho"}
                    </Text>

                    <Text style={styles.emailFilho}>
                      {carteira.usuario?.email ?? "Sem e-mail informado"}
                    </Text>
                  </View>

                  <View style={styles.cardFilhoSaldo}>
                    <Text style={styles.labelSaldo}>
                      Saldo
                    </Text>

                    <Text style={styles.valorFilho}>
                      {formatarValor(carteira.saldo)}
                    </Text>

                    <TouchableOpacity
                      style={styles.botaoSacar}
                      activeOpacity={0.7}
                      onPress={() => abrirSaque(carteira)}
                    >
                      <Text style={styles.botaoSacarTexto}>
                        Sacar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </>
        )}

        {usuarioEhFilho && (
          <>
            <Text style={styles.secaoTitulo}>
              Meu cofrinho
            </Text>

            {carteirasVisiveisNoCofrinho.length === 0 ? (
              <View style={styles.cardInfo}>
                <Text style={styles.infoTitulo}>
                  Cofrinho não encontrado
                </Text>

                <Text style={styles.infoTexto}>
                  Aguarde o responsável aprovar uma tarefa para movimentar seu
                  cofrinho.
                </Text>
              </View>
            ) : (
              carteirasVisiveisNoCofrinho.map((carteira) => (
                <View
                  key={carteira.id_carteira}
                  style={styles.cardFilho}
                >
                  <View style={styles.cardFilhoIcone}>
                    <MaterialIcons
                      name="person"
                      size={22}
                      color="#007BFF"
                    />
                  </View>

                  <View style={styles.cardFilhoInfo}>
                    <Text style={styles.nomeFilho}>
                      {carteira.usuario?.nome ??
                        usuario?.nome ??
                        "Filho"}
                    </Text>

                    <Text style={styles.emailFilho}>
                      {carteira.usuario?.email ??
                        usuario?.email ??
                        "Sem e-mail informado"}
                    </Text>
                  </View>

                  <View style={styles.cardFilhoSaldo}>
                    <Text style={styles.labelSaldo}>
                      Saldo
                    </Text>

                    <Text style={styles.valorFilho}>
                      {formatarValor(carteira.saldo)}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}

        <Text style={styles.historicoTitulo}>
          Histórico
        </Text>

        {movimentacoesVisiveisNoCofrinho.length === 0 ? (
          <View style={styles.cardInfo}>
            <Text style={styles.infoTitulo}>
              Sem movimentações
            </Text>

            <Text style={styles.infoTexto}>
              As recompensas aprovadas aparecerão aqui.
            </Text>
          </View>
        ) : (
          movimentacoesVisiveisNoCofrinho.map((movimentacao) => (
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
                  {formatarData(movimentacao.data)}
                </Text>
              </View>

              <Text
                style={
                  movimentacao.tipo_movimentacao === "entrada"
                    ? styles.movimentacaoValorEntrada
                    : styles.movimentacaoValorSaida
                }
              >
                {movimentacao.tipo_movimentacao === "entrada" ? "+" : "-"}{" "}
                {formatarValor(movimentacao.valor)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        visible={!!carteiraSaque}
        transparent
        animationType="fade"
        onRequestClose={fecharSaque}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>
              Sacar dinheiro
            </Text>

            <Text style={styles.modalTexto}>
              {carteiraSaque
                ? `Saldo de ${
                    carteiraSaque.usuario?.nome ?? "filho"
                  }: ${formatarValor(carteiraSaque.saldo)}`
                : ""}
            </Text>

            <TextInput
              style={styles.inputSaque}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={valorSaque}
              onChangeText={(texto) =>
                setValorSaque(formatarMoedaDigitada(texto))
              }
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                activeOpacity={0.7}
                onPress={fecharSaque}
              >
                <Text style={styles.botaoCancelarTexto}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoConfirmar}
                activeOpacity={0.7}
                onPress={confirmarSaque}
              >
                <Text style={styles.botaoConfirmarTexto}>
                  Sacar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}