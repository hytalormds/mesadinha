import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from "../app/pages/bem-vindo";
import Login from "../app/pages/login";

import telaCadastro from "../app/pages/telaCadastro";
import cadastroTarefa from "../app/pages/CadastroTarefa";
import vincularFilho from "../app/pages/vincularFIlho";
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
    </Stack.Navigator>
  );
}
