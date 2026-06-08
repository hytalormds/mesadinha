import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../../componentes/Button";
import styles from "./styles";

export default function BemVindo() {
  const navigation = useNavigation<any>();

  const handleAcessar = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require("src/assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.titulo}>
          Educação financeira de um jeito prático, divertido e real.
        </Text>
        <Text style={styles.subtitulo}>Entre para fazer login e começar</Text>

        <Button
          title="Acessar"
          style={styles.botao}
          onPress={handleAcessar}
        />
      </View>
    </SafeAreaView>
  );
}
