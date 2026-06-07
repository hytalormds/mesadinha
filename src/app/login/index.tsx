import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../componentes/Button";
import styles from "./styles";

export default function Login() {
  const navigation = useNavigation<any>();

  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const validarFormulario = () => {
    if (!email.trim()) {
      alert("Digite seu e-mail");
      return false;
    }

    if (!senha.trim()) {
      alert("Digite sua senha");
      return false;
    }

    return true;
  };

  const handleEntrar = () => {
    if (validarFormulario()) {
      navigation.navigate("ListTarefas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Bem-vindo de volta!</Text>

          <Text style={styles.subtitle}>
            Faça login para continuar sua jornada financeira.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={[styles.input, emailFocus && styles.inputFocus]}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={[styles.input, passwordFocus && styles.inputFocus]}
              placeholder="Sua senha segura"
              placeholderTextColor="#999999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </View>

          <Button
            title="Entrar"
            style={styles.button}
            onPress={handleEntrar}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Não tem conta?</Text>

          <Button
            title="Cadastre-se"
            onPress={() => navigation.navigate("TelaCadastro")}
          />
        </View>

        <View style={styles.footerContainer}>
          <Button
            title="Sou filho e tenho um código"
            onPress={() => navigation.navigate("VincularFilho")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
