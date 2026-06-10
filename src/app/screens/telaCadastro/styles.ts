import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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

  label: {
    marginTop: 10,
    
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
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

  // Tipo de usuário
  tipoUsuarioContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  tipoUsuario: {
    flex: 1,
    height: 56,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  tipoUsuarioButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },

  tipoUsuarioText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },

  tipoUsuarioTextSelected: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  botaoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  footerContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  footerLink: {
    color: "#007bff",
    fontWeight: "700",
  },

  footerText: {
    marginBottom: 6,
    color: "#666",
  },
});
