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
        paddingBottom: 220,
    },

    contadorCaracteres: {
        marginTop: 4,
        fontSize: 12,
        color: "#777",
        textAlign: "right",
    },

    contadorCaracteresLimite: {
        color: "#dc3545",
        fontWeight: "700",
    },

    containerForm: {
        padding: 20,
        paddingTop: 12,
    },

    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },

    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },

    inputDescricao: {
        height: 140,
        paddingTop: 12,
        textAlignVertical: "top",
    },

    botao: {
        width: "100%",
        height: 48,
        backgroundColor: "#007BFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    cardValorStatusContainer: {
        alignItems: "flex-end",
        gap: 6,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusTexto: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "700",
    },

    statusConcluida: {
        backgroundColor: "#28a745",
    },

    statusEmAndamento: {
        backgroundColor: "#007BFF",
    },

    statusEmAberto: {
        backgroundColor: "#ffc107",
    },

    statusExpirado: {
        backgroundColor: "#dc3545",
    },

});
