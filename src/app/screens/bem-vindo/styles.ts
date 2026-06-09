import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  containerLogo: {
    width: "100%",
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "100%",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 16,
    fontFamily: "System",
    letterSpacing: 0.3,
    lineHeight: 34,
    color: "#1a1a1a",
  },

  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "System",
    letterSpacing: 0.2,
    color: "#666666",
    lineHeight: 22,
  },

  botao: {
    width: "70%",
    alignSelf: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  containerForm: {
    flex: 1,
    alignItems: "center",
    paddingStart: "5%",
    paddingEnd: "5%",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
});
