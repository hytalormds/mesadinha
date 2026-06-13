import React from "react";
import { Text, View } from "react-native";

import type { StatusTarefa } from "@/types/navigation";
import styles from "./styles";

type Props = {
    status: StatusTarefa;
};

export function StatusBadge({ status }: Props) {
    function getStatusStyle() {
        switch (status) {
            case "Concluída":
                return styles.statusConcluida;

            case "Em Andamento":
                return styles.statusEmAndamento;

            case "Em Aberto":
                return styles.statusEmAberto;

            case "Expirado":
                return styles.statusExpirado;

            case "Aguardando Aprovação":
                return styles.statusAguardandoAprovacao;

            case "Recusada":
                return styles.statusRecusada;

            default:
                return styles.statusEmAberto;
        }
    }

    return (
        <View style={[styles.statusBadge, getStatusStyle()]}>
            <Text style={styles.statusTexto}>
                {status}
            </Text>
        </View>
    );
}