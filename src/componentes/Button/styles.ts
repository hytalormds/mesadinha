import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  icon: {
    marginRight: 8,
  },

  primary: {
    backgroundColor: "#007BFF",
  },

  secondary: {
    backgroundColor: "#f1f3f5",
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  danger: {
    backgroundColor: "#dc3545",
  },

  outlineDanger: {
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#dc3545",
  },

  disabled: {
    backgroundColor: "#e9ecef",
    borderColor: "#dddddd",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
  },

  primaryTitle: {
    color: "#ffffff",
  },

  secondaryTitle: {
    color: "#555555",
  },

  dangerTitle: {
    color: "#ffffff",
  },

  outlineDangerTitle: {
    color: "#dc3545",
  },

  disabledTitle: {
    color: "#999999",
  },
});