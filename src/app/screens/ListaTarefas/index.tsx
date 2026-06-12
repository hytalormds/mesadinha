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
} from "@/types/navigation";

const STORAGE_KEY = "@mesadinha:tarefas";
type FiltroStatus = StatusTarefa | "Todas";
export default function ListaTarefas() {
    const route = useRoute<RouteProp<RootStackParamList, "ListaTarefas">>();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "ListaTarefas">
        >();

    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregouTarefas, setCarregouTarefas] = React.useState(false);
    const [filtroStatus, setFiltroStatus] =
        React.useState<FiltroStatus>("Todas");
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
                onPress: () => {
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
        "Concluída",
        "Expirado",
    ];

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        const statusAtual = obterStatusTarefa(tarefa);

        if (filtroStatus === "Todas") {
            return true;
        }

        return statusAtual === filtroStatus;
    });
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
                        <View style={styles.headerRow}>
                            <View style={styles.textContainer}>
                                <Title style={styles.titulo}>
                                    Lista de Tarefas
                                </Title>

                                <Text style={styles.subtitulo}>
                                    {tarefas.length === 1
                                        ? "1 tarefa cadastrada"
                                        : `${tarefas.length} tarefas cadastradas`}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.botaoFilhos}
                                onPress={() => navigation.push("VincularFilho")}
                            >
                                <MaterialIcons
                                    name="person-add"
                                    size={20}
                                    color="#007BFF"
                                />

                                <Text style={styles.botaoFilhosTexto}>
                                    Filhos
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.botaoSair}
                                onPress={confirmarSair}
                            >
                                <MaterialIcons
                                    name="logout"
                                    size={20}
                                    color="#dc3545"
                                />

                                <Text style={styles.botaoSairTexto}>Sair</Text>
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
                                            filtroStatus === status && styles.filtroBotaoAtivo,
                                        ]}
                                        onPress={() => setFiltroStatus(status)}
                                    >
                                        <Text
                                            style={[
                                                styles.filtroTexto,
                                                filtroStatus === status && styles.filtroTextoAtivo,
                                            ]}
                                        >
                                            {status}
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
                                    {tarefas.length === 0
                                        ? "Não há tarefa cadastrada."
                                        : `Não há tarefa com status ${filtroStatus}.`}
                                </Text>

                                <Text style={styles.textoVazioDescricao}>
                                    {tarefas.length === 0
                                        ? 'Clique no botão "Adicionar Nova Tarefa" para criar sua primeira tarefa.'
                                        : "Altere o filtro acima para visualizar outras tarefas."}
                                </Text>
                            </View>
                        ) : (
                            tarefasFiltradas.map((tarefa, index) => {
                                const statusAtual =
                                    obterStatusTarefa(tarefa);

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
                                            onPress={() =>
                                                navigation.push(
                                                    "CadastroTarefa",
                                                    {
                                                        tarefaEditando: tarefa,
                                                    }
                                                )
                                            }
                                        >
                                            <View style={styles.cardHeader}>
                                                <View
                                                    style={
                                                        styles.cardTituloContainer
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.cardNumero,
                                                            statusAtual ===
                                                            "Concluída" &&
                                                            styles.textoConcluido,
                                                        ]}
                                                    >
                                                        Tarefa {index + 1}
                                                    </Text>

                                                    <Text
                                                        style={[
                                                            styles.cardTitulo,
                                                            statusAtual ===
                                                            "Concluída" &&
                                                            styles.textoConcluido,
                                                        ]}
                                                    >
                                                        {tarefa.titulo}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={
                                                        styles.cardValorStatusContainer
                                                    }
                                                >
                                                    <Text
                                                        style={styles.cardValor}
                                                    >
                                                        {formatarValor(
                                                            tarefa.valor_recompensa
                                                        )}
                                                    </Text>

                                                    <View
                                                        style={[
                                                            styles.statusBadge,
                                                            getStatusStyle(
                                                                statusAtual
                                                            ),
                                                        ]}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.statusTexto
                                                            }
                                                        >
                                                            {statusAtual}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.cardInfoRow}>
                                                <MaterialIcons
                                                    name="event"
                                                    size={18}
                                                    color="#666"
                                                />

                                                <Text
                                                    style={
                                                        styles.cardInfoTexto
                                                    }
                                                >
                                                    Data limite:{" "}
                                                    {tarefa.dataLimite ||
                                                        "Não informada"}
                                                </Text>
                                            </View>
                                            <View style={styles.cardInfoRow}>
                                                <MaterialIcons
                                                    name="person"
                                                    size={18}
                                                    color="#666"
                                                />

                                                <Text style={styles.cardInfoTexto}>
                                                    Responsável:{" "}
                                                    {tarefa.nome_usuario_responsavel || "Não vinculado"}
                                                </Text>
                                            </View>
                                            <Text
                                                style={
                                                    styles.cardDescricaoTitulo
                                                }
                                            >
                                                Descrição
                                            </Text>

                                            <Text style={styles.cardDescricao}>
                                                {tarefa.descricao ||
                                                    "Sem descrição informada."}
                                            </Text>
                                        </TouchableOpacity>

                                        <View style={styles.cardAcoes}>
                                            {statusAtual === "Em Aberto" && (
                                                <ButtonIcon
                                                    name="play-arrow"
                                                    size={28}
                                                    color="#007BFF"
                                                    style={styles.botaoAcao}
                                                    onPress={() =>
                                                        alterarStatusTarefa(
                                                            tarefa.id,
                                                            "Em Andamento"
                                                        )
                                                    }
                                                />
                                            )}

                                            {statusAtual ===
                                                "Em Andamento" && (
                                                    <ButtonIcon
                                                        name="check-circle"
                                                        size={28}
                                                        color="#095414"
                                                        style={styles.botaoAcao}
                                                        onPress={() =>
                                                            alterarStatusTarefa(
                                                                tarefa.id,
                                                                "Concluída"
                                                            )
                                                        }
                                                    />
                                                )}

                                            {statusAtual === "Concluída" && (
                                                <ButtonIcon
                                                    name="refresh"
                                                    size={28}
                                                    color="#6c757d"
                                                    style={styles.botaoAcao}
                                                    onPress={() =>
                                                        alterarStatusTarefa(
                                                            tarefa.id,
                                                            "Em Aberto"
                                                        )
                                                    }
                                                />
                                            )}

                                            {statusAtual === "Expirado" && (
                                                <ButtonIcon
                                                    name="edit"
                                                    size={28}
                                                    color="#dc3545"
                                                    style={styles.botaoAcao}
                                                    onPress={() =>
                                                        navigation.push(
                                                            "CadastroTarefa",
                                                            {
                                                                tarefaEditando:
                                                                    tarefa,
                                                            }
                                                        )
                                                    }
                                                />
                                            )}

                                            <ButtonIcon
                                                name="delete-outline"
                                                size={28}
                                                color="#dc3545"
                                                style={styles.botaoAcao}
                                                onPress={() =>
                                                    apagarTarefa(tarefa.id)
                                                }
                                            />
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </View>
                </ScrollView>

                <View style={styles.footerContainer}>
                    <Button
                        title="Adicionar Nova Tarefa"
                        style={styles.botao}
                        onPress={() => navigation.push("CadastroTarefa")}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}