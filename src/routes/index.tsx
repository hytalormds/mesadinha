import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Login from "@/app/screens/Login";
import TelaCadastro from "@/app/screens/CadastroUsuario";
import CadastroTarefa from "@/app/screens/CadastroTarefa";
import VincularFilho from "@/app/screens/VincularFilho";
import ListaTarefas from "@/app/screens/ListaTarefas";
import Cofrinho from "@/app/screens/Cofrinho";
import Familia from "@/app/screens/Familia";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import type {
  MainTabParamList,
  RootStackParamList,
  Usuario,
} from "@/types/navigation";
import styles from "./styles";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const [usuarioLogado, setUsuarioLogado] = React.useState<Usuario | null>(
    null,
  );

  React.useEffect(() => {
    async function carregarUsuario() {
      const usuarioSalvo = await AsyncStorage.getItem(
        STORAGE_KEYS.usuarioLogado,
      );

      if (usuarioSalvo) {
        setUsuarioLogado(JSON.parse(usuarioSalvo));
      }
    }

    carregarUsuario();
  }, []);

  const usuarioEhFilho = usuarioLogado?.id_tipo === 2;

  return (
    <Tab.Navigator
      id="MainTabs"
      initialRouteName="ListaTarefas"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 82,
          paddingTop: 8,
          paddingBottom: 22,
        },
        tabBarButton: (props) => {
          const abaFilhosBloqueada =
            route.name === "VincularFilho" && usuarioEhFilho;
          const { ref, ...buttonProps } = props;

          return (
            <TouchableOpacity
              {...buttonProps}
              disabled={abaFilhosBloqueada}
              activeOpacity={abaFilhosBloqueada ? 1 : 0.7}
              style={[props.style, abaFilhosBloqueada && { opacity: 0.35 }]}
            />
          );
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = "home";

          if (route.name === "VincularFilho") {
            iconName = "person-add";
          }

          if (route.name === "Cofrinho") {
            iconName = "savings";
          }

          if (route.name === "Familia") {
            iconName = "groups";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="ListaTarefas"
        component={ListaTarefas}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="VincularFilho"
        component={VincularFilho}
        options={{ title: "Filhos" }}
      />

      <Tab.Screen
        name="Cofrinho"
        component={Cofrinho}
        options={{ title: "Cofrinho" }}
      />

      <Tab.Screen
        name="Familia"
        component={Familia}
        options={{ title: "Família" }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator
      id="RootStack"
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
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
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

                navigation.navigate("MainTabs", {
                  screen: "ListaTarefas",
                });
              }}
            >
              <MaterialIcons name="arrow-back-ios" size={20} color="#007BFF" />

              <Text style={styles.headerBackText}>Voltar</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
