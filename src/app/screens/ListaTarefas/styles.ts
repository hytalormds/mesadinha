import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },

    keyboardAvoiding: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 12,
    },

    containerLogo: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 8,
    },

    botaoSair: {
        height: 38,
        paddingHorizontal: 12,
        borderRadius: 19,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#ffd6d6",
    },

    botaoSairTexto: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "700",
        color: "#dc3545",
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    textContainer: {
        flex: 1,
        paddingRight: 16,
    },

    titulo: {
        fontSize: 26,
        fontWeight: "700",
        color: "#222",
    },

    subtitulo: {
        marginTop: 4,
        fontSize: 14,
        color: "#666",
    },

    containerForm: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
    },

    cardVazio: {
        minHeight: 180,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e8edf3",
        backgroundColor: "#f8fbff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    textoVazio: {
        marginTop: 10,
        fontSize: 15,
        color: "#777",
        textAlign: "center",
    },

    textoVazioDescricao: {
        marginTop: 6,
        fontSize: 13,
        color: "#888",
        textAlign: "center",
    },

    cardTarefa: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e8edf3",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },

    cardTarefaConcluida: {
        backgroundColor: "#f8f9fa",
        opacity: 0.85,
    },

    cardConteudo: {
        width: "100%",
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    cardTituloContainer: {
        flex: 1,
        paddingRight: 12,
    },

    cardNumero: {
        fontSize: 12,
        fontWeight: "600",
        color: "#007bff",
        marginBottom: 4,
    },

    cardTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    cardValor: {
        fontSize: 15,
        fontWeight: "700",
        color: "#007bff",
    },

    cardInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    cardInfoTexto: {
        marginLeft: 6,
        fontSize: 14,
        color: "#555",
    },

    cardDescricaoTitulo: {
        marginTop: 12,
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
    },

    cardDescricao: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },

    cardAcoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        marginTop: 14,
        paddingTop: 10,
    },

    botaoAcao: {
        marginLeft: 14,
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },

    textoConcluido: {
        textDecorationLine: "line-through",
        color: "#777",
    },

    footerContainer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    botao: {
        width: "100%",
        height: 48,
        backgroundColor: "#007BFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
