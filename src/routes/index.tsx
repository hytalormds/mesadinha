import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from "../app/pages/bem-vindo";
import Login from "../app/pages/login";
import TelaCadastro from "../app/pages/telaCadastro";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="BemVindo"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BemVindo" component={BemVindo} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
    </Stack.Navigator>
  );
}
