import React from "react";
import {
    Platform,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";
import { Button } from "../../../componentes/Button";

type Tarefa = {
    id: string;
    titulo: string;
    descricao?: string;
    dataLimite?: string;
    valor_recompensa?: number;
    concluida?: boolean;
};

const STORAGE_KEY = "@mesadinha:tarefas";

export default function ListaTarefas() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregouTarefas, setCarregouTarefas] = React.useState(false);

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
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
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

        const tarefaSalva = route.params?.tarefaSalva as Tarefa | undefined;

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
        Alert.alert(
            "Sair",
            "Deseja realmente sair?",
            [
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
            ]
        );
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

    function alternarConclusaoTarefa(id: string) {
        setTarefas((tarefasAtuais) =>
            tarefasAtuais.map((tarefa) =>
                tarefa.id === id
                    ? {
                        ...tarefa,
                        concluida: !tarefa.concluida,
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
                            tarefasAtuais.filter((tarefa) => tarefa.id !== id)
                        );
                    },
                },
            ]
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
                        <View style={styles.headerTop}>
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

                        <View style={styles.headerRow}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titulo}>
                                    Lista de Tarefas
                                </Text>

                                <Text style={styles.subtitulo}>
                                    Aqui estão todas as suas tarefas cadastradas.
                                </Text>
                            </View>

                            <Image
                                source={require("src/assets/logo.png")}
                                style={styles.logoTop}
                            />
                        </View>
                    </View>

                    <View style={styles.containerForm}>
                        <Text style={styles.subtituloForm}>
                            Toque em uma tarefa para ver os detalhes ou editá-la.
                        </Text>

                        {tarefas.length === 0 ? (
                            <View style={styles.cardVazio}>
                                <MaterialIcons
                                    name="assignment"
                                    size={42}
                                    color="#999"
                                />

                                <Text style={styles.textoVazio}>
                                    Não há tarefa cadastrada.
                                </Text>
                            </View>
                        ) : (
                            tarefas.map((tarefa, index) => (
                                <View
                                    key={tarefa.id}
                                    style={[
                                        styles.cardTarefa,
                                        tarefa.concluida &&
                                        styles.cardTarefaConcluida,
                                    ]}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.cardConteudo}
                                        onPress={() =>
                                            navigation.navigate(
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
                                                        tarefa.concluida &&
                                                        styles.textoConcluido,
                                                    ]}
                                                >
                                                    Tarefa {index + 1}
                                                </Text>

                                                <Text
                                                    style={[
                                                        styles.cardTitulo,
                                                        tarefa.concluida &&
                                                        styles.textoConcluido,
                                                    ]}
                                                >
                                                    {tarefa.titulo}
                                                </Text>
                                            </View>

                                            <Text style={styles.cardValor}>
                                                {formatarValor(
                                                    tarefa.valor_recompensa
                                                )}
                                            </Text>
                                        </View>

                                        <View style={styles.cardInfoRow}>
                                            <MaterialIcons
                                                name="event"
                                                size={18}
                                                color="#666"
                                            />

                                            <Text style={styles.cardInfoTexto}>
                                                Data limite:{" "}
                                                {tarefa.dataLimite ||
                                                    "Não informada"}
                                            </Text>
                                        </View>

                                        <Text style={styles.cardDescricaoTitulo}>
                                            Descrição
                                        </Text>

                                        <Text style={styles.cardDescricao}>
                                            {tarefa.descricao ||
                                                "Sem descrição informada."}
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={styles.cardAcoes}>
                                        <TouchableOpacity
                                            style={styles.botaoAcao}
                                            onPress={() =>
                                                alternarConclusaoTarefa(
                                                    tarefa.id
                                                )
                                            }
                                        >
                                            <MaterialIcons
                                                name={
                                                    tarefa.concluida
                                                        ? "check-circle"
                                                        : "radio-button-unchecked"
                                                }
                                                size={26}
                                                color={
                                                    tarefa.concluida
                                                        ? "#007bff"
                                                        : "#999"
                                                }
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.botaoAcao}
                                            onPress={() =>
                                                apagarTarefa(tarefa.id)
                                            }
                                        >
                                            <MaterialIcons
                                                name="delete-outline"
                                                size={28}
                                                color="#dc3545"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>

                <View style={styles.footerContainer}>
                    <Button
                        title="Adicionar Nova Tarefa"
                        style={styles.botao}
                        onPress={() => navigation.navigate("CadastroTarefa")}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}