import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@/componentes/Button";
import { Title } from "@/componentes/Title";
import styles from "./styles";
import type { RootStackParamList } from "@/types/navigation";

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      navigation.reset({
        index: 0,
        routes: [{ name: "ListaTarefas" }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("src/assets/logo.png")}
                style={styles.logo}
              />

              <Title style={styles.title}>Bem-vindo de volta!</Title>

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

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("TelaCadastro")}
              >
                <Text style={styles.footerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("VincularFilho")}
              >
                <Text style={styles.footerLink}>Sou filho e tenho um código</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
