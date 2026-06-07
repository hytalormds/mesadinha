import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },

  formContainer: {
    width: "100%",
    gap: 14,
  },

  fieldContainer: {
    marginBottom: 2,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
    marginLeft: 3,
  },

  input: {
    width: "100%",
    height: 44,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 15,
    color: "#1a1a1a",
    fontFamily: "System",
  },

  inputFocus: {
    borderColor: "#007BFF",
    backgroundColor: "#f0f7ff",
  },

  button: {
    width: "100%",
    height: 48,
    marginTop: 20,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 3,
  },

  footerText: {
    fontSize: 13,
    color: "#666666",
  },
});
