import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {


        container: {
            flex: 1,
            backgroundColor: '#fff',
        },

        safeArea: {
            flex: 1,
        },

        keyboardAvoiding: {
            flex: 1,
        },

        scrollContent: {
            flexGrow: 1,
            paddingBottom: 40,
        },

        logoTop: {
            width: 120,
            height: 120,
        },

        containerLogo: {
            padding: 20,
        },

        headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        textContainer: {
            flex: 1,
        },


        titulo: {
            fontSize: 26,
            fontWeight: "600",
        },

        subtitulo: {
            color: "#666",
        },

        containerForm: {
            padding: 20,
        },

        subtituloForm: {
            marginBottom: 20,
        },

        label: {
            marginTop: 10,
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

        botao: {
            width: "100%",
            height: 48,
            backgroundColor: "#007BFF",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
        },

        botaoText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
        },

        inputDescricao: {
            height: 140,
            paddingTop: 12,
            textAlignVertical: "top",
        },
        botaoConfirmarPicker: {
            height: 42,
            backgroundColor: "#007BFF",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 8,
        },

        botaoConfirmarPickerText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
        },
    }
);
