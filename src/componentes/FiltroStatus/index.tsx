import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import type { StatusTarefa } from "@/types/navigation";
import styles from "./styles";

export type FiltroStatusTarefa = StatusTarefa | "Todas";

type Props = {
    statusSelecionado: FiltroStatusTarefa;
    onSelecionarStatus: (status: FiltroStatusTarefa) => void;
};

const filtrosStatus: FiltroStatusTarefa[] = [
    "Todas",
    "Em Aberto",
    "Em Andamento",
    "Aguardando Aprovação",
    "Concluída",
    "Recusada",
    "Expirado",
];

function nomeFiltro(status: FiltroStatusTarefa) {
    if (status === "Em Aberto") {
        return "Abertas";
    }

    if (status === "Em Andamento") {
        return "Andamento";
    }

    if (status === "Aguardando Aprovação") {
        return "Aguardando";
    }

    if (status === "Concluída") {
        return "Concluídas";
    }

    return status;
}

export function FiltroStatus({
    statusSelecionado,
    onSelecionarStatus,
}: Props) {
    return (
        <View style={styles.filtrosContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtrosScroll}
            >
                {filtrosStatus.map((status) => {
                    const selecionado = statusSelecionado === status;

                    return (
                        <TouchableOpacity
                            key={status}
                            style={[
                                styles.filtroBotao,
                                selecionado && styles.filtroBotaoAtivo,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onSelecionarStatus(status)}
                        >
                            <Text
                                style={[
                                    styles.filtroTexto,
                                    selecionado && styles.filtroTextoAtivo,
                                ]}
                            >
                                {nomeFiltro(status)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}