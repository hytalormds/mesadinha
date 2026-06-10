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

    containerForm: {
        padding: 20,
        paddingTop: 12,
    },

    infoText: {
        marginBottom: 18,
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },

    label: {
        marginTop: 10,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: "#fff",
    },

    botao: {
        width: "100%",
        height: 48,
        marginTop: 24,
    },
});
