import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, TextInput } from 'react-native';

export default function TelaCadastro() {
    const validarFormulario = () => {
        if (!nome.trim()) {
            alert("Por favor, insira seu nome completo.");
            return false;
        }
        if (!telefone.trim()) {
            alert("Por favor, insira seu telefone.");
            return false;
        }
        if (!cpf.trim()) {
            alert("Por favor, insira seu CPF.");
            return false;
        }
        if (!dataNascimento.trim()) {
            alert("Por favor, insira sua data de nascimento.");
            return false;
        }

        if (!email.trim()) {
            alert("Por favor, insira seu e-mail.");
            return false;
        }

        if (!senha.trim()) {
            alert("Por favor, insira uma senha.");
            return false;
        }
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return false;
        }
        return true;
    };

    const formatarCPF = (texto: string) => {
        const numeros = texto.replace(/\D/g, '');

        return numeros
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };
    const formatarData = (texto: string) => {
        const numeros = texto.replace(/\D/g, '');

        return numeros
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .slice(0, 10);
    };
    const formatarTelefone = (texto: string) => {
        const numeros = texto.replace(/\D/g, '');

        return numeros
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    };



    const navigation = useNavigation<any>();
    const [nome, setNome] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [dataNascimento, setDataNascimento] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.containerLogo}>

                    <View style={styles.headerRow}>

                        <View style={styles.textContainer}>
                            <Text style={styles.titulo}>Cadastre-se!</Text>
                            <Text style={styles.subtitulo}>Crie sua conta para começar a usar o app.</Text>
                        </View>

                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.logoTop}
                            resizeMode="contain"
                        />

                    </View>

                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtituloForm}>
                        Preencha os campos abaixo para criar sua conta.
                    </Text>

                    <Text
                        style={styles.label}>
                        Nome Completo
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu nome"
                        value={nome}
                        onChangeText={setNome} />

                    <Text
                        style={styles.label}>
                        Telefone
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(00) 00000-0000"
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={(text) =>
                            setTelefone(formatarTelefone(text))
                        }
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="000.000.000-00"
                        keyboardType="numeric"
                        value={cpf}
                        onChangeText={(text) => setCpf(formatarCPF(text))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        keyboardType="numeric"
                        value={dataNascimento}
                        onChangeText={(text) => setDataNascimento(formatarData(text))}
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.input} placeholder="seu.email@exemplo.com" keyboardType="email-address" value={email} onChangeText={setEmail} />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry value={senha} onChangeText={setSenha} />

                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput style={styles.input} placeholder="Repita sua senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => {
                            if (validarFormulario()) {
                                navigation.navigate("Login");
                            }
                        }}>
                        <Text style={styles.botaoText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Já tem conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.footerLink}>Faça login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
}