import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList, Usuario } from "@/types/navigation";
import {
  listChildren,
  registerChild,
} from "@/services/mesadinha/auth.services";
import { getCurrentUser } from "@/services/mesadinha/session.service";
import styles from "./styles";

export default function VincularFilho() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "VincularFilho">
    >();

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [filhos, setFilhos] = React.useState<Usuario[]>([]);
  const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(
    null,
  );
  const [senha, setSenha] = React.useState("");
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  async function carregarFilhos() {
    try {
      const usuario = getCurrentUser();

      if (!usuario) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        return;
      }

      setUsuarioLogado(usuario);

      if (usuario.id_tipo !== 1) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainTabs",
              params: { screen: "ListaTarefas" },
            },
          ],
        });
        return;
      }

      setFilhos(await listChildren());
    } catch (error) {
      console.log("Erro ao carregar filhos:", error);
      Alert.alert("Erro", "Não foi possível carregar os filhos.");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarFilhos();
    }, []),
  );

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
      Alert.alert("Atenção", "Digite o nome do filho.");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Atenção", "Digite um e-mail válido para o filho.");
      return false;
    }

    if (!senha.trim()) {
      Alert.alert("Atenção", "Digite a senha do filho.");
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

    return true;
  }

  async function cadastrarFilho() {
    if (!validarFormulario()) {
      return;
    }

    try {
      const novoFilho = await registerChild({
        name: nome.trim(),
        email: email.trim().toLowerCase(),
        password: senha.trim(),
      });

      setFilhos((filhosAtuais) => [...filhosAtuais, novoFilho]);
      setNome("");
      setEmail("");
      setSenha("");

      Alert.alert("Sucesso", "Filho cadastrado com sucesso.");
    } catch (error) {
      console.log("Erro ao cadastrar filho:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o filho.");
    }
  }

  if (!usuarioLogado) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.cardVazio}>
          <Text style={styles.textoVazio}>Carregando usuário...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (usuarioLogado.id_tipo !== 1) {
    return null;
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
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitulo}>
            Cadastre os filhos que poderão receber tarefas.
          </Text>

          <Text style={styles.label}>Nome do filho</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome do filho"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Digite uma senha para o filho"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
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

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={cadastrarFilho}
          >
            <Text style={styles.botaoCadastrarTexto}>Cadastrar Filho</Text>
          </TouchableOpacity>

          <Text style={styles.secaoTitulo}>Filhos cadastrados</Text>

          {filhos.length === 0 ? (
            <View style={styles.cardVazio}>
              <MaterialIcons name="person-outline" size={38} color="#999" />

              <Text style={styles.textoVazio}>Nenhum filho cadastrado.</Text>
            </View>
          ) : (
            filhos.map((filho) => (
              <View key={filho.id_usuario} style={styles.cardFilho}>
                <View style={styles.cardFilhoInfo}>
                  <Text style={styles.nomeFilho}>{filho.nome}</Text>

                  <Text style={styles.emailFilho}>
                    {filho.email || "Sem e-mail informado"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
