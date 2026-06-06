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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import styles from "./styles";

export default function CadastroTarefa() {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  const [data, setData] = React.useState<Date | null>(null);
  const [valorRecompensa, setValorRecompensa] = React.useState(0);

  function formatarData(date: Date | null) {
    if (!date) return "";

    return date.toLocaleDateString("pt-BR");
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

    if (!data) {
      Alert.alert("Atenção", "Selecione a data limite da tarefa.");
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
      dataLimite: formatarData(data),
      valorRecompensa,

    };

    console.log("Tarefa cadastrada:", tarefa);

    Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");

    setTitulo("");
    setDescricao("");
    setData(null);
    setValorRecompensa(0);
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
            <Text style={styles.subtituloForm}>Preencha os campos</Text>

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
              placeholder="Digite o valor da recompensa"
              keyboardType="numeric"
              value={valorRecompensa ? String(valorRecompensa) : ""}
              onChangeText={(text) => setValorRecompensa(Number(text))}
            />
            <Text style={styles.label}>Data limite da tarefa: </Text>

            <TextInput
              style={styles.input}
              placeholder="Selecione a data limite"
              value={formatarData(data)}
              editable={false}
              pointerEvents="none"
            />
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="Selecione a hora"
              editable={false}
              pointerEvents="none"
            />
            <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
              <Text style={styles.botaoText}>Salvar Tarefa</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}