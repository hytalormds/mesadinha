import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  type ScrollView as ScrollViewType,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import { SeletorFilho } from "@/componentes/SeletorFIlho";
import type { RootStackParamList, Usuario } from "@/types/navigation";
import { formatarValor, formatarMoedaDigitada } from "@/utils/formatadores";
import { formatarDataDigitada } from "@/utils/datas";
import { validarCadastroTarefa } from "@/services/cadastroTarefaService";
import { listChildren } from "@/services/mesadinha/auth.services";
import { getCurrentUser } from "@/services/mesadinha/session.service";
import { salvarTarefaApi } from "@/services/mesadinha/tarefa.services";
const LIMITE_DESCRICAO = 250;

export default function CadastroTarefa() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "CadastroTarefa">
    >();

  const route = useRoute<RouteProp<RootStackParamList, "CadastroTarefa">>();

  const tarefaEditando = route.params?.tarefaEditando;

  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [dataLimite, setDataLimite] = React.useState("");
  const [valor_recompensa, setvalor_recompensa] = React.useState("");
  const [usuarioResponsavelId, setUsuarioResponsavelId] = React.useState("");
  const [filhosCadastrados, setFilhosCadastrados] = React.useState<Usuario[]>(
    [],
  );
  const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(
    null,
  );
  const scrollViewRef = React.useRef<ScrollViewType>(null);

  function subirFormulario(posicao: number) {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: posicao,
        animated: true,
      });
    }, 250);
  }

  async function carregarFilhos() {
    try {
      setFilhosCadastrados(await listChildren());
    } catch (error) {
      console.log("Erro ao carregar filhos:", error);
      setFilhosCadastrados([]);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      carregarFilhos();
    }, []),
  );
  React.useEffect(() => {
    if (tarefaEditando) {
      setTitulo(tarefaEditando.titulo);
      setDescricao(tarefaEditando.descricao ?? "");
      setDataLimite(tarefaEditando.dataLimite ?? "");
      setUsuarioResponsavelId(
        tarefaEditando.fk_usuario_crianca ??
          tarefaEditando.fk_usuario_responsavel ??
          "",
      );

      setvalor_recompensa(
        tarefaEditando.valor_recompensa
          ? formatarValor(tarefaEditando.valor_recompensa)
          : "",
      );
    } else {
      setTitulo("");
      setDescricao("");
      setDataLimite("");
      setvalor_recompensa("");
      setUsuarioResponsavelId("");
    }
  }, [tarefaEditando]);

  React.useEffect(() => {
    async function carregarUsuarioLogado() {
      try {
        const usuario = getCurrentUser();

        if (usuario) {
          setUsuarioLogado(usuario);

          if (usuario.id_tipo !== 1) {
            Alert.alert(
              "Acesso negado",
              "Somente o responsável pode cadastrar ou editar tarefas.",
            );

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "MainTabs",
                  params: { screen: "ListaTarefas" },
                },
              ],
            });
          }

          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } catch (error) {
        console.log("Erro ao carregar usuário logado:", error);

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }

    carregarUsuarioLogado();
  }, []);

  function validarFormulario() {
    const resultado = validarCadastroTarefa({
      titulo,
      descricao,
      dataLimite,
      valorRecompensa: valor_recompensa,
    });

    if (!resultado.valido) {
      Alert.alert("Atenção", resultado.mensagem);
      return false;
    }

    return true;
  }

  async function salvarTarefa() {
    if (!validarFormulario()) {
      return;
    }

    if (!usuarioLogado) {
      Alert.alert("Atenção", "Usuário logado não encontrado.");
      return;
    }

    if (usuarioLogado.id_tipo !== 1) {
      Alert.alert(
        "Acesso negado",
        "Somente o responsável pode salvar tarefas.",
      );
      return;
    }

    const criancaSelecionada = filhosCadastrados.find(
      (usuario) => usuario.id_usuario === usuarioResponsavelId,
    );

    if (!criancaSelecionada) {
      Alert.alert("Atenção", "Filho responsável não encontrado.");
      return;
    }

    try {
      await salvarTarefaApi({
        tarefaEditando,
        titulo,
        descricao,
        dataLimite,
        valorRecompensa: valor_recompensa,
        fkUsuarioCrianca: criancaSelecionada.id_usuario,
      });

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "MainTabs",
            params: {
              screen: "ListaTarefas",
            },
          },
        ],
      });
    } catch (error) {
      console.log("Erro ao salvar tarefa:", error);
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerForm}>
            <Text style={styles.label}>Filho responsável pela tarefa:</Text>

            <SeletorFilho
              filhos={filhosCadastrados}
              filhoSelecionadoId={usuarioResponsavelId}
              onSelecionarFilho={setUsuarioResponsavelId}
              onCadastrarFilho={() =>
                navigation.navigate("MainTabs", {
                  screen: "VincularFilho",
                })
              }
            />
            <Text style={styles.label}>Título</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o título da tarefa"
              value={titulo}
              keyboardType="default"
              autoCorrect={true}
              autoCapitalize="sentences"
              onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>

            <TextInput
              style={[styles.input, styles.inputDescricao]}
              placeholder={`Digite a descrição da tarefa. Máximo de ${LIMITE_DESCRICAO} caracteres.`}
              value={descricao}
              keyboardType="default"
              autoCorrect={true}
              onChangeText={setDescricao}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={LIMITE_DESCRICAO}
            />

            <Text
              style={[
                styles.contadorCaracteres,
                descricao.length >= LIMITE_DESCRICAO &&
                  styles.contadorCaracteresLimite,
              ]}
            >
              {descricao.length}/{LIMITE_DESCRICAO} caracteres
            </Text>

            <Text style={styles.label}>Valor da recompensa</Text>

            <TextInput
              style={styles.input}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={valor_recompensa}
              onFocus={() => subirFormulario(360)}
              onChangeText={(text) =>
                setvalor_recompensa(formatarMoedaDigitada(text))
              }
            />

            <Text style={styles.label}>Data limite da tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={dataLimite}
              onChangeText={(text) => setDataLimite(formatarDataDigitada(text))}
              keyboardType="numeric"
              maxLength={10}
              onFocus={() => subirFormulario(430)}
            />

            <Button
              title={tarefaEditando ? "Salvar Alterações" : "Salvar Tarefa"}
              style={styles.botao}
              onPress={salvarTarefa}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
