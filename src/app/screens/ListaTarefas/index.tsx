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
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
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
    Carteira,
    Movimentacao,
} from "@/types/navigation";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import {
    buscarItem,
    salvarItem,
    removerItem,
} from "@/services/storageService";
import {
    obterStatusTarefa,
    tarefaPertenceAoFilhoLogado,
} from "@/services/tarefaService";
import { creditarValorNaCarteira } from "@/services/carteiraService";
import { criarMovimentacaoEntrada } from "@/services/movimentacaoService";


const STORAGE_KEY = STORAGE_KEYS.tarefas;
const USUARIO_LOGADO_STORAGE_KEY = STORAGE_KEYS.usuarioLogado;
const CARTEIRAS_STORAGE_KEY = STORAGE_KEYS.carteiras;
const MOVIMENTACOES_STORAGE_KEY = STORAGE_KEYS.movimentacoes;

type FiltroStatus = FiltroStatusTarefa;

export default function ListaTarefas() {
    const route = useRoute<RouteProp<RootStackParamList, "ListaTarefas">>();

    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "ListaTarefas">
        >();

    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregouTarefas, setCarregouTarefas] = React.useState(false);
    const [filtroStatus, setFiltroStatus] = React.useState<FiltroStatus>("Todas");
    const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(null);
    const [carteiras, setCarteiras] = React.useState<Carteira[]>([]);
    const [carregouCarteiras, setCarregouCarteiras] = React.useState(false);

    const [movimentacoes, setMovimentacoes] = React.useState<Movimentacao[]>([]);
    const [carregouMovimentacoes, setCarregouMovimentacoes] = React.useState(false);
    React.useEffect(() => {
        async function carregarUsuarioLogado() {
            try {
                const usuarioSalvo = await buscarItem<Usuario>(
                    USUARIO_LOGADO_STORAGE_KEY
                );

                if (usuarioSalvo) {
                    setUsuarioLogado(usuarioSalvo);
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

    React.useEffect(() => {
        async function carregarTarefas() {
            try {
                const tarefasSalvas = await buscarItem<Tarefa[]>(STORAGE_KEY);

                setTarefas(tarefasSalvas ?? []);
            } catch (error) {
                console.log("Erro ao carregar tarefas:", error);
                setTarefas([]);
            } finally {
                setCarregouTarefas(true);
            }
        }

        carregarTarefas();
    }, []);

    React.useEffect(() => {
        async function salvarTarefas() {
            if (!carregouTarefas) {
                return;
            }

            try {
                await salvarItem(STORAGE_KEY, tarefas);
            } catch (error) {
                console.log("Erro ao salvar tarefas:", error);
            }
        }

        salvarTarefas();
    }, [tarefas, carregouTarefas]);
    React.useEffect(() => {
        async function salvarCarteiras() {
            if (!carregouCarteiras) {
                return;
            }

            try {
                await salvarItem(CARTEIRAS_STORAGE_KEY, carteiras);
            } catch (error) {
                console.log("Erro ao salvar carteiras:", error);
            }
        }

        salvarCarteiras();
    }, [carteiras, carregouCarteiras]);
    React.useEffect(() => {
        async function carregarMovimentacoes() {
            try {
                const movimentacoesSalvas = await buscarItem<Movimentacao[]>(
                    MOVIMENTACOES_STORAGE_KEY
                );

                setMovimentacoes(movimentacoesSalvas ?? []);
            } catch (error) {
                console.log("Erro ao carregar movimentações:", error);
                setMovimentacoes([]);
            } finally {
                setCarregouMovimentacoes(true);
            }
        }

        carregarMovimentacoes();
    }, []);
    React.useEffect(() => {
        async function carregarCarteiras() {
            try {
                const carteirasSalvas = await buscarItem<Carteira[]>(
                    CARTEIRAS_STORAGE_KEY
                );

                setCarteiras(carteirasSalvas ?? []);
            } catch (error) {
                console.log("Erro ao carregar carteiras:", error);
                setCarteiras([]);
            } finally {
                setCarregouCarteiras(true);
            }
        }

        carregarCarteiras();
    }, []);
    React.useEffect(() => {
        async function salvarMovimentacoes() {
            if (!carregouMovimentacoes) {
                return;
            }

            try {
                await salvarItem(MOVIMENTACOES_STORAGE_KEY, movimentacoes);
            } catch (error) {
                console.log("Erro ao salvar movimentações:", error);
            }
        }

        salvarMovimentacoes();
    }, [movimentacoes, carregouMovimentacoes]);
    React.useEffect(() => {
        if (!carregouTarefas) {
            return;
        }

        const tarefaSalva = route.params?.tarefaSalva;

        if (!tarefaSalva) {
            return;
        }

        setTarefas((tarefasAtuais) => {
            const tarefaJaExiste = tarefasAtuais.some(
                (tarefa) => tarefa.id === tarefaSalva.id
            );

            if (tarefaJaExiste) {
                return tarefasAtuais.map((tarefa) =>
                    tarefa.id === tarefaSalva.id ? tarefaSalva : tarefa
                );
            }

            return [...tarefasAtuais, tarefaSalva];
        });

        navigation.setParams({
            tarefaSalva: undefined,
        });
    }, [route.params?.tarefaSalva, carregouTarefas]);

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
                    await removerItem(USUARIO_LOGADO_STORAGE_KEY);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                },
            },
        ]);
    }

    function converterDataBRParaDate(dataBR?: string) {
        if (!dataBR) {
            return null;
        }

        const partes = dataBR.split("/");

        if (partes.length !== 3) {
            return null;
        }

        const dia = Number(partes[0]);
        const mes = Number(partes[1]) - 1;
        const ano = Number(partes[2]);

        const data = new Date(ano, mes, dia);

        if (
            data.getFullYear() !== ano ||
            data.getMonth() !== mes ||
            data.getDate() !== dia
        ) {
            return null;
        }

        return data;
    }

    function alterarStatusTarefa(id: string, novoStatus: StatusTarefa) {
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
                    onPress: () => {
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
    }
    function aceitarTarefa(tarefaSelecionada: Tarefa) {
        const criancaId = String(
            tarefaSelecionada.fk_usuario_crianca ??
            tarefaSelecionada.fk_usuario_responsavel ??
            ""
        );

        const valorRecompensa = tarefaSelecionada.valor_recompensa ?? 0;

        if (!criancaId) {
            Alert.alert("Atenção", "Criança da tarefa não encontrada.");
            return;
        }

        if (valorRecompensa <= 0) {
            Alert.alert("Atenção", "Valor da recompensa inválido.");
            return;
        }

        if (tarefaSelecionada.recompensa_creditada) {
            alterarStatusTarefa(tarefaSelecionada.id, "Concluída");
            return;
        }

        const resultadoCarteira = creditarValorNaCarteira(
            carteiras,
            criancaId,
            valorRecompensa
        );

        const novaMovimentacao = criarMovimentacaoEntrada(
            tarefaSelecionada,
            resultadoCarteira.carteira.id_carteira,
            valorRecompensa
        );

        setCarteiras(resultadoCarteira.carteiras);

        setMovimentacoes((movimentacoesAtuais) => [
            novaMovimentacao,
            ...movimentacoesAtuais,
        ]);

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
                                            onAceitar={() => aceitarTarefa(tarefa)}
                                            onRecusar={() =>
                                                alterarStatusTarefa(tarefa.id, "Recusada")
                                            }
                                            onIniciar={() =>
                                                alterarStatusTarefa(tarefa.id, "Em Andamento")
                                            }
                                            onEnviarParaAprovacao={() =>
                                                alterarStatusTarefa(
                                                    tarefa.id,
                                                    "Aguardando Aprovação"
                                                )
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