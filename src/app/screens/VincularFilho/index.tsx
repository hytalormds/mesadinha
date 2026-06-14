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

import { Button } from "@/componentes/Button";
import type { RootStackParamList, Usuario } from "@/types/navigation";
import {
  listChildren,
  registerChild,
  updateChild,
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
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");

  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    React.useState(false);

  const [filhos, setFilhos] = React.useState<Usuario[]>([]);
  const [usuarioLogado, setUsuarioLogado] =
    React.useState<Usuario | null>(null);

  const [filhoEditandoId, setFilhoEditandoId] =
    React.useState<string | null>(null);

  const estaEditando = !!filhoEditandoId;

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

      const filhosResponse = await listChildren();

      setFilhos(filhosResponse);
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
    const nomeTratado = nome.trim();
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();
    const confirmarSenhaTratada = confirmarSenha.trim();

    if (!nomeTratado) {
      Alert.alert("Atenção", "Digite o nome do filho.");
      return false;
    }

    if (!emailTratado || !emailTratado.includes("@")) {
      Alert.alert("Atenção", "Digite um e-mail válido para o filho.");
      return false;
    }

    const emailJaCadastrado = filhos.some((filho) => {
      const mesmoFilho = String(filho.id_usuario) === String(filhoEditandoId);

      return !mesmoFilho && filho.email?.toLowerCase() === emailTratado;
    });

    if (emailJaCadastrado) {
      Alert.alert("Atenção", "Este e-mail já está cadastrado.");
      return false;
    }

    if (!estaEditando && !senhaTratada) {
      Alert.alert("Atenção", "Digite a senha do filho.");
      return false;
    }

    if (!senhaTratada && confirmarSenhaTratada) {
      Alert.alert(
        "Atenção",
        "Digite a nova senha antes de confirmar.",
      );
      return false;
    }

    if (senhaTratada) {
      if (!confirmarSenhaTratada) {
        Alert.alert("Atenção", "Confirme a senha do filho.");
        return false;
      }

      if (senhaTratada !== confirmarSenhaTratada) {
        Alert.alert("Atenção", "As senhas não conferem.");
        return false;
      }

      const errosSenha = senhaValida(senhaTratada);

      if (errosSenha.length > 0) {
        Alert.alert(
          "Senha inválida",
          `A senha precisa ter:\n- ${errosSenha.join("\n- ")}`,
        );
        return false;
      }
    }

    return true;
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setMostrarSenha(false);
    setMostrarConfirmarSenha(false);
    setFilhoEditandoId(null);
  }

  function iniciarEdicaoFilho(filho: Usuario) {
    setFilhoEditandoId(String(filho.id_usuario));
    setNome(filho.nome);
    setEmail(filho.email ?? "");
    setSenha("");
    setConfirmarSenha("");
    setMostrarSenha(false);
    setMostrarConfirmarSenha(false);
  }

  function cancelarEdicaoFilho() {
    limparFormulario();
  }

  async function salvarFilho() {
    if (!validarFormulario()) {
      return;
    }

    const nomeTratado = nome.trim();
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();

    try {
      if (filhoEditandoId) {
        const filhoAtualizado = await updateChild(filhoEditandoId, {
          name: nomeTratado,
          email: emailTratado,
          password: senhaTratada || undefined,
        });

        setFilhos((filhosAtuais) =>
          filhosAtuais.map((filho) =>
            String(filho.id_usuario) === String(filhoEditandoId)
              ? filhoAtualizado
              : filho,
          ),
        );

        limparFormulario();

        Alert.alert(
          "Sucesso",
          "Dados do filho atualizados com sucesso.",
        );
        return;
      }

      const novoFilho = await registerChild({
        name: nomeTratado,
        email: emailTratado,
        password: senhaTratada,
      });

      setFilhos((filhosAtuais) => [...filhosAtuais, novoFilho]);

      limparFormulario();

      Alert.alert("Sucesso", "Filho cadastrado com sucesso.");
    } catch (error) {
      console.log("Erro ao salvar filho:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados do filho.");
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
            {estaEditando
              ? "Edite os dados do filho. Para redefinir a senha, preencha os campos de senha."
              : "Cadastre os filhos que poderão receber tarefas."}
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

          <Text style={styles.label}>
            {estaEditando ? "Nova senha" : "Senha"}
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={
                estaEditando
                  ? "Digite uma nova senha"
                  : "Digite uma senha para o filho"
              }
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

          <Text style={styles.label}>Confirmar senha</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={
                estaEditando
                  ? "Confirme a nova senha"
                  : "Confirme a senha do filho"
              }
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!mostrarConfirmarSenha}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setMostrarConfirmarSenha(!mostrarConfirmarSenha)
              }
            >
              <MaterialIcons
                name={
                  mostrarConfirmarSenha
                    ? "visibility-off"
                    : "visibility"
                }
                size={22}
                color="#666666"
              />
            </TouchableOpacity>
          </View>

          <Button
            title={estaEditando ? "Salvar Alterações" : "Cadastrar Filho"}
            style={styles.botaoCadastrar}
            onPress={salvarFilho}
          />

          {estaEditando && (
            <Button
              title="Cancelar edição"
              variant="outlineDanger"
              iconName="close"
              style={styles.botaoCancelarEdicao}
              onPress={cancelarEdicaoFilho}
            />
          )}

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

                <TouchableOpacity
                  style={styles.botaoEditarFilho}
                  activeOpacity={0.7}
                  onPress={() => iniciarEdicaoFilho(filho)}
                >
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color="#007BFF"
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}