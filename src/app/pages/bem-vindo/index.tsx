import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    containerLogo: {
      width: "100%",
      flex: 2,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    titulo: {
      fontSize: 26,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 28,
      marginBottom: 16,
      fontFamily: "System",
      letterSpacing: 0.3,
      lineHeight: 34,
      color: "#1a1a1a",
    },
    subtitulo: {
      fontSize: 15,
      textAlign: "center",
      marginBottom: 32,
      fontFamily: "System",
      letterSpacing: 0.2,
      color: "#666666",
      lineHeight: 22,
    },
    botao: {
      backgroundColor: "#007BFF",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      width: "70%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    botaoEntrar: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "System",
      letterSpacing: 0.5,
    },
    containerForm: {
      flex: 1,
      alignItems: "center",
      paddingStart: "5%",
      paddingEnd: "5%",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
  });

export default function BemVindo() {
  const navigation = useNavigation<any>();

  const handleAcessar = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.titulo}>
          Educação financeira de um jeito prático, divertido e real.
        </Text>
        <Text style={styles.subtitulo}>Entre para fazer login e começar</Text>

        <TouchableOpacity style={styles.botao} onPress={handleAcessar}>
          <Text style={styles.botaoEntrar}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
