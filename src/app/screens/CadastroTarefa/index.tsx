import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Text,
    View,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
} from "react-native";
import {
    useNavigation,
    useRoute,
    useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import type {
    RootStackParamList,
    Tarefa,
    Usuario,
} from "@/types/navigation";


const LIMITE_DESCRICAO = 250;
const USUARIOS_STORAGE_KEY = "@mesadinha:usuarios";

export default function CadastroTarefa() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "CadastroTarefa">
        >();

    const route = useRoute<RouteProp<RootStackParamList, "CadastroTarefa">>();

    const tarefaEditando = route.params?.tarefaEditando;

    const [titulo, setTitulo] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [dataLimite, setDataLimite] = React.useState("");
    const [valor_recompensa, setvalor_recompensa] = React.useState("");
    const [usuarioResponsavelId, setUsuarioResponsavelId] = React.useState("");
    const [filhosCadastrados, setFilhosCadastrados] = React.useState<Usuario[]>([]);

    async function carregarFilhos() {
        try {
            const usuariosSalvos = await AsyncStorage.getItem(
                USUARIOS_STORAGE_KEY
            );

            if (usuariosSalvos) {
                const usuarios: Usuario[] = JSON.parse(usuariosSalvos);

                const filhos = usuarios.filter(
                    (usuario) => usuario.id_tipo === 2
                );

                setFilhosCadastrados(filhos);
            } else {
                setFilhosCadastrados([]);
            }
        } catch (error) {
            console.log("Erro ao carregar filhos:", error);
            setFilhosCadastrados([]);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            carregarFilhos();
        }, [])
    );
    React.useEffect(() => {
        if (tarefaEditando) {
            setTitulo(tarefaEditando.titulo);
            setDescricao(tarefaEditando.descricao ?? "");
            setDataLimite(tarefaEditando.dataLimite ?? "");
            setUsuarioResponsavelId(
                tarefaEditando.fk_usuario_responsavel ?? ""
            );

            setvalor_recompensa(
                tarefaEditando.valor_recompensa
                    ? formatarNumeroParaMoeda(tarefaEditando.valor_recompensa)
                    : ""
            );
        } else {
            setTitulo("");
            setDescricao("");
            setDataLimite("");
            setvalor_recompensa("");
            setUsuarioResponsavelId("");
        }
    }, [tarefaEditando]);

    function formatarDataDigitada(texto: string) {
        const numeros = texto.replace(/\D/g, "").slice(0, 8);

        if (numeros.length <= 2) {
            return numeros;
        }

        if (numeros.length <= 4) {
            return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        }

        return `${numeros.slice(0, 2)}/${numeros.slice(
            2,
            4
        )}/${numeros.slice(4)}`;
    }

    function dataValida(dataTexto: string) {
        const partes = dataTexto.split("/");

        if (partes.length !== 3) {
            return false;
        }

        const dia = Number(partes[0]);
        const mes = Number(partes[1]);
        const ano = Number(partes[2]);

        if (!dia || !mes || !ano) {
            return false;
        }

        const dataTeste = new Date(ano, mes - 1, dia);

        return (
            dataTeste.getFullYear() === ano &&
            dataTeste.getMonth() === mes - 1 &&
            dataTeste.getDate() === dia
        );
    }

    function formatarvalor_recompensa(texto: string) {
        const numeros = texto.replace(/\D/g, "");

        if (!numeros) {
            return "";
        }

        const valor = Number(numeros) / 100;

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function formatarNumeroParaMoeda(valor: number) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function converterMoedaParaNumero(valor: string) {
        const numeros = valor.replace(/\D/g, "");

        return Number(numeros) / 100;
    }

    function validarFormulario() {
        if (!usuarioResponsavelId) {
            Alert.alert("Atenção", "Selecione o filho responsável pela tarefa.");
            return false;
        }

        if (!titulo.trim()) {
            Alert.alert("Atenção", "Digite o título da tarefa.");
            return false;
        }

        if (!descricao.trim()) {
            Alert.alert("Atenção", "Digite a descrição da tarefa.");
            return false;
        }

        if (!valor_recompensa.trim()) {
            Alert.alert("Atenção", "Digite o valor da recompensa.");
            return false;
        }

        if (converterMoedaParaNumero(valor_recompensa) <= 0) {
            Alert.alert("Atenção", "Digite um valor de recompensa válido.");
            return false;
        }

        if (!dataLimite.trim()) {
            Alert.alert("Atenção", "Digite a data limite da tarefa.");
            return false;
        }

        if (!dataValida(dataLimite)) {
            Alert.alert(
                "Atenção",
                "Digite uma data válida no formato DD/MM/AAAA."
            );
            return false;
        }

        return true;
    }

    function salvarTarefa() {
        if (!validarFormulario()) {
            return;
        }

        const usuarioResponsavel = FILHOS_CADASTRADOS.find(
            (usuario) => usuario.id_usuario === usuarioResponsavelId
        );

        if (!usuarioResponsavel) {
            Alert.alert("Atenção", "Filho responsável não encontrado.");
            return;
        }

        const tarefaSalva: Tarefa = {
            id: tarefaEditando?.id ?? String(Date.now()),
            titulo,
            descricao,
            dataLimite,
            valor_recompensa: converterMoedaParaNumero(valor_recompensa),
            concluida: tarefaEditando?.concluida ?? false,
            status: tarefaEditando?.status ?? "Em Aberto",

            fk_usuario_responsavel: usuarioResponsavel.id_usuario,
            nome_usuario_responsavel: usuarioResponsavel.nome,
        };

        navigation.popTo("ListaTarefas", {
            tarefaSalva,
        });
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
                    <View style={styles.containerForm}>
                        <Text style={styles.label}>Filho responsável</Text>

                        <View style={styles.filhosContainer}>
                            {FILHOS_CADASTRADOS.map((usuario) => {
                                const selecionado =
                                    usuarioResponsavelId === usuario.id_usuario;

                                return (
                                    <TouchableOpacity
                                        key={usuario.id_usuario}
                                        style={[
                                            styles.filhoCard,
                                            selecionado &&
                                            styles.filhoCardSelecionado,
                                        ]}
                                        onPress={() =>
                                            setUsuarioResponsavelId(
                                                usuario.id_usuario
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.filhoNome,
                                                selecionado &&
                                                styles.filhoNomeSelecionado,
                                            ]}
                                        >
                                            {usuario.nome}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <Text style={styles.label}>Título</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite o título da tarefa"
                            value={titulo}
                            keyboardType="default"
                            autoCorrect={true}
                            autoCapitalize="sentences"
                            onChangeText={setTitulo}
                        />

                        <Text style={styles.label}>Descrição</Text>

                        <TextInput
                            style={[styles.input, styles.inputDescricao]}
                            placeholder={`Digite a descrição da tarefa. Máximo de ${LIMITE_DESCRICAO} caracteres.`}
                            value={descricao}
                            keyboardType="default"
                            autoCorrect={true}
                            onChangeText={setDescricao}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            maxLength={LIMITE_DESCRICAO}
                        />

                        <Text
                            style={[
                                styles.contadorCaracteres,
                                descricao.length >= LIMITE_DESCRICAO &&
                                styles.contadorCaracteresLimite,
                            ]}
                        >
                            {descricao.length}/{LIMITE_DESCRICAO} caracteres
                        </Text>

                        <Text style={styles.label}>Valor da recompensa</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="R$ 0,00"
                            keyboardType="numeric"
                            value={valor_recompensa}
                            onChangeText={(text) =>
                                setvalor_recompensa(
                                    formatarvalor_recompensa(text)
                                )
                            }
                        />

                        <Text style={styles.label}>Data limite da tarefa</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/AAAA"
                            value={dataLimite}
                            onChangeText={(text) =>
                                setDataLimite(formatarDataDigitada(text))
                            }
                            keyboardType="numeric"
                            maxLength={10}
                        />

                        <Button
                            title={
                                tarefaEditando
                                    ? "Salvar Alterações"
                                    : "Salvar Tarefa"
                            }
                            style={styles.botao}
                            onPress={salvarTarefa}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}