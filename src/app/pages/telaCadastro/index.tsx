import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastro() {
    // Estados para armazenar os dados do formulário
    const navigation = useNavigation<any>();
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");
    // Validação simples do formulário
    const validarFormulario = () => {
        if (!nome.trim()) return alert("Digite seu nome"), false;
        if (!email.trim()) return alert("Digite seu e-mail"), false;
        if (!senha.trim()) return alert("Digite sua senha"), false;
        if (senha !== confirmarSenha) return alert("Senhas não coincidem"), false;

        return true;
    };
    // Função para salvar os dados do usuário no AsyncStorage
    const salvarUsuario = async () => {
        const codigoVinculo = gerarCodigoVinculo();

        const usuario = {
            nome,
            email,
            senha,
            tipoUsuario: "Pai",
            codigoVinculo,
        };

        await AsyncStorage.setItem("@usuario_pai", JSON.stringify(usuario));

        alert(`Cadastro realizado com sucesso!\nCódigo do filho: ${codigoVinculo}`);
    };

    function gerarCodigoVinculo() {
        const numero = Math.floor(1000 + Math.random() * 9000);
        return `PAI-${numero}`;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    {/* HEADER */}
                    <View style={styles.containerLogo}>
                        <View style={styles.headerRow}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titulo}>Cadastre-se!</Text>
                                <Text style={styles.subtitulo}>
                                    Crie sua conta para começar
                                </Text>
                            </View>

                            <Image
                                source={require("../../assets/logo.png")}
                                style={styles.logoTop}
                            />
                        </View>
                    </View>

                    {/* FORM */}
                    <View style={styles.containerForm}>

                        <Text style={styles.subtituloForm}>
                            Preencha os campos
                        </Text>

                        <Text style={styles.label}>Nome</Text>
                        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                        <Text style={styles.label}>Senha</Text>
                        <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput style={styles.input} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

                        {/* TIPO DE USUÁRIO */}


                        {/* BOTÕES */}
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={async () => {
                                if (validarFormulario()) {
                                    await salvarUsuario();
                                    navigation.navigate("Login");
                                }
                            }}
                        >
                            <Text style={styles.botaoText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <Text style={styles.botaoText}>Cadastrar</Text>

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={async () => {
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styles.botaoText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}