import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import type { RootStackParamList, Usuario } from "@/types/navigation";

type TipoUsuario = "Pai" | "Filho";

const USUARIOS_STORAGE_KEY = "@mesadinha:usuarios";
const EMAILS_TESTE = ["pai@mesadinha.com", "samuel@mesadinha.com"];

export default function TelaCadastro() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [tipoUsuario, setTipoUsuario] = React.useState<TipoUsuario>("Pai");
  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    React.useState(false);

  const tiposUsuario: TipoUsuario[] = ["Pai", "Filho"];

  function senhaValida(valor: string) {
    const erros = [];

    if (valor.length < 8) {
      erros.push("mínimo de 8 caracteres");
    }

    if (!/[0-9]/.test(valor)) {
      erros.push("um número");
    }

    if (!/[A-Z]/.test(valor)) {
      erros.push("uma letra maiúscula");
    }

    if (!/[^A-Za-z0-9]/.test(valor)) {
      erros.push("um caractere especial");
    }

    return erros;
  }

  async function validarFormulario() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Por favor, insira seu nome completo.");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, insira seu e-mail.");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Atenção", "O e-mail precisa ter @.");
      return false;
    }

    if (!senha.trim()) {
      Alert.alert("Atenção", "Por favor, insira uma senha.");
      return false;
    }

    const errosSenha = senhaValida(senha);

    if (errosSenha.length > 0) {
      Alert.alert(
        "Senha inválida",
        `A senha precisa ter:\n- ${errosSenha.join("\n- ")}`
      );
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return false;
    }

    const usuariosSalvos = await AsyncStorage.getItem(USUARIOS_STORAGE_KEY);
    const usuarios: Usuario[] = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
    const emailDigitado = email.trim().toLowerCase();

    const emailJaCadastrado =
      EMAILS_TESTE.includes(emailDigitado) ||
      usuarios.some((usuario) => usuario.email.toLowerCase() === emailDigitado);

    if (emailJaCadastrado) {
      Alert.alert("Atenção", "Este e-mail já está cadastrado.");
      return false;
    }

    return true;
  }

  async function cadastrarUsuario() {
    const formularioValido = await validarFormulario();

    if (!formularioValido) {
      return;
    }

    try {
      const usuariosSalvos = await AsyncStorage.getItem(USUARIOS_STORAGE_KEY);
      const usuarios: Usuario[] = usuariosSalvos
        ? JSON.parse(usuariosSalvos)
        : [];

      const novoUsuario: Usuario = {
        id_usuario: String(Date.now()),
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        id_tipo: tipoUsuario === "Pai" ? 1 : 2,
      };

      await AsyncStorage.setItem(
        USUARIOS_STORAGE_KEY,
        JSON.stringify([...usuarios, novoUsuario])
      );

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso.");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerForm}>
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Sua senha"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <MaterialIcons
                  name={mostrarSenha ? "visibility-off" : "visibility"}
                  size={22}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Senha:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Repita sua senha"
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() =>
                  setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                }
              >
                <MaterialIcons
                  name={
                    mostrarConfirmarSenha ? "visibility-off" : "visibility"
                  }
                  size={22}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Tipo de Usuário:</Text>

            <View style={styles.tipoUsuarioContainer}>
              {tiposUsuario.map((tipo) => {
                const selecionado = tipoUsuario === tipo;

                return (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      styles.tipoUsuario,
                      selecionado && styles.tipoUsuarioButtonSelected,
                    ]}
                    onPress={() => setTipoUsuario(tipo)}
                  >
                    <Text
                      style={[
                        styles.tipoUsuarioText,
                        selecionado && styles.tipoUsuarioTextSelected,
                      ]}
                    >
                      {tipo}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button
              title="Cadastrar"
              style={styles.botao}
              onPress={cadastrarUsuario}
            />

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Já tem conta?</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.footerLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
