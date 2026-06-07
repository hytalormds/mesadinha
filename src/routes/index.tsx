import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from "../app/bem-vindo";
import Login from "../app/login";

import telaCadastro from "../app/telaCadastro";
import cadastroTarefa from "../app/CadastroTarefa";
import vincularFilho from "../app/vincularFIlho";
import ListTarefas from "../app/ListaTarefas";
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
      <Stack.Screen name="ListTarefas" component={ListTarefas} />
    </Stack.Navigator>
  );
}

