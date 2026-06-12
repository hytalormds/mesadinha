import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Login from "@/app/screens/login";
import TelaCadastro from "@/app/screens/CadastroUsuario";
import CadastroTarefa from "@/app/screens/CadastroTarefa";
import VincularFilho from "@/app/screens/VincularFilho";
import ListaTarefas from "@/app/screens/ListaTarefas";

import type { RootStackParamList } from "@/types/navigation";
import styles from "./styles";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true,
                headerTintColor: "#007BFF",
                headerTitleAlign: "center",
                headerBackTitle: "Voltar",
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TelaCadastro"
                component={TelaCadastro}
                options={{ title: "Cadastro" }}
            />

            <Stack.Screen
                name="CadastroTarefa"
                component={CadastroTarefa}
                options={({ navigation }) => ({
                    title: "Cadastro de Tarefa",
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.headerBackButton}
                            onPress={() => {
                                if (navigation.canGoBack()) {
                                    navigation.goBack();
                                    return;
                                }

                                navigation.navigate("ListaTarefas");
                            }}
                        >
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={20}
                                color="#007BFF"
                            />

                            <Text style={styles.headerBackText}>Voltar</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name="VincularFilho"
                component={VincularFilho}
                options={{ title: "Vincular Filho" }}
            />

            <Stack.Screen
                name="ListaTarefas"
                component={ListaTarefas}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}