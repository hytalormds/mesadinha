import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        minHeight: 180,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 14,
        backgroundColor: "#f8f9fa",
        borderWidth: 1,
        borderColor: "#e9ecef",
        gap: 8,
    },

    title: {
        color: "#555555",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },

    description: {
        color: "#777777",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 18,
    },
});