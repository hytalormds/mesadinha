import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import type { Usuario } from "@/types/navigation";
import styles from "./styles";

type Props = {
    filhos: Usuario[];
    filhoSelecionadoId: string;
    onSelecionarFilho: (id: string) => void;
    onCadastrarFilho: () => void;
};

export function SeletorFilho({
    filhos,
    filhoSelecionadoId,
    onSelecionarFilho,
    onCadastrarFilho,
}: Props) {
    if (filhos.length === 0) {
        return (
            <View style={styles.semFilhosContainer}>
                <Text style={styles.semFilhosTexto}>
                    Nenhum filho cadastrado.
                </Text>

                <TouchableOpacity
                    style={styles.botaoCadastrarFilho}
                    activeOpacity={0.7}
                    onPress={onCadastrarFilho}
                >
                    <Text style={styles.botaoCadastrarFilhoTexto}>
                        Cadastrar Filho
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.filhosContainer}>
            {filhos.map((usuario) => {
                const selecionado =
                    filhoSelecionadoId === usuario.id_usuario;

                return (
                    <TouchableOpacity
                        key={usuario.id_usuario}
                        style={[
                            styles.filhoCard,
                            selecionado && styles.filhoCardSelecionado,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => onSelecionarFilho(usuario.id_usuario)}
                    >
                        <Text
                            style={[
                                styles.filhoNome,
                                selecionado && styles.filhoNomeSelecionado,
                            ]}
                        >
                            {usuario.nome}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}