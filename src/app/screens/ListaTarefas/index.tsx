import React from "react";
import {
    Platform,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import { Title } from "@/componentes/Title";
import { CardTarefa } from "@/componentes/CardTarefa";
import { EmptyState } from "@/componentes/EmptyState";
import {
    FiltroStatus,
    type FiltroStatusTarefa,
} from "@/componentes/FiltroStatus";

import type {
    RootStackParamList,
    Tarefa,
    StatusTarefa,
    Usuario,
} from "@/types/navigation";

import {
    obterStatusTarefa,
    tarefaPertenceAoFilhoLogado,
    validarRecusaTarefa,
} from "@/services/tarefaService";
import { clearSession, getCurrentUser } from "@/services/mesadinha/session.service";
import {
    atualizarStatusTarefaApi,
    excluirTarefaApi,
    listarTarefas,
} from "@/services/mesadinha/tarefa.services";
import { creditarTarefa } from "@/services/mesadinha/carteira.services";

type FiltroStatus = FiltroStatusTarefa;

export default function ListaTarefas() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "ListaTarefas">
        >();

    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregouTarefas, setCarregouTarefas] = React.useState(false);
    const [filtroStatus, setFiltroStatus] = React.useState<FiltroStatus>("Todas");
    const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(null);
    async function carregarDados() {
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
            setTarefas(await listarTarefas());
        } catch (error) {
            console.log("Erro ao carregar tarefas:", error);
            Alert.alert("Erro", "Não foi possível carregar as tarefas.");
            setTarefas([]);
        } finally {
            setCarregouTarefas(true);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarDados();
        }, []),
    );

    function confirmarSair() {
        Alert.alert("Sair", "Deseja realmente sair?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                    clearSession();

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                },
            },
        ]);
    }

    async function alterarStatusTarefa(id: string, novoStatus: StatusTarefa) {
        try {
            await atualizarStatusTarefaApi(id, novoStatus);
        } catch (error) {
            console.log("Erro ao atualizar tarefa:", error);
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
            return;
        }

        setTarefas((tarefasAtuais) =>
            tarefasAtuais.map((tarefa) =>
                tarefa.id === id
                    ? {
                        ...tarefa,
                        status: novoStatus,
                        concluida: novoStatus === "Concluída",
                    }
                    : tarefa
            )
        );
    }

    function confirmarInicioTarefa(id: string) {
        Alert.alert(
            "Iniciar tarefa",
            "Tem certeza que deseja iniciar esta tarefa?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Iniciar",
                    onPress: () => alterarStatusTarefa(id, "Em Andamento"),
                },
            ]
        );
    }

    function confirmarFinalizacaoTarefa(id: string) {
        Alert.alert(
            "Finalizar tarefa",
            "Tem certeza que deseja finalizar esta tarefa?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Finalizar",
                    onPress: () =>
                        alterarStatusTarefa(id, "Aguardando Aprovação"),
                },
            ]
        );
    }

    function apagarTarefa(id: string) {
        Alert.alert(
            "Excluir tarefa",
            "Deseja realmente excluir esta tarefa?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await excluirTarefaApi(id);
                        } catch (error) {
                            console.log("Erro ao excluir tarefa:", error);
                            Alert.alert("Erro", "Não foi possível excluir a tarefa.");
                            return;
                        }

                        setTarefas((tarefasAtuais) =>
                            tarefasAtuais.filter(
                                (tarefa) => tarefa.id !== id
                            )
                        );
                    },
                },
            ]
        );
    }
    function confirmarRecusaTarefa(tarefa: Tarefa) {
        const statusAtual = obterStatusTarefa(tarefa);

        const resultado = validarRecusaTarefa(
            tarefa,
            usuarioEhPai,
            statusAtual
        );

        if (!resultado.valido) {
            Alert.alert("Atenção", resultado.mensagem);
            return;
        }

        Alert.alert(
            "Recusar tarefa",
            "Tem certeza que deseja recusar esta tarefa?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Recusar",
                    style: "destructive",
                    onPress: () =>
                        alterarStatusTarefa(tarefa.id, "Recusada"),
                },
            ]
        );
    }
    const usuarioEhPai = usuarioLogado?.id_tipo === 1;
    const usuarioEhFilho = usuarioLogado?.id_tipo === 2;

    const tarefasPermitidas = tarefas;

    const tarefasFiltradas = tarefasPermitidas.filter((tarefa) => {
        const statusAtual = obterStatusTarefa(tarefa);

        if (filtroStatus === "Todas") {
            return true;
        }

        return statusAtual === filtroStatus;
    });

    if (!usuarioLogado) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerForm}>
                    <EmptyState
                        icon="person-outline"
                        title="Carregando usuário..."
                    />
                </View>
            </SafeAreaView>
        );
    };

    function confirmarAceiteTarefa(tarefa: Tarefa) {
        Alert.alert(
            "Aprovar tarefa",
            "Tem certeza que deseja aprovar esta tarefa?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Aprovar",
                    onPress: () => aceitarTarefa(tarefa),
                },
            ]
        );
    }

    async function aceitarTarefa(tarefaSelecionada: Tarefa) {
        const criancaId = String(
            tarefaSelecionada.fk_usuario_crianca ??
            tarefaSelecionada.fk_usuario_responsavel ??
            ""
        );

        if (!criancaId) {
            Alert.alert("Atenção", "Criança da tarefa não encontrada.");
            return;
        }

        try {
            await creditarTarefa(tarefaSelecionada.id);
        } catch (error) {
            console.log("Erro ao creditar tarefa:", error);
            Alert.alert("Erro", "Não foi possível creditar a recompensa.");
            return;
        }

        setTarefas((tarefasAtuais) =>
            tarefasAtuais.map((tarefa) =>
                tarefa.id === tarefaSelecionada.id
                    ? {
                        ...tarefa,
                        status: "Concluída",
                        concluida: true,
                        recompensa_creditada: true,
                    }
                    : tarefa
            )
        );

        Alert.alert(
            "Tarefa aceita",
            "A recompensa foi adicionada ao cofrinho da criança."
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerLogo}>
                        <View style={styles.headerContainer}>
                            <View style={styles.textContainer}>
                                <Title style={styles.titulo}>
                                    Lista de Tarefas
                                </Title>

                                <Text style={styles.subtitulo}>
                                    {tarefasPermitidas.length === 1
                                        ? "1 tarefa disponível"
                                        : `${tarefasPermitidas.length} tarefas disponíveis`}
                                </Text>

                                <Text style={styles.usuarioLogadoTexto}>
                                    Perfil atual: {usuarioLogado.nome}{" "}
                                    {usuarioEhPai
                                        ? "(Pai)"
                                        : usuarioEhFilho
                                            ? "(Filho)"
                                            : ""}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.botaoSair}
                                activeOpacity={0.7}
                                onPress={confirmarSair}
                            >
                                <MaterialIcons
                                    name="logout"
                                    size={20}
                                    color="#dc3545"
                                />

                                <Text style={styles.botaoSairTexto}>
                                    Sair
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerForm}>
                            <FiltroStatus
                                statusSelecionado={filtroStatus}
                                onSelecionarStatus={setFiltroStatus}
                            />

                            {tarefasFiltradas.length === 0 ? (
                                <EmptyState
                                    icon="assignment"
                                    title={
                                        tarefasPermitidas.length === 0
                                            ? usuarioEhPai
                                                ? "Não há tarefa cadastrada."
                                                : "Você ainda não possui tarefas vinculadas."
                                            : `Não há tarefa com status ${filtroStatus}.`
                                    }
                                    description={
                                        tarefasPermitidas.length === 0
                                            ? usuarioEhPai
                                                ? 'Clique no botão "Adicionar Nova Tarefa" para criar sua primeira tarefa.'
                                                : "Aguarde o responsável cadastrar uma tarefa para você."
                                            : "Altere o filtro acima para visualizar outras tarefas."
                                    }
                                />
                            ) : (
                                tarefasFiltradas.map((tarefa, index) => {
                                    const statusAtual = obterStatusTarefa(tarefa);

                                    const tarefaEhDoFilhoLogado = tarefaPertenceAoFilhoLogado(
                                        tarefa,
                                        usuarioLogado
                                    );

                                    return (
                                        <CardTarefa
                                            key={tarefa.id}
                                            tarefa={tarefa}
                                            numero={index + 1}
                                            status={statusAtual}
                                            usuarioEhPai={usuarioEhPai}
                                            tarefaEhDoFilhoLogado={tarefaEhDoFilhoLogado}
                                            onEditar={() =>
                                                navigation.push("CadastroTarefa", {
                                                    tarefaEditando: tarefa,
                                                })
                                            }
                                            onExcluir={() => apagarTarefa(tarefa.id)}
                                            onAceitar={() => confirmarAceiteTarefa(tarefa)}
                                            onRecusar={() => confirmarRecusaTarefa(tarefa)
                                            }
                                            onIniciar={() =>
                                                confirmarInicioTarefa(tarefa.id)
                                            }
                                            onEnviarParaAprovacao={() =>
                                                confirmarFinalizacaoTarefa(tarefa.id)}
                                        />
                                    );
                                })
                            )}
                        </View>
                    </View>
                </ScrollView>

                {usuarioEhPai && (
                    <View style={styles.footerContainer}>
                        <Button
                            title="Adicionar Nova Tarefa"
                            style={styles.botao}
                            onPress={() => navigation.push("CadastroTarefa")}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
