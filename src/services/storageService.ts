import AsyncStorage from "@react-native-async-storage/async-storage";

export async function buscarItem<T>(chave: string): Promise<T | null> {
    const dados = await AsyncStorage.getItem(chave);

    if (!dados) {
        return null;
    }

    return JSON.parse(dados) as T;
}

export async function salvarItem<T>(chave: string, valor: T): Promise<void> {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
}

export async function removerItem(chave: string): Promise<void> {
    await AsyncStorage.removeItem(chave);
}