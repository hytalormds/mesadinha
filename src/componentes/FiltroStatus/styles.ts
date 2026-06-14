import { StyleSheet } from "react-native";

export default StyleSheet.create({
    filtrosContainer: {
        marginBottom: 16,
    },

    filtrosScroll: {
        gap: 8,
        paddingRight: 8,
    },

    filtroBotao: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: "#f1f3f5",
        borderWidth: 1,
        borderColor: "#dee2e6",
    },

    filtroBotaoAtivo: {
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
    },

    filtroTexto: {
        color: "#495057",
        fontSize: 13,
        fontWeight: "600",
    },

    filtroTextoAtivo: {
        color: "#ffffff",
    },
});