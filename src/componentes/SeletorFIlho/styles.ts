import { StyleSheet } from "react-native";

export default StyleSheet.create({
    semFilhosContainer: {
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e9ecef",
        gap: 10,
        marginBottom: 14,
    },

    semFilhosTexto: {
        color: "#555555",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "600",
    },

    botaoCadastrarFilho: {
        backgroundColor: "#007BFF",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },

    botaoCadastrarFilhoTexto: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "700",
    },

    filhosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 14,
    },

    filhoCard: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#f1f3f5",
        borderWidth: 1,
        borderColor: "#dee2e6",
    },

    filhoCardSelecionado: {
        backgroundColor: "#095414",
        borderColor: "#095414",
    },

    filhoNome: {
        color: "#495057",
        fontSize: 14,
        fontWeight: "700",
    },

    filhoNomeSelecionado: {
        color: "#ffffff",
    },
});