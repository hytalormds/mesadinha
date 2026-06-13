import React from "react";
import {
    Text,
    View,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./styles";
import type {
    RootStackParamList,
    Usuario,
    Carteira,
} from "@/types/navigation";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const USUARIO_LOGADO_STORAGE_KEY = STORAGE_KEYS.usuarioLogado;
const USUARIOS_STORAGE_KEY = STORAGE_KEYS.usuarios;
const CARTEIRAS_STORAGE_KEY = STORAGE_KEYS.carteiras;

const USUARIO_RESPONSAVEL_PADRAO: Usuario = {
    id_usuario: "1",
    nome: "Responsável",
    email: "pai@mesadinha.com",
    id_tipo: 1,
};

export default function Familia() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Familia">
        >();

    const [usuarioLogado, setUsuarioLogado] =
        React.useState<Usuario | null>(null);

    const [membros, setMembros] = React.useState<Usuario[]>([]);
    const [carteiras, setCarteiras] = React.useState<Carteira[]>([]);
    const [carregando, setCarregando] = React.useState(true);

    React.useEffect(() => {
        async function carregarDados() {
            try {
                const usuarioSalvo = await AsyncStorage.getItem(
                    USUARIO_LOGADO_STORAGE_KEY
                );

                if (!usuarioSalvo) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                    return;
                }

                const usuario: Usuario = JSON.parse(usuarioSalvo);
                setUsuarioLogado(usuario);

                const usuariosSalvos = await AsyncStorage.getItem(
                    USUARIOS_STORAGE_KEY
                );

                const usuariosCadastrados: Usuario[] = usuariosSalvos
                    ? JSON.parse(usuariosSalvos)
                    : [];

                const membrosComResponsavel = [
                    USUARIO_RESPONSAVEL_PADRAO,
                    ...usuariosCadastrados,
                    usuario,
                ];

                const membrosUnicos = membrosComResponsavel.filter(
                    (membro, index, array) =>
                        array.findIndex(
                            (item) =>
                                String(item.id_usuario) ===
                                String(membro.id_usuario)
                        ) === index
                );

                const membrosOrdenados = membrosUnicos.sort((a, b) => {
                    if (a.id_tipo !== b.id_tipo) {
                        return a.id_tipo - b.id_tipo;
                    }

                    return a.nome.localeCompare(b.nome);
                });

                setMembros(membrosOrdenados);

                const carteirasSalvas = await AsyncStorage.getItem(
                    CARTEIRAS_STORAGE_KEY
                );

                const carteirasCadastradas: Carteira[] = carteirasSalvas
                    ? JSON.parse(carteirasSalvas)
                    : [];

                setCarteiras(carteirasCadastradas);
            } catch (error) {
                console.log("Erro ao carregar família:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    function formatarValor(valor?: number) {
        return (valor ?? 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function obterSaldoUsuario(id_usuario: string) {
        const carteira = carteiras.find(
            (item) => String(item.fk_usuario_id) === String(id_usuario)
        );

        return carteira?.saldo ?? 0;
    }

    function obterPerfil(usuario: Usuario) {
        return usuario.id_tipo === 1 ? "Responsável" : "Filho";
    }

    const totalSaldos = membros.reduce((total, membro) => {
        return total + obterSaldoUsuario(membro.id_usuario);
    }, 0);

    if (carregando) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerCentralizado}>
                    <Text style={styles.textoCarregando}>
                        Carregando família...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!usuarioLogado) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerCentralizado}>
                    <Text style={styles.textoCarregando}>
                        Usuário não encontrado.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.titulo}>Família</Text>
                </View>

                <View style={styles.cardResumo}>
                    <MaterialIcons
                        name="groups"
                        size={48}
                        color="#007BFF"
                    />

                    <Text style={styles.resumoTitulo}>
                        Membros cadastrados
                    </Text>

                    <Text style={styles.quantidadeMembros}>
                        {membros.length}
                    </Text>

                    <Text style={styles.resumoSaldoLabel}>
                        Saldo total
                    </Text>

                    <Text style={styles.resumoSaldoValor}>
                        {formatarValor(totalSaldos)}
                    </Text>
                </View>

                <Text style={styles.secaoTitulo}>
                    Membros da família
                </Text>

                {membros.map((membro) => {
                    const saldo = obterSaldoUsuario(membro.id_usuario);
                    const ehResponsavel = membro.id_tipo === 1;

                    return (
                        <View
                            key={membro.id_usuario}
                            style={styles.cardMembro}
                        >
                            <View style={styles.iconeContainer}>
                                <MaterialIcons
                                    name={
                                        ehResponsavel
                                            ? "supervisor-account"
                                            : "child-care"
                                    }
                                    size={28}
                                    color="#007BFF"
                                />
                            </View>

                            <View style={styles.membroInfo}>
                                <Text style={styles.nomeMembro}>
                                    {membro.nome}
                                </Text>

                                <Text style={styles.emailMembro}>
                                    {membro.email || "Sem e-mail informado"}
                                </Text>

                                <Text style={styles.perfilMembro}>
                                    {obterPerfil(membro)}
                                </Text>
                            </View>

                            <View style={styles.saldoContainer}>
                                <Text style={styles.saldoLabel}>
                                    Saldo
                                </Text>

                                <Text style={styles.saldoValor}>
                                    {formatarValor(saldo)}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
