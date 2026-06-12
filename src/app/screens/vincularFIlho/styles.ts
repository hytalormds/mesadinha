import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },

    keyboardAvoiding: {
        flex: 1,
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    subtitulo: {
        fontSize: 14,
        color: "#666666",
        marginBottom: 24,
        textAlign: "center",
        lineHeight: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 6,
    },

    input: {
        width: "100%",
        height: 50,
        borderWidth: 1.5,
        borderColor: "#e0e0e0",
        borderRadius: 10,
        paddingHorizontal: 14,
        backgroundColor: "#ffffff",
        marginBottom: 16,
        fontSize: 15,
        color: "#1a1a1a",
    },

    botaoCadastrar: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "#007BFF",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        marginBottom: 28,
    },

    botaoCadastrarTexto: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },

    secaoTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
    },

    cardVazio: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    textoVazio: {
        color: "#666666",
        fontSize: 14,
        marginTop: 8,
    },

    cardFilho: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eeeeee",
    },

    cardFilhoInfo: {
        flex: 1,
        paddingRight: 12,
    },

    nomeFilho: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    emailFilho: {
        fontSize: 13,
        color: "#666666",
        marginTop: 4,
    },
});