import React from "react";
import {
    Alert,
    Modal,
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
import { STORAGE_KEYS } from "@/constants/storageKeys";
import styles from "./styles";
import type {
    RootStackParamList,
    Usuario,
    Carteira,
    Movimentacao,
    Tarefa,
} from "@/types/navigation";

const USUARIO_LOGADO_STORAGE_KEY = STORAGE_KEYS.usuarioLogado;
const USUARIOS_STORAGE_KEY = STORAGE_KEYS.usuarios;
const CARTEIRAS_STORAGE_KEY = STORAGE_KEYS.carteiras;
const MOVIMENTACOES_STORAGE_KEY = STORAGE_KEYS.movimentacoes;
const TAREFAS_STORAGE_KEY = STORAGE_KEYS.tarefas;

export default function Cofrinho() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Cofrinho">
        >();

    const [usuarioLogado, setUsuarioLogado] =
        React.useState<Usuario | null>(null);

    const [filhos, setFilhos] = React.useState<Usuario[]>([]);
    const [carteiras, setCarteiras] = React.useState<Carteira[]>([]);
    const [movimentacoes, setMovimentacoes] = React.useState<Movimentacao[]>([]);
    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [carregando, setCarregando] = React.useState(true);
    const [filhoSaque, setFilhoSaque] = React.useState<Usuario | null>(null);
    const [valorSaque, setValorSaque] = React.useState("");

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

                const filhosCadastrados = usuariosCadastrados.filter(
                    (item) => item.id_tipo === 2
                );

                setFilhos(filhosCadastrados);

                const carteirasSalvas = await AsyncStorage.getItem(
                    CARTEIRAS_STORAGE_KEY
                );

                const carteirasCadastradas: Carteira[] = carteirasSalvas
                    ? JSON.parse(carteirasSalvas)
                    : [];

                setCarteiras(carteirasCadastradas);

                const movimentacoesSalvas = await AsyncStorage.getItem(
                    MOVIMENTACOES_STORAGE_KEY
                );

                const movimentacoesCadastradas: Movimentacao[] =
                    movimentacoesSalvas ? JSON.parse(movimentacoesSalvas) : [];

                setMovimentacoes(movimentacoesCadastradas);

                const tarefasSalvas = await AsyncStorage.getItem(
                    TAREFAS_STORAGE_KEY
                );

                const tarefasCadastradas: Tarefa[] = tarefasSalvas
                    ? JSON.parse(tarefasSalvas)
                    : [];

                setTarefas(tarefasCadastradas);
            } catch (error) {
                console.log("Erro ao carregar cofrinho:", error);
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

    function formatarData(dataISO?: string) {
        if (!dataISO) {
            return "Data não informada";
        }

        const data = new Date(dataISO);

        if (Number.isNaN(data.getTime())) {
            return "Data não informada";
        }

        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    function obterSaldoUsuario(id_usuario: string) {
        const carteira = carteiras.find(
            (item) => String(item.fk_usuario_id) === String(id_usuario)
        );

        return carteira?.saldo ?? 0;
    }

    function obterCarteiraUsuario(id_usuario: string) {
        return carteiras.find(
            (item) => String(item.fk_usuario_id) === String(id_usuario)
        );
    }

    function obterNomeTarefa(id_tarefa?: string) {
        if (!id_tarefa) {
            return "Movimentação manual";
        }

        const tarefa = tarefas.find(
            (item) => String(item.id) === String(id_tarefa)
        );

        return tarefa?.titulo ?? "Tarefa não encontrada";
    }

    function obterDonoDaCarteira(id_carteira: string) {
        const carteira = carteiras.find(
            (item) => String(item.id_carteira) === String(id_carteira)
        );

        if (!carteira) {
            return "Usuário não encontrado";
        }

        const filho = filhos.find(
            (item) => String(item.id_usuario) === String(carteira.fk_usuario_id)
        );

        if (filho) {
            return filho.nome;
        }

        if (String(usuarioLogado?.id_usuario) === String(carteira.fk_usuario_id)) {
            return usuarioLogado?.nome ?? "Usuário";
        }

        return "Usuário não encontrado";
    }

    function abrirSaque(filho: Usuario) {
        setFilhoSaque(filho);
        setValorSaque("");
    }

    function fecharSaque() {
        setFilhoSaque(null);
        setValorSaque("");
    }

    async function realizarSaque(valor: number, carteiraFilho: Carteira) {
        const carteirasAtualizadas = carteiras.map((carteira) => {
            if (carteira.id_carteira === carteiraFilho.id_carteira) {
                return {
                    ...carteira,
                    saldo: carteira.saldo - valor,
                };
            }

            return carteira;
        });

        const novaMovimentacao: Movimentacao = {
            id_movimentacao: String(Date.now()),
            tipo_movimentacao: "saida",
            data: new Date().toISOString(),
            valor,
            fk_carteira_id: carteiraFilho.id_carteira,
        };

        const movimentacoesAtualizadas = [
            novaMovimentacao,
            ...movimentacoes,
        ];

        await AsyncStorage.setItem(
            CARTEIRAS_STORAGE_KEY,
            JSON.stringify(carteirasAtualizadas)
        );

        await AsyncStorage.setItem(
            MOVIMENTACOES_STORAGE_KEY,
            JSON.stringify(movimentacoesAtualizadas)
        );

        setCarteiras(carteirasAtualizadas);
        setMovimentacoes(movimentacoesAtualizadas);
        fecharSaque();

        Alert.alert("Sucesso", "Saque realizado com sucesso.");
    }

    function confirmarSaque() {
        if (!filhoSaque) {
            return;
        }

        const valor = Number(valorSaque.replace(",", "."));

        if (!valor || valor <= 0) {
            Alert.alert("Atenção", "Digite um valor válido para sacar.");
            return;
        }

        const carteiraFilho = obterCarteiraUsuario(filhoSaque.id_usuario);

        if (!carteiraFilho) {
            Alert.alert("Atenção", "Este filho ainda não possui saldo.");
            return;
        }

        if (valor > carteiraFilho.saldo) {
            Alert.alert("Atenção", "O valor do saque é maior que o saldo.");
            return;
        }

        Alert.alert(
            "Confirmar saque",
            `Tem certeza que deseja sacar ${formatarValor(valor)} de ${filhoSaque.nome}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sacar",
                    style: "destructive",
                    onPress: () => realizarSaque(valor, carteiraFilho),
                },
            ]
        );
    }

    const usuarioEhPai = usuarioLogado?.id_tipo === 1;
    const usuarioEhFilho = usuarioLogado?.id_tipo === 2;

    const saldoUsuarioLogado = usuarioLogado
        ? obterSaldoUsuario(usuarioLogado.id_usuario)
        : 0;

    const totalFilhos = filhos.reduce((total, filho) => {
        return total + obterSaldoUsuario(filho.id_usuario);
    }, 0);

    const movimentacoesVisiveis = movimentacoes.filter((movimentacao) => {
        if (usuarioEhPai) {
            return true;
        }

        if (!usuarioLogado) {
            return false;
        }

        const carteiraUsuarioLogado = obterCarteiraUsuario(
            usuarioLogado.id_usuario
        );

        if (!carteiraUsuarioLogado) {
            return false;
        }

        return (
            String(movimentacao.fk_carteira_id) ===
            String(carteiraUsuarioLogado.id_carteira)
        );
    });

    if (carregando) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerCentralizado}>
                    <Text style={styles.textoCarregando}>
                        Carregando cofrinho...
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
                    <Text style={styles.titulo}>
                        {usuarioEhPai ? "Cofrinhos" : "Meu Cofrinho"}
                    </Text>
                </View>

                {usuarioEhPai && (
                    <>
                        <View style={styles.cardResumo}>
                            <MaterialIcons
                                name="savings"
                                size={48}
                                color="#007BFF"
                            />

                            <Text style={styles.resumoTitulo}>
                                Total dos filhos
                            </Text>

                            <Text style={styles.valorTotal}>
                                {formatarValor(totalFilhos)}
                            </Text>
                        </View>

                        <Text style={styles.secaoTitulo}>
                            Cofrinho dos filhos
                        </Text>

                        {filhos.length === 0 ? (
                            <View style={styles.cardInfo}>
                                <Text style={styles.infoTitulo}>
                                    Nenhum filho cadastrado
                                </Text>

                                <Text style={styles.infoTexto}>
                                    Cadastre os filhos para visualizar os saldos
                                    dos cofrinhos.
                                </Text>
                            </View>
                        ) : (
                            filhos.map((filho) => {
                                const saldo = obterSaldoUsuario(
                                    filho.id_usuario
                                );

                                return (
                                    <View
                                        key={filho.id_usuario}
                                        style={styles.cardFilho}
                                    >
                                        <View style={styles.cardFilhoIcone}>
                                            <MaterialIcons
                                                name="person"
                                                size={28}
                                                color="#007BFF"
                                            />
                                        </View>

                                        <View style={styles.cardFilhoInfo}>
                                            <Text style={styles.nomeFilho}>
                                                {filho.nome}
                                            </Text>

                                            <Text style={styles.emailFilho}>
                                                {filho.email ||
                                                    "Sem e-mail informado"}
                                            </Text>
                                        </View>

                                        <View style={styles.cardFilhoSaldo}>
                                            <Text style={styles.labelSaldo}>
                                                Saldo
                                            </Text>

                                            <Text style={styles.valorFilho}>
                                                {formatarValor(saldo)}
                                            </Text>

                                            <TouchableOpacity
                                                style={styles.botaoSacar}
                                                onPress={() =>
                                                    abrirSaque(filho)
                                                }
                                            >
                                                <Text
                                                    style={styles.botaoSacarTexto}
                                                >
                                                    Sacar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </>
                )}

                {usuarioEhFilho && (
                    <>
                        <View style={styles.cardSaldo}>
                            <MaterialIcons
                                name="savings"
                                size={56}
                                color="#007BFF"
                            />

                            <Text style={styles.nomeUsuario}>
                                {usuarioLogado.nome}
                            </Text>

                            <Text style={styles.labelSaldo}>
                                Saldo atual
                            </Text>

                            <Text style={styles.valorSaldo}>
                                {formatarValor(saldoUsuarioLogado)}
                            </Text>
                        </View>

                        <View style={styles.cardInfo}>
                            <Text style={styles.infoTitulo}>
                                Como o saldo aumenta?
                            </Text>

                            <Text style={styles.infoTexto}>
                                Quando você conclui uma tarefa e o responsável
                                aceita a conclusão, o valor da recompensa é
                                adicionado ao seu cofrinho.
                            </Text>
                        </View>
                    </>
                )}

                <Text style={styles.historicoTitulo}>
                    Histórico de movimentações
                </Text>

                {movimentacoesVisiveis.length === 0 ? (
                    <View style={styles.cardInfo}>
                        <Text style={styles.infoTitulo}>
                            Nenhuma movimentação
                        </Text>

                        <Text style={styles.infoTexto}>
                            As recompensas aprovadas aparecerão aqui.
                        </Text>
                    </View>
                ) : (
                    movimentacoesVisiveis.map((movimentacao) => {
                        const tituloTarefa = obterNomeTarefa(
                            movimentacao.fk_tarefa_id
                        );

                        const donoCarteira = obterDonoDaCarteira(
                            movimentacao.fk_carteira_id
                        );

                        return (
                            <View
                                key={movimentacao.id_movimentacao}
                                style={styles.cardMovimentacao}
                            >
                                <View style={styles.movimentacaoIcone}>
                                    <MaterialIcons
                                        name={
                                            movimentacao.tipo_movimentacao ===
                                                "entrada"
                                                ? "arrow-downward"
                                                : "arrow-upward"
                                        }
                                        size={22}
                                        color={
                                            movimentacao.tipo_movimentacao ===
                                                "entrada"
                                                ? "#28a745"
                                                : "#dc3545"
                                        }
                                    />
                                </View>

                                <View style={styles.movimentacaoInfo}>
                                    <Text style={styles.movimentacaoTitulo}>
                                        {tituloTarefa}
                                    </Text>

                                    <Text style={styles.movimentacaoDescricao}>
                                        {usuarioEhPai
                                            ? `Cofrinho: ${donoCarteira}`
                                            : "Recompensa recebida"}
                                    </Text>

                                    <Text style={styles.movimentacaoData}>
                                        {formatarData(movimentacao.data)}
                                    </Text>
                                </View>

                                <Text
                                    style={
                                        movimentacao.tipo_movimentacao ===
                                            "entrada"
                                            ? styles.movimentacaoValorEntrada
                                            : styles.movimentacaoValorSaida
                                    }
                                >
                                    {movimentacao.tipo_movimentacao ===
                                        "entrada"
                                        ? "+"
                                        : "-"}{" "}
                                    {formatarValor(movimentacao.valor)}
                                </Text>
                            </View>
                        );
                    })
                )}
            </ScrollView>

            <Modal
                visible={!!filhoSaque}
                transparent
                animationType="fade"
                onRequestClose={fecharSaque}
            >
                <View style={styles.modalFundo}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitulo}>Sacar dinheiro</Text>

                        <Text style={styles.modalTexto}>
                            {filhoSaque
                                ? `Saldo de ${filhoSaque.nome}: ${formatarValor(
                                    obterSaldoUsuario(filhoSaque.id_usuario)
                                )}`
                                : ""}
                        </Text>

                        <TextInput
                            style={styles.inputSaque}
                            placeholder="Valor do saque"
                            keyboardType="decimal-pad"
                            value={valorSaque}
                            onChangeText={setValorSaque}
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={styles.botaoCancelar}
                                onPress={fecharSaque}
                            >
                                <Text style={styles.botaoCancelarTexto}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botaoConfirmar}
                                onPress={confirmarSaque}
                            >
                                <Text style={styles.botaoConfirmarTexto}>
                                    Sacar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
