import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import type { Usuario } from "@/types/navigation";
import { listChildren } from "@/services/mesadinha/auth.services";
import { getCurrentUser } from "@/services/mesadinha/session.service";
import styles from "./styles";

export default function Familia() {
  const usuario = getCurrentUser();
  const [filhos, setFilhos] = React.useState<Usuario[]>([]);

  async function carregarFamilia() {
    if (!usuario || usuario.id_tipo !== 1) {
      setFilhos([]);
      return;
    }

    try {
      setFilhos(await listChildren());
    } catch (error) {
      console.log("Erro ao carregar família:", error);
      Alert.alert("Erro", "Não foi possível carregar a família.");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarFamilia();
    }, []),
  );

  const membros = usuario ? [usuario, ...filhos] : filhos;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Família</Text>
        </View>

        <View style={styles.cardResumo}>
          <MaterialIcons name="groups" size={42} color="#007BFF" />

          <Text style={styles.resumoTitulo}>Membros cadastrados</Text>

          <Text style={styles.quantidadeMembros}>{membros.length}</Text>
        </View>

        <Text style={styles.secaoTitulo}>Membros</Text>

        {membros.map((membro) => (
          <View key={membro.id_usuario} style={styles.cardMembro}>
            <View style={styles.iconeContainer}>
              <MaterialIcons
                name={membro.id_tipo === 1 ? "person" : "child-care"}
                size={24}
                color="#007BFF"
              />
            </View>

            <View style={styles.membroInfo}>
              <Text style={styles.nomeMembro}>{membro.nome}</Text>
              <Text style={styles.emailMembro}>{membro.email}</Text>
              <Text style={styles.perfilMembro}>
                {membro.id_tipo === 1 ? "Responsável" : "Filho"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
