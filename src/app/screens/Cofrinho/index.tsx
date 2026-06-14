import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { getCurrentUser } from "@/services/mesadinha/session.service";
import styles from "./styles";

export default function Cofrinho() {
  const usuario = getCurrentUser();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Cofrinho</Text>
        </View>

        <View style={styles.cardSaldo}>
          <MaterialIcons name="savings" size={42} color="#007BFF" />

          <Text style={styles.nomeUsuario}>
            {usuario?.nome ?? "Usuário não identificado"}
          </Text>

          <Text style={styles.valorSaldo}>R$ 0,00</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.infoTitulo}>Integração pendente</Text>

          <Text style={styles.infoTexto}>
            O login, filhos e tarefas já usam a API. O saldo do cofrinho ainda
            precisa de endpoints próprios no back-end para carteira e
            movimentações.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
