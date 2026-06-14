import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardTarefa: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#e9ecef",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    cardTarefaConcluida: {
        opacity: 0.75,
    },

    cardConteudo: {
        gap: 10,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    cardTituloContainer: {
        flex: 1,
    },

    cardNumero: {
        color: "#777777",
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 4,
    },

    cardTitulo: {
        color: "#222222",
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 22,
    },

    textoConcluido: {
        textDecorationLine: "line-through",
        color: "#777777",
    },

    cardValorStatusContainer: {
        alignItems: "flex-end",
        gap: 8,
    },

    cardValor: {
        color: "#095414",
        fontSize: 15,
        fontWeight: "800",
    },

    cardInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    cardInfoTexto: {
        flex: 1,
        color: "#555555",
        fontSize: 13,
    },

    cardDescricaoTitulo: {
        color: "#333333",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 2,
    },

    cardDescricao: {
        color: "#555555",
        fontSize: 14,
        lineHeight: 20,
    },

    cardAcoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#f1f3f5",
    },

    botaoAcao: {
        padding: 4,
    },
});