import React from "react";
import {
    Platform,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
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

const TAREFAS_INICIAIS: Tarefa[] = [
    {
        id: "1",
        titulo: "Arrumar o quarto",
        descricao: "Organizar cama, roupas e objetos pessoais.",
        dataLimite: "10/10/2026",
        valor_recompensa: 5,
        concluida: true,
    },
    {
        id: "2",
        titulo: "Fazer lição de casa",
        descricao: "Realizar as atividades escolares.",
        dataLimite: "10/10/2026",
        valor_recompensa: 5,
        concluida: false,
    },
];


export default function ListaTarefas() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregouTarefas, setCarregouTarefas] = React.useState(false);
    React.useEffect(() => {
        async function carregarTarefas() {
            try {
                const tarefasSalvas = await AsyncStorage.getItem(STORAGE_KEY);
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
    }, [route.params?.tarefaSalva]);

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
                                <Text style={styles.titulo}>Lista de Tarefas</Text>

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

                        <View style={styles.formContainer}>
                            {tarefas.map((tarefa, index) => (
                                <View
                                    key={tarefa.id}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() =>
                                            navigation.navigate("CadastroTarefa", {
                                                tarefaEditando: tarefa,
                                            })
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.label,
                                                tarefa.concluida && {
                                                    textDecorationLine: "line-through",
                                                    color: "#777",
                                                },
                                            ]}
                                        >
                                            Tarefa {index + 1}: {tarefa.titulo}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => alternarConclusaoTarefa(tarefa.id)}
                                    >
                                        <MaterialIcons
                                            name={
                                                tarefa.concluida
                                                    ? "check-circle"
                                                    : "radio-button-unchecked"
                                            }
                                            size={22}
                                            color={tarefa.concluida ? "#007bff" : "#999"}
                                            style={{ marginLeft: 8, marginTop: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    <View style={styles.footerContainer}>
                        <Button
                            title="Adicionar Nova Tarefa"
                            style={styles.botao}
                            onPress={() => navigation.navigate("CadastroTarefa")}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}