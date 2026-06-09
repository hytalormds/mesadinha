import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { Button } from "@/componentes/Button";
import type { RootStackParamList } from "@/types/navigation";

type TipoUsuario = "Pai" | "Filho" | "Ambos";

export default function TelaCadastro() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [tipoUsuario, setTipoUsuario] = React.useState<TipoUsuario>("Pai");

  const tiposUsuario: TipoUsuario[] = ["Pai", "Filho", "Ambos"];

  const validarFormulario = () => {
    if (!nome.trim()) {
      alert("Por favor, insira seu nome completo.");
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

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <View style={styles.containerForm}>
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Telefone:</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu telefone"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita sua senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <Text style={styles.label}>Tipo de Usuário:</Text>

            <View style={styles.tipoUsuarioContainer}>
              {tiposUsuario.map((tipo) => {
                const selecionado = tipoUsuario === tipo;

                return (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      styles.tipoUsuario,
                      selecionado && styles.tipoUsuarioButtonSelected,
                    ]}
                    onPress={() => setTipoUsuario(tipo)}
                  >
                    <Text
                      style={[
                        styles.tipoUsuarioText,
                        selecionado && styles.tipoUsuarioTextSelected,
                      ]}
                    >
                      {tipo}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button
              title="Cadastrar"
              style={styles.botao}
              onPress={() => {
                if (validarFormulario()) {
                  navigation.navigate("Login");
                }
              }}
            />

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Já tem conta?</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.footerLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
