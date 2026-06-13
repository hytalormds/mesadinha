import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import Routes from "./src/routes";
import { migrate } from "@/database/migrations/MigrationCorrigida";

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="mesadinha.db" onInit={migrate}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
