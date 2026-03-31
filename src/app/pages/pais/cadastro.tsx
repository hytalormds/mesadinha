import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },
  formContainer: {
    width: "100%",
    gap: 14,
  },
  fieldContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
    marginLeft: 3,
  },
  input: {
    width: "100%",
    height: 44,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 15,
    color: "#1a1a1a",
    fontFamily: "System",
  },
  inputFocus: {
    borderColor: "#007BFF",
    backgroundColor: "#f0f7ff",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 3,
  },
  footerText: {
    fontSize: 13,
    color: "#666666",
  },
  footerLink: {
    fontSize: 13,
    color: "#007BFF",
    fontWeight: "600",
  },
});

export default function Cadastro() {
  const navigation = useNavigation<any>();
  const [nameFocus, setNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [confirmFocus, setConfirmFocus] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para começar sua jornada financeira
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={[styles.input, nameFocus && styles.inputFocus]}
              placeholder="Digite seu nome"
              placeholderTextColor="#999999"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[styles.input, emailFocus && styles.inputFocus]}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, passwordFocus && styles.inputFocus]}
              placeholder="Crie uma senha segura"
              placeholderTextColor="#999999"
              secureTextEntry
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={[styles.input, confirmFocus && styles.inputFocus]}
              placeholder="Confirme sua senha"
              placeholderTextColor="#999999"
              secureTextEntry
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Voltar ao login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
