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
        paddingBottom: 20,
    },

    containerLogo: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 10,
    },

    headerTop: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 12,
    },

    botaoSair: {
        height: 42,
        paddingHorizontal: 14,
        borderRadius: 21,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#ffd6d6",
    },

    botaoSairTexto: {
        marginLeft: 6,
        fontSize: 14,
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
        paddingRight: 12,
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

    logoTop: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },

    containerForm: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },

    subtituloForm: {
        marginBottom: 16,
        fontSize: 14,
        color: "#666",
    },

    cardVazio: {
        minHeight: 180,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        backgroundColor: "#fafafa",
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

    cardTarefa: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
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
        fontSize: 16,
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
        borderTopColor: "#eee",
        marginTop: 14,
        paddingTop: 10,
    },

    botaoAcao: {
        marginLeft: 18,
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