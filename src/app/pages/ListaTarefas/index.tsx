import { Platform, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ListaTarefas() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerLogo}>
                        <View style={styles.headerRow}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titulo}>Lista de Tarefas</Text>

                                <Text style={styles.subtitulo}>
                                    Aqui estão todas as suas tarefas cadastradas.
                                </Text>
                            </View>

                            <Image
                                source={require("../../assets/logo.png")}
                                style={styles.logoTop}
                            />
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.subtituloForm}>
                            Toque em uma tarefa para ver os detalhes ou editá-la.
                        </Text>
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>
                                Tarefa 1: Arrumar o quarto<MaterialIcons name="check-circle" size={20} color="#007bff" />
                            </Text>
                            <Text style={styles.label}  >
                                Tarefa 2: Fazer lição de casa
                            </Text>
                            <Text style={styles.label}>Tarefa 3: Ajudar na cozinha</Text>
                            <Text style={styles.label}>Tarefa 4: Limpar a casa</Text>
                            <Text style={styles.label}>Tarefa 5: Cuidar do jardim</Text>
                            <Text style={styles.label}>Tarefa 6: Lavar o carro</Text>
                            <Text style={styles.label}>Tarefa 7: Organizar a garagem</Text>
                            <Text style={styles.label}>Tarefa 8: Cuidar dos pets</Text>
                            <Text style={styles.label}>Tarefa 9: Fazer compras</Text>
                            <Text style={styles.label}>Tarefa 10: Preparar o jantar</Text>
                        </View>

                    </View>
                    <View style={{ height: 20 }} />
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.botao}
                            onPress={() => navigation.navigate("CadastroTarefa" as never)}
                        >
                            <Text style={styles.botaoTexto}>Adicionar Nova Tarefa</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}