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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import { ButtonIcon } from "@/componentes/ButtonIcon";
import { Title } from "@/componentes/Title";
import type {
    RootStackParamList,
    Tarefa,
    StatusTarefa,
    Usuario,
    Carteira,
    Movimentacao,
} from "@/types/navigation";

const STORAGE_KEY = "@mesadinha:tarefas";
const USUARIO_LOGADO_STORAGE_KEY = "@mesadinha:usuario_logado";
const CARTEIRAS_STORAGE_KEY = "@mesadinha:carteiras";
const MOVIMENTACOES_STORAGE_KEY = "@mesadinha:movimentacoes";

type FiltroStatus = StatusTarefa | "Todas";

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
                const usuarioSalvo = await AsyncStorage.getItem(
                    USUARIO_LOGADO_STORAGE_KEY
                );

                if (usuarioSalvo) {
                    setUsuarioLogado(JSON.parse(usuarioSalvo));
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
                const tarefasSalvas = await AsyncStorage.getItem(STORAGE_KEY);

                if (tarefasSalvas) {
                    setTarefas(JSON.parse(tarefasSalvas));
                } else {
                    setTarefas([]);
                }
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
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(tarefas)
                );
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
                await AsyncStorage.setItem(
                    CARTEIRAS_STORAGE_KEY,
                    JSON.stringify(carteiras)
                );
            } catch (error) {
                console.log("Erro ao salvar carteiras:", error);
            }
        }

        salvarCarteiras();
    }, [carteiras, carregouCarteiras]);
    React.useEffect(() => {
        async function carregarMovimentacoes() {
            try {
                const movimentacoesSalvas = await AsyncStorage.getItem(
                    MOVIMENTACOES_STORAGE_KEY
                );

                if (movimentacoesSalvas) {
                    setMovimentacoes(JSON.parse(movimentacoesSalvas));
                } else {
                    setMovimentacoes([]);
                }
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
                const carteirasSalvas = await AsyncStorage.getItem(
                    CARTEIRAS_STORAGE_KEY
                );

                if (carteirasSalvas) {
                    setCarteiras(JSON.parse(carteirasSalvas));
                } else {
                    setCarteiras([]);
                }
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
                await AsyncStorage.setItem(
                    MOVIMENTACOES_STORAGE_KEY,
                    JSON.stringify(movimentacoes)
                );
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
                    await AsyncStorage.removeItem(USUARIO_LOGADO_STORAGE_KEY);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                },
            },
        ]);
    }

    function formatarValor(valor?: number) {
        if (valor === undefined || valor === null) {
            return "R$ 0,00";
        }

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
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

    function obterStatusTarefa(tarefa: Tarefa): StatusTarefa {
        if (tarefa.status === "Concluída" || tarefa.concluida) {
            return "Concluída";
        }

        if (
            tarefa.status === "Aguardando Aprovação" ||
            tarefa.status === "Recusada" ||
            tarefa.status === "Expirado"
        ) {
            return tarefa.status;
        }

        const dataLimiteConvertida = converterDataBRParaDate(
            tarefa.dataLimite
        );

        if (dataLimiteConvertida) {
            const hoje = new Date();

            hoje.setHours(0, 0, 0, 0);
            dataLimiteConvertida.setHours(0, 0, 0, 0);

            if (dataLimiteConvertida < hoje) {
                return "Expirado";
            }
        }

        return tarefa.status ?? "Em Aberto";
    }

    function getStatusStyle(status: StatusTarefa) {
        switch (status) {
            case "Concluída":
                return styles.statusConcluida;

            case "Em Andamento":
                return styles.statusEmAndamento;

            case "Em Aberto":
                return styles.statusEmAberto;

            case "Expirado":
                return styles.statusExpirado;

            case "Aguardando Aprovação":
                return styles.statusAguardandoAprovacao;

            case "Recusada":
                return styles.statusRecusada;

            default:
                return styles.statusEmAberto;
        }
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

    const filtrosStatus: FiltroStatus[] = [
        "Todas",
        "Em Aberto",
        "Em Andamento",
        "Aguardando Aprovação",
        "Concluída",
        "Recusada",
        "Expirado",
    ];

    function nomeFiltro(status: FiltroStatus) {
        if (status === "Em Aberto") {
            return "Abertas";
        }

        if (status === "Em Andamento") {
            return "Andamento";
        }

        if (status === "Aguardando Aprovação") {
            return "Aguardando";
        }

        if (status === "Concluída") {
            return "Concluídas";
        }

        return status;
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
                <View style={styles.cardVazio}>
                    <Text style={styles.textoVazio}>
                        Carregando usuário...
                    </Text>
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

        let carteiraDaCrianca: Carteira | null = null;

        setCarteiras((carteirasAtuais) => {
            const carteiraExistente = carteirasAtuais.find(
                (carteira) => String(carteira.fk_usuario_id) === criancaId
            );

            if (carteiraExistente) {
                carteiraDaCrianca = {
                    ...carteiraExistente,
                    saldo: carteiraExistente.saldo + valorRecompensa,
                };

                return carteirasAtuais.map((carteira) =>
                    String(carteira.fk_usuario_id) === criancaId
                        ? carteiraDaCrianca as Carteira
                        : carteira
                );
            }

            carteiraDaCrianca = {
                id_carteira: String(Date.now()),
                saldo: valorRecompensa,
                fk_usuario_id: criancaId,
            };

            return [...carteirasAtuais, carteiraDaCrianca];
        });

        const idCarteira = carteiraDaCrianca?.id_carteira ?? String(Date.now());

        const novaMovimentacao: Movimentacao = {
            id_movimentacao: String(Date.now()),
            tipo_movimentacao: "entrada",
            data: new Date().toISOString(),
            valor: valorRecompensa,
            fk_tarefa_id: tarefaSelecionada.id,
            fk_carteira_id: idCarteira,
        };

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

                            <View style={styles.headerActions}>
                                <TouchableOpacity
                                    style={styles.botaoSair}
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
                        </View>

                        <View style={styles.containerForm}>
                            <View style={styles.filtrosContainer}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filtrosScroll}
                                >
                                    {filtrosStatus.map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[
                                                styles.filtroBotao,
                                                filtroStatus === status &&
                                                styles.filtroBotaoAtivo,
                                            ]}
                                            onPress={() =>
                                                setFiltroStatus(status)
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.filtroTexto,
                                                    filtroStatus === status &&
                                                    styles.filtroTextoAtivo,
                                                ]}
                                            >
                                                {nomeFiltro(status)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {tarefasFiltradas.length === 0 ? (
                                <View style={styles.cardVazio}>
                                    <MaterialIcons
                                        name="assignment"
                                        size={42}
                                        color="#999"
                                    />

                                    <Text style={styles.textoVazio}>
                                        {tarefasPermitidas.length === 0
                                            ? usuarioEhPai
                                                ? "Não há tarefa cadastrada."
                                                : "Você ainda não possui tarefas vinculadas."
                                            : `Não há tarefa com status ${filtroStatus}.`}
                                    </Text>

                                    <Text style={styles.textoVazioDescricao}>
                                        {tarefasPermitidas.length === 0
                                            ? usuarioEhPai
                                                ? 'Clique no botão "Adicionar Nova Tarefa" para criar sua primeira tarefa.'
                                                : "Aguarde o responsável cadastrar uma tarefa para você."
                                            : "Altere o filtro acima para visualizar outras tarefas."}
                                    </Text>
                                </View>
                            ) : (
                                tarefasFiltradas.map((tarefa, index) => {
                                    const statusAtual =
                                        obterStatusTarefa(tarefa);

                                    const usuarioLogadoId = String(usuarioLogado.id_usuario);

                                    const idsPossiveisDaCrianca = [
                                        tarefa.fk_usuario_crianca,
                                        tarefa.fk_usuario_responsavel,
                                    ]
                                        .filter(Boolean)
                                        .map((id) => String(id));

                                    const nomeCriancaDaTarefa = String(
                                        tarefa.nome_usuario_crianca ??
                                        tarefa.nome_usuario_responsavel ??
                                        ""
                                    )
                                        .trim()
                                        .toLowerCase();

                                    const nomeUsuarioLogado = String(usuarioLogado.nome)
                                        .trim()
                                        .toLowerCase();

                                    const tarefaEhDoFilhoLogado =
                                        usuarioEhFilho &&
                                        (idsPossiveisDaCrianca.includes(usuarioLogadoId) ||
                                            nomeCriancaDaTarefa === nomeUsuarioLogado);
                                    return (
                                        <View
                                            key={tarefa.id}
                                            style={[
                                                styles.cardTarefa,
                                                statusAtual === "Concluída" &&
                                                styles.cardTarefaConcluida,
                                            ]}
                                        >
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={styles.cardConteudo}
                                                onPress={() => {
                                                    if (!usuarioEhPai) {
                                                        return;
                                                    }

                                                    navigation.navigate(
                                                        "CadastroTarefa",
                                                        {
                                                            tarefaEditando:
                                                                tarefa,
                                                        }
                                                    );
                                                }}
                                            >
                                                <View style={styles.cardHeader}>
                                                    <View style={styles.cardTituloContainer}>
                                                        <Text
                                                            style={[
                                                                styles.cardNumero,
                                                                statusAtual === "Concluída" &&
                                                                styles.textoConcluido,
                                                            ]}
                                                        >
                                                            Tarefa {index + 1}
                                                        </Text>

                                                        <Text
                                                            numberOfLines={2}
                                                            style={[
                                                                styles.cardTitulo,
                                                                statusAtual === "Concluída" &&
                                                                styles.textoConcluido,
                                                            ]}
                                                        >
                                                            {tarefa.titulo}
                                                        </Text>
                                                    </View>

                                                    <View style={styles.cardValorStatusContainer}>
                                                        <Text style={styles.cardValor}>
                                                            {formatarValor(tarefa.valor_recompensa)}
                                                        </Text>

                                                        <View
                                                            style={[
                                                                styles.statusBadge,
                                                                getStatusStyle(statusAtual),
                                                            ]}
                                                        >
                                                            <Text style={styles.statusTexto}>
                                                                {statusAtual}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.cardInfoRow}
                                                >
                                                    <MaterialIcons
                                                        name="person"
                                                        size={18}
                                                        color="#666"
                                                    />

                                                    <Text
                                                        style={
                                                            styles.cardInfoTexto
                                                        }
                                                    >
                                                        Responsável:{" "}
                                                        {tarefa.nome_usuario_responsavel ||
                                                            "Não informado"}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={styles.cardInfoRow}
                                                >
                                                    <MaterialIcons
                                                        name="child-care"
                                                        size={18}
                                                        color="#666"
                                                    />

                                                    <Text
                                                        style={
                                                            styles.cardInfoTexto
                                                        }
                                                    >
                                                        Criança:{" "}
                                                        {tarefa.nome_usuario_crianca ||
                                                            tarefa.nome_usuario_responsavel ||
                                                            "Não vinculada"}
                                                    </Text>
                                                </View>

                                                <Text
                                                    style={
                                                        styles.cardDescricaoTitulo
                                                    }
                                                >
                                                    Descrição
                                                </Text>

                                                <Text
                                                    style={styles.cardDescricao}
                                                >
                                                    {tarefa.descricao ||
                                                        "Sem descrição informada."}
                                                </Text>
                                            </TouchableOpacity>

                                            {usuarioEhPai && (
                                                <View style={styles.cardAcoes}>
                                                    {statusAtual ===
                                                        "Aguardando Aprovação" && (
                                                            <>
                                                                <ButtonIcon
                                                                    name="check-circle"
                                                                    size={28}
                                                                    color="#095414"
                                                                    style={
                                                                        styles.botaoAcao
                                                                    }
                                                                    onPress={() =>
                                                                        aceitarTarefa(
                                                                            tarefa
                                                                        )
                                                                    }
                                                                />

                                                                <ButtonIcon
                                                                    name="cancel"
                                                                    size={28}
                                                                    color="#dc3545"
                                                                    style={
                                                                        styles.botaoAcao
                                                                    }
                                                                    onPress={() =>
                                                                        alterarStatusTarefa(
                                                                            tarefa.id,
                                                                            "Recusada"
                                                                        )
                                                                    }
                                                                />
                                                            </>
                                                        )}

                                                    <ButtonIcon
                                                        name="edit"
                                                        size={28}
                                                        color="#007BFF"
                                                        style={
                                                            styles.botaoAcao
                                                        }
                                                        onPress={() =>
                                                            navigation.navigate(
                                                                "CadastroTarefa",
                                                                {
                                                                    tarefaEditando:
                                                                        tarefa,
                                                                }
                                                            )
                                                        }
                                                    />

                                                    <ButtonIcon
                                                        name="delete-outline"
                                                        size={28}
                                                        color="#dc3545"
                                                        style={
                                                            styles.botaoAcao
                                                        }
                                                        onPress={() =>
                                                            apagarTarefa(
                                                                tarefa.id
                                                            )
                                                        }
                                                    />
                                                </View>
                                            )}

                                            {tarefaEhDoFilhoLogado && (
                                                <View style={styles.cardAcoes}>
                                                    {statusAtual ===
                                                        "Em Aberto" && (
                                                            <ButtonIcon
                                                                name="play-arrow"
                                                                size={28}
                                                                color="#007BFF"
                                                                style={
                                                                    styles.botaoAcao
                                                                }
                                                                onPress={() =>
                                                                    alterarStatusTarefa(
                                                                        tarefa.id,
                                                                        "Em Andamento"
                                                                    )
                                                                }
                                                            />
                                                        )}

                                                    {(statusAtual ===
                                                        "Em Andamento" ||
                                                        statusAtual ===
                                                        "Recusada") && (
                                                            <ButtonIcon
                                                                name="check-circle"
                                                                size={28}
                                                                color="#095414"
                                                                style={
                                                                    styles.botaoAcao
                                                                }
                                                                onPress={() =>
                                                                    alterarStatusTarefa(
                                                                        tarefa.id,
                                                                        "Aguardando Aprovação"
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                </View>
                                            )}
                                        </View>
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
                            onPress={() => navigation.navigate("CadastroTarefa")}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
