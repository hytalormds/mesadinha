import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function CadastroTarefa() {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [dataLimite, setDataLimite] = React.useState("");
  const [valor_recompensa, setvalor_recompensa] = React.useState("");

  function formatarDataDigitada(texto: string) {
    const numeros = texto.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
  }

  function dataValida(dataTexto: string) {
    const partes = dataTexto.split("/");

    if (partes.length !== 3) {
      return false;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    if (!dia || !mes || !ano) {
      return false;
    }

    const dataTeste = new Date(ano, mes - 1, dia);

    return (
      dataTeste.getFullYear() === ano &&
      dataTeste.getMonth() === mes - 1 &&
      dataTeste.getDate() === dia
    );
  }

  function validarFormulario() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Digite o título da tarefa.");
      return false;
    }

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Digite a descrição da tarefa.");
      return false;
    }

    if (!valor_recompensa.trim()) {
      Alert.alert("Atenção", "Digite o valor da recompensa.");
      return false;
    }

    if (converterMoedaParaNumero(valor_recompensa) <= 0) {
      Alert.alert("Atenção", "Digite um valor de recompensa válido.");
      return false;
    }

    if (!dataLimite.trim()) {
      Alert.alert("Atenção", "Digite a data limite da tarefa.");
      return false;
    }

    if (!dataValida(dataLimite)) {
      Alert.alert("Atenção", "Digite uma data válida no formato DD/MM/AAAA.");
      return false;
    }

    return true;
  }

  function salvarTarefa() {
    if (!validarFormulario()) {
      return;
    }

    const tarefa = {
      titulo,
      descricao,
      dataLimite,
      valor_recompensa: converterMoedaParaNumero(valor_recompensa),
    };

    console.log("Tarefa cadastrada:", tarefa);

    Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");

    setTitulo("");
    setDescricao("");
    setDataLimite("");
    setvalor_recompensa("");
  }
  function formatarvalor_recompensa(texto: string) {
    const numeros = texto.replace(/\D/g, "");
    const valor = Number(numeros) / 100;
    if (!numeros) {
      return "";
    }
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function converterMoedaParaNumero(valor: string) {
    const numeros = valor.replace(/\D/g, "");

    return Number(numeros) / 100;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerLogo}>
            <View style={styles.headerRow}>
              <View style={styles.textContainer}>
                <Text style={styles.titulo}>Cadastro de Tarefa</Text>

                <Text style={styles.subtitulo}>
                  Cadastre a sua tarefa para organizar seu dia
                </Text>
              </View>

              <Image
                source={require("../../assets/logo.png")}
                style={styles.logoTop}
              />
            </View>
          </View>

          <View style={styles.containerForm}>

            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.inputDescricao]}
              placeholder="Digite a descrição da tarefa"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Valor da recompensa</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={valor_recompensa}
              onChangeText={(text) => setvalor_recompensa(formatarvalor_recompensa(text))}
            />

            <Text style={styles.label}>Data limite da tarefa:</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataLimite}
              onChangeText={(text) =>
                setDataLimite(formatarDataDigitada(text))
              }
              keyboardType="numeric"
              maxLength={10}
            />

            <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
              <Text style={styles.botaoText}>Salvar Tarefa</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}