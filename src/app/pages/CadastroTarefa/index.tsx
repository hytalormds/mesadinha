import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function CadastroTarefa() {
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerLogo}>
                <Text>Cadastro de Tarefa</Text>
            </View>
        </SafeAreaView>
    );
}