import { StyleSheet } from "react-native";

export default StyleSheet.create({
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },

    statusTexto: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "700",
    },

    statusConcluida: {
        backgroundColor: "#095414",
    },

    statusEmAndamento: {
        backgroundColor: "#007BFF",
    },

    statusEmAberto: {
        backgroundColor: "#6c757d",
    },

    statusExpirado: {
        backgroundColor: "#dc3545",
    },

    statusAguardandoAprovacao: {
        backgroundColor: "#f0ad4e",
    },

    statusRecusada: {
        backgroundColor: "#8B0000",
    },
});