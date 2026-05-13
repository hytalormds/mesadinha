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
import styles from "./style";

export default function CadastroTarefa() {
  const navigation = useNavigation<any>();

  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  const [data, setData] = React.useState<Date | null>(null);
  const [hora, setHora] = React.useState<Date | null>(null);

  const [mostrarCalendario, setMostrarCalendario] = React.useState(false);
  const [mostrarRelogio, setMostrarRelogio] = React.useState(false);

  function formatarData(date: Date | null) {
    if (!date) return "";

    return date.toLocaleDateString("pt-BR");
  }

  function formatarHora(date: Date | null) {
    if (!date) return "";

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function selecionarData(event: DateTimePickerEvent, selectedDate?: Date) {
    if (Platform.OS === "android") {
      setMostrarCalendario(false);
    }

    if (selectedDate) {
      setData(selectedDate);
    }
  }

  function selecionarHora(event: DateTimePickerEvent, selectedDate?: Date) {
    if (Platform.OS === "android") {
      setMostrarRelogio(false);
    }

    if (selectedDate) {
      setHora(selectedDate);
    }
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
      Alert.alert("Atenção", "Selecione a data da tarefa.");
      return false;
    }

    if (!hora) {
      Alert.alert("Atenção", "Selecione a hora da tarefa.");
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
      data: formatarData(data),
      hora: formatarHora(hora),
    };

    console.log("Tarefa cadastrada:", tarefa);

    Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");

    setTitulo("");
    setDescricao("");
    setData(null);
    setHora(null);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
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

            <Text style={styles.label}>Data</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMostrarCalendario(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Selecione a data"
                value={formatarData(data)}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {mostrarCalendario && (
              <DateTimePicker
                value={data || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={selecionarData}
              />
            )}

            {Platform.OS === "ios" && mostrarCalendario && (
              <TouchableOpacity
                style={styles.botaoConfirmarPicker}
                onPress={() => setMostrarCalendario(false)}
              >
                <Text style={styles.botaoConfirmarPickerText}>
                  Confirmar Data
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMostrarRelogio(true)}
            >
              <TextInput
                style={styles.input}
                placeholder="Selecione a hora"
                value={formatarHora(hora)}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {mostrarRelogio && (
              <DateTimePicker
                value={hora || new Date()}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={selecionarHora}
              />
            )}

            {Platform.OS === "ios" && mostrarRelogio && (
              <TouchableOpacity
                style={styles.botaoConfirmarPicker}
                onPress={() => setMostrarRelogio(false)}
              >
                <Text style={styles.botaoConfirmarPickerText}>
                  Confirmar Hora
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
              <Text style={styles.botaoText}>Salvar Tarefa</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}