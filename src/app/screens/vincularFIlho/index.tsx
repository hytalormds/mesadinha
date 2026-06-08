import React from "react";
import {
    Text,
    View,
    TextInput,
    Alert,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Button } from "../../../componentes/Button";

export default function VincularFilho() {
    const navigation = useNavigation<any>();

    const [nomeFilho, setNomeFilho] = React.useState("");
    const [codigoVinculo, setCodigoVinculo] = React.useState("");

    async function vincularFilho() {
        console.log("Botão Vincular Filho pressionado");

        if (!nomeFilho.trim()) {
            Alert.alert("Atenção", "Digite o nome do filho.");
            return;
        }

        if (!codigoVinculo.trim()) {
            Alert.alert("Atenção", "Digite o código informado pelo responsável.");
            return;
        }

        try {
            const usuarioPaiSalvo = await AsyncStorage.getItem("@usuario_pai");

            console.log("Usuário pai salvo:", usuarioPaiSalvo);

            if (!usuarioPaiSalvo) {
                Alert.alert("Erro", "Nenhum responsável cadastrado neste aparelho.");
                return;
            }

            const usuarioPai = JSON.parse(usuarioPaiSalvo);

            console.log("Código digitado:", codigoVinculo.trim());
            console.log("Código do responsável:", usuarioPai.codigoVinculo);

            if (usuarioPai.codigoVinculo !== codigoVinculo.trim()) {
                Alert.alert("Código inválido", "O código informado não confere.");
                return;
            }

            const filho = {
                nome: nomeFilho.trim(),
                tipoUsuario: "Filho",
                codigoVinculo: codigoVinculo.trim(),
                responsavel: usuarioPai.nome,
                emailResponsavel: usuarioPai.email,
            };

            await AsyncStorage.setItem("@usuario_filho", JSON.stringify(filho));

            console.log("Filho vinculado:", filho);

            Alert.alert("Sucesso", "Filho vinculado com sucesso!");

            navigation.navigate("Login");
        } catch (error) {
            console.log("Erro ao vincular filho:", error);
            Alert.alert("Erro", "Não foi possível vincular o filho.");
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.containerLogo}>
                        <View style={styles.headerRow}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titulo}>Vincular Filho</Text>

                                <Text style={styles.subtitulo}>
                                    Informe o código recebido pelo responsável
                                </Text>
                            </View>

                            <Image
                                source={require("src/assets/logo.png")}
                                style={styles.logoTop}
                            />
                        </View>
                    </View>

                    <View style={styles.containerForm}>
                      

                        <Text style={styles.label}>Nome do Filho</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome do filho"
                            value={nomeFilho}
                            onChangeText={setNomeFilho}
                        />

                        <Text style={styles.label}>Código do Responsável</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: PAI-1234"
                            value={codigoVinculo}
                            onChangeText={setCodigoVinculo}
                            autoCapitalize="characters"
                        />

                        <Button
                            title="Vincular Filho"
                            style={styles.botao}
                            onPress={vincularFilho}
                        />

                     
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}



