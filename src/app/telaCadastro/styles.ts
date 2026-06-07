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

        scrollContent: {
            flexGrow: 1,
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
            alignItems:"center"
    
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
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginTop:10,
            marginBottom: 10,
        },

        botao: {
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
        },

        botaoText: {
            color: "#fff",
            fontWeight: "bold",
        },

        // Tipo usuario
        botaoTipoUsuario: {
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
        },
        tipoUsuarioContainer: {
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
        },
        tipoUsuario
            : {
            flex: 1,
            backgroundColor: "#fff",
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            alignItems: "center",
        },

        tipoUsuarioButton: {
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            alignItems: "center",
        },
        tipoUsuarioButtonSelected
            : {
            backgroundColor: "#007bff",
            borderColor: "#007bff",
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
        footerContainer: {
            flex: 1,
            padding: 20,
            alignItems:"center"
        },
        footerLink: {
            color: "#007bff",
        },
        footerText: {
            color: "#666",
        },


    }
);

