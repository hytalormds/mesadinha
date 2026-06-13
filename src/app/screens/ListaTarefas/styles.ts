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

    containerForm: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
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

    statusPendente: {
        backgroundColor: "#ffc107",
    },

    headerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    headerRow: {
        width: "100%",
    },

    textContainer: {
        flex: 1,
        paddingRight: 12,
    },

    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },

    titulo: {
        fontSize: 34,
        fontWeight: "800",
        color: "#1a1a1a",
    },

    subtitulo: {
        fontSize: 16,
        color: "#666666",
        marginTop: 4,
    },

    usuarioLogadoTexto: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
    },

    botaoFilhos: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoFilhosTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    botaoCofrinho: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoCofrinhoTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    botaoSair: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#ffd6d6",
    },

    botaoSairTexto: {
        color: "#dc3545",
        fontSize: 13,
        fontWeight: "700",
    },
    botaoFamilia: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#eaf3ff",
    },

    botaoFamiliaTexto: {
        color: "#007BFF",
        fontSize: 13,
        fontWeight: "700",
    },

    cardHeader: {
        width: "100%",
        gap: 10,
    },

    cardTituloContainer: {
        width: "100%",
    },

    cardValorStatusContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },
    botaoConfirmarPai: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },

    botaoConfirmarPaiAceitar: {
        backgroundColor: "#095414",
    },

    botaoConfirmarPaiRecusar: {
        backgroundColor: "#dc3545",
    },

    botaoConfirmarPaiTexto: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "700",
    },
});
