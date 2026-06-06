import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {

        container: {
            flex: 1,
            backgroundColor: '#fff',
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
            flex:1
        },

        subtituloForm: {
            marginBottom: 20,
        },

        label: {
            marginTop: 10,
        },

        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
        },

        botao: {
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 50,
           
        },

        botaoText: {
            color: "#fff",
            fontWeight: "bold",

        },

        // 🔥 TIPO USUÁRIO
        botaoTipoUsuario: {
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
        },

        botaoTipoUsuarioOption: {
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            alignItems: "center",
        },

        botaoTipoUsuarioOptionPai: {
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderColor: "#007bff",
            backgroundColor: "#007bff",
            borderRadius: 8,
            alignItems: "center",
        },

        botaoTipoUsuarioOptionFilho: {
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderColor: "#007bff",
            borderRadius: 8,
            alignItems: "center",
        },

        botaoOpcaoPaiText: {
            color: "#fff",
            fontWeight: "bold",
        },

        botaoOpcaoFilhoText: {
            color: "#000",
            fontWeight: "bold",
        },
        botaoFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
        },

    }
);