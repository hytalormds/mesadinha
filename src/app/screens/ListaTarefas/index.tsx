import React from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./styles";

import { Button } from "@/componentes/Button";
import { Title } from "@/componentes/Title";
import { CardTarefa } from "@/componentes/CardTarefa";
import { EmptyState } from "@/componentes/EmptyState";
import { FiltroStatus } from "@/componentes/FiltroStatus";

import type {
    RootStackParamList,
    Tarefa,
} from "@/types/navigation";

import {
    obterStatusTarefa,
    tarefaPertenceAoFilhoLogado,
    validarRecusaTarefa,
} from "@/services/tarefaService";
import { clearSession } from "@/services/mesadinha/session.service";

import { useUsuarioAtual } from "@/hooks/useUsuarioAtual";
import { useTarefas } from "@/hooks/useTarefas";
import { useFiltroTarefas } from "@/hooks/useFiltroTarefas";

export default function ListaTarefas() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "ListaTarefas">
        >();

    const {
        usuario,
        usuarioEhPai,
        usuarioEhFilho,
    } = useUsuarioAtual();

    const {
        tarefas,
        carregando,
        alterarStatusTarefa,
        excluirTarefa,
        aceitarTarefa,
    } = useTarefas({
        usuario,
    });

    const {
        filtroStatus,
        setFiltroStatus,
        tarefasPermitidas,
        tarefasFiltradas,
        totalTarefas,
    } = useFiltroTarefas({
        tarefas,
        usuario,
    });

    React.useEffect(() => {
        if (!usuario) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        }
    }, [usuario, navigation]);

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
            ],
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
            ],
        );
    }

    function confirmarExclusaoTarefa(id: string) {
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
                    onPress: () => excluirTarefa(id),
                },
            ],
        );
    }

    function confirmarRecusaTarefa(tarefa: Tarefa) {
        const statusAtual = obterStatusTarefa(tarefa);

        const resultado = validarRecusaTarefa(
            tarefa,
            usuarioEhPai,
            statusAtual,
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
            ],
        );
    }

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
            ],
        );
    }

    if (!usuario || carregando) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerForm}>
                    <EmptyState
                        icon="person-outline"
                        title={
                            !usuario
                                ? "Carregando usuário..."
                                : "Carregando tarefas..."
                        }
                    />
                </View>
            </SafeAreaView>
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
                                    {totalTarefas === 1
                                        ? "1 tarefa disponível"
                                        : `${totalTarefas} tarefas disponíveis`}
                                </Text>

                                <Text style={styles.usuarioLogadoTexto}>
                                    Perfil atual: {usuario.nome}{" "}
                                    {usuarioEhPai
                                        ? "(Responsável)"
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

                                    const tarefaEhDoFilhoLogado =
                                        tarefaPertenceAoFilhoLogado(
                                            tarefa,
                                            usuario,
                                        );

                                    const podeEditarTarefa =
                                        usuarioEhPai && statusAtual !== "Concluída";

                                    return (
                                        <CardTarefa
                                            key={tarefa.id}
                                            tarefa={tarefa}
                                            numero={index + 1}
                                            status={statusAtual}
                                            usuarioEhPai={usuarioEhPai}
                                            tarefaEhDoFilhoLogado={tarefaEhDoFilhoLogado}
                                            onEditar={
                                                podeEditarTarefa
                                                    ? () =>
                                                        navigation.push("CadastroTarefa", {
                                                            tarefaEditando: tarefa,
                                                        })
                                                    : undefined
                                            }
                                            onExcluir={() =>
                                                confirmarExclusaoTarefa(tarefa.id)
                                            }
                                            onAceitar={() =>
                                                confirmarAceiteTarefa(tarefa)
                                            }
                                            onRecusar={() =>
                                                confirmarRecusaTarefa(tarefa)
                                            }
                                            onIniciar={() =>
                                                confirmarInicioTarefa(tarefa.id)
                                            }
                                            onEnviarParaAprovacao={() =>
                                                confirmarFinalizacaoTarefa(tarefa.id)
                                            }
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