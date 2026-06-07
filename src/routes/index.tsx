import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from "../app/screens/bem-vindo";
import Login from "../app/screens/login";

import telaCadastro from "../app/screens/telaCadastro";
import cadastroTarefa from "../app/screens/CadastroTarefa";
import vincularFilho from "../app/screens/vincularFIlho";
import ListaTarefas from "../app/screens/ListaTarefas";
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="BemVindo"
      screenOptions={
        {
          headerShown: false,
        }
      }
    >
      <Stack.Screen name="BemVindo" component={BemVindo} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TelaCadastro" component={telaCadastro} />
      <Stack.Screen name="CadastroTarefa" component={cadastroTarefa} />
      <Stack.Screen name="VincularFilho" component={vincularFilho} />
      <Stack.Screen name="ListaTarefas" component={ListaTarefas} />
    </Stack.Navigator>
  );
}

