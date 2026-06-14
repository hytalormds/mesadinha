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
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import type { RootStackParamList } from "@/types/navigation";
import { registerUser } from "@/services/mesadinha/auth.services";

export default function TelaCadastro() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    React.useState(false);

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

  function validarFormulario() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Por favor, insira seu nome completo.");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Atenção", "Digite um e-mail válido.");
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
        `A senha precisa ter:\n- ${errosSenha.join("\n- ")}`,
      );
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return false;
    }

    return true;
  }

  async function cadastrarUsuario() {
    if (!validarFormulario()) {
      return;
    }

    try {
      await registerUser({
        name: nome.trim(),
        email: email.trim().toLowerCase(),
        password: senha,
      });

      Alert.alert("Sucesso", "Responsável cadastrado com sucesso.");
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
                  name={mostrarConfirmarSenha ? "visibility-off" : "visibility"}
                  size={22}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>

            <Button
              title="Cadastrar Responsável"
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
