import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    containerCentralizado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    textoCarregando: {
        fontSize: 16,
        color: "#666666",
    },

    header: {
        alignItems: "center",
        marginBottom: 24,
    },

    botaoVoltar: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 21,
        backgroundColor: "#ffffff",
    },

    espacoHeader: {
        width: 42,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    cardResumo: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eeeeee",
        marginBottom: 22,
    },

    resumoTitulo: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    quantidadeMembros: {
        marginTop: 6,
        fontSize: 34,
        fontWeight: "800",
        color: "#007BFF",
    },

    resumoSaldoLabel: {
        marginTop: 14,
        fontSize: 13,
        color: "#666666",
    },

    resumoSaldoValor: {
        marginTop: 4,
        fontSize: 22,
        fontWeight: "800",
        color: "#007BFF",
    },

    secaoTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
    },

    cardMembro: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eeeeee",
        flexDirection: "row",
        alignItems: "center",
    },

    iconeContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#eaf3ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    membroInfo: {
        flex: 1,
    },

    nomeMembro: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    emailMembro: {
        fontSize: 12,
        color: "#666666",
        marginTop: 3,
    },

    perfilMembro: {
        fontSize: 12,
        color: "#007BFF",
        fontWeight: "700",
        marginTop: 4,
    },

    saldoContainer: {
        alignItems: "flex-end",
    },

    saldoLabel: {
        fontSize: 12,
        color: "#666666",
    },

    saldoValor: {
        fontSize: 16,
        fontWeight: "800",
        color: "#007BFF",
        marginTop: 4,
    },
});
