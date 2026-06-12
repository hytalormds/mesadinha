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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";


import type { RootStackParamList, Usuario } from "@/types/navigation";
import styles from "./styles";

const USUARIOS_STORAGE_KEY = "@mesadinha:usuarios";
const USUARIO_LOGADO_STORAGE_KEY = "@mesadinha:usuario_logado";

export default function VincularFilho() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "VincularFilho">
        >();

    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [filhos, setFilhos] = React.useState<Usuario[]>([]);
    const [carregouFilhos, setCarregouFilhos] = React.useState(false);
    const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(null);
    React.useEffect(() => {
        async function carregarFilhos() {
            try {
                const usuariosSalvos = await AsyncStorage.getItem(
                    USUARIOS_STORAGE_KEY
                );

                if (usuariosSalvos) {
                    const usuarios: Usuario[] = JSON.parse(usuariosSalvos);

                    const filhosCadastrados = usuarios.filter(
                        (usuario) => usuario.id_tipo === 2
                    );

                    setFilhos(filhosCadastrados);
                } else {
                    setFilhos([]);
                }
            } catch (error) {
                console.log("Erro ao carregar filhos:", error);
                setFilhos([]);
            } finally {
                setCarregouFilhos(true);
            }
        }

        carregarFilhos();
    }, []);

    React.useEffect(() => {
        async function salvarFilhos() {
            if (!carregouFilhos) {
                return;
            }

            try {
                await AsyncStorage.setItem(
                    USUARIOS_STORAGE_KEY,
                    JSON.stringify(filhos)
                );
            } catch (error) {
                console.log("Erro ao salvar filhos:", error);
            }
        }

        salvarFilhos();
    }, [filhos, carregouFilhos]);
    React.useEffect(() => {
        async function carregarUsuarioLogado() {
            try {
                const usuarioSalvo = await AsyncStorage.getItem(
                    USUARIO_LOGADO_STORAGE_KEY
                );

                if (usuarioSalvo) {
                    const usuario: Usuario = JSON.parse(usuarioSalvo);

                    setUsuarioLogado(usuario);

                    if (usuario.id_tipo !== 1) {
                        Alert.alert(
                            "Acesso negado",
                            "Somente o responsável pode cadastrar filhos."
                        );

                        navigation.reset({
                            index: 0,
                            routes: [{ name: "ListaTarefas" }],
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
        if (!nome.trim()) {
            Alert.alert("Atenção", "Digite o nome do filho.");
            return false;
        }

        return true;
    }

    function cadastrarFilho() {
        if (!validarFormulario()) {
            return;
        }

        const novoFilho: Usuario = {
            id_usuario: String(Date.now()),
            nome: nome.trim(),
            email: email.trim() || undefined,
            id_tipo: 2,
        };

        setFilhos((filhosAtuais) => [...filhosAtuais, novoFilho]);

        setNome("");
        setEmail("");

        Alert.alert("Sucesso", "Filho cadastrado com sucesso.");
    }

    function excluirFilho(id_usuario: string) {
        Alert.alert(
            "Excluir filho",
            "Deseja realmente excluir este filho?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        setFilhos((filhosAtuais) =>
                            filhosAtuais.filter(
                                (filho) => filho.id_usuario !== id_usuario
                            )
                        );
                    },
                },
            ]
        );
    }
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

                    <TouchableOpacity
                        style={styles.botaoCadastrar}
                        onPress={cadastrarFilho}
                    >
                        <Text style={styles.botaoCadastrarTexto}>
                            Cadastrar Filho
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.secaoTitulo}>Filhos cadastrados</Text>

                    {filhos.length === 0 ? (
                        <View style={styles.cardVazio}>
                            <MaterialIcons
                                name="person-outline"
                                size={38}
                                color="#999"
                            />

                            <Text style={styles.textoVazio}>
                                Nenhum filho cadastrado.
                            </Text>
                        </View>
                    ) : (
                        filhos.map((filho) => (
                            <View
                                key={filho.id_usuario}
                                style={styles.cardFilho}
                            >
                                <View style={styles.cardFilhoInfo}>
                                    <Text style={styles.nomeFilho}>
                                        {filho.nome}
                                    </Text>

                                    <Text style={styles.emailFilho}>
                                        {filho.email || "Sem e-mail informado"}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() =>
                                        excluirFilho(filho.id_usuario)
                                    }
                                >
                                    <MaterialIcons
                                        name="delete-outline"
                                        size={26}
                                        color="#dc3545"
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