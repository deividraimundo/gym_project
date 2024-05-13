import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131016",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  eventName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#1F1E25",
    borderRadius: 5,
    color: "#fff",
    padding: 16,
    fontSize: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#31CF67",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  form: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    marginTop: 36,
    marginBottom: 42,
  },
});
