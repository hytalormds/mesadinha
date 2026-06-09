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
        paddingBottom: 40,
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

    botaoVoltar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
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
        padding: 20,
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
});