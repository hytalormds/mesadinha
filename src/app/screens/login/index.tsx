import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "@/componentes/Button";
import { Title } from "@/componentes/Title";
import styles from "./styles";
import type { RootStackParamList, Usuario } from "@/types/navigation";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import {
  buscarItem,
  salvarItem,
} from "@/services/storageService";

const USUARIOS_STORAGE_KEY = STORAGE_KEYS.usuarios;
const USUARIO_LOGADO_STORAGE_KEY = STORAGE_KEYS.usuarioLogado;

const USUARIO_PAI_TESTE: Usuario = {
  id_usuario: "1",
  nome: "Pai",
  email: "pai@mesadinha.com",
  senha: "123456",
  id_tipo: 1,
};

const USUARIO_FILHO_TESTE: Usuario = {
  id_usuario: "2",
  nome: "Samuel",
  email: "samuel@mesadinha.com",
  senha: "123456",
  id_tipo: 2,
};

function validarEmail(valor: string) {
  return valor.trim().includes("@");
}

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  function validarFormulario() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail.");
      return false;
    }

    if (!validarEmail(email)) {
      Alert.alert("Atenção", "Digite um e-mail válido com @.");
      return false;
    }

    if (!senha.trim()) {
      Alert.alert("Atenção", "Digite sua senha.");
      return false;
    }

    return true;
  }

  async function handleEntrar() {
    if (!validarFormulario()) {
      return;
    }

    try {
      const usuariosCadastrados =
        (await buscarItem<Usuario[]>(USUARIOS_STORAGE_KEY)) ?? [];

      const usuariosDisponiveis: Usuario[] = [
        USUARIO_PAI_TESTE,
        USUARIO_FILHO_TESTE,
        ...usuariosCadastrados,
      ];

      const emailDigitado = email.trim().toLowerCase();
      const senhaDigitada = senha.trim();

      const usuarioEncontrado = usuariosDisponiveis.find((usuario) => {
        const emailUsuario = String(usuario.email).trim().toLowerCase();
        const senhaUsuario = String(usuario.senha ?? "").trim();

        return emailUsuario === emailDigitado && senhaUsuario === senhaDigitada;
      });

      if (!usuarioEncontrado) {
        Alert.alert("Atenção", "E-mail ou senha inválidos.");
        return;
      }

      await salvarItem(USUARIO_LOGADO_STORAGE_KEY, usuarioEncontrado);

      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("src/assets/logo.png")}
                style={styles.logo}
              />

              <Title style={styles.title}>Bem-vindo!</Title>

              <Text style={styles.subtitle}>
                Faça login para visualizar e controlar as tarefas e mesada do(s) seu(s) filho(s).
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>E-mail</Text>

                <TextInput
                  style={[styles.input, emailFocus && styles.inputFocus]}
                  placeholder="seu.email@exemplo.com"
                  placeholderTextColor="#999999"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Senha</Text>

                <View
                  style={[
                    styles.passwordContainer,
                    passwordFocus && styles.inputFocus,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Sua senha segura"
                    placeholderTextColor="#999999"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!mostrarSenha}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
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
              </View>

              <Button
                title="Entrar"
                style={styles.button}
                onPress={handleEntrar}
              />
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Não tem conta?</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("TelaCadastro")}
              >
                <Text style={styles.footerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}