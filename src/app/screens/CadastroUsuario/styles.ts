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

  passwordContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 6,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
  },

  eyeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
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
