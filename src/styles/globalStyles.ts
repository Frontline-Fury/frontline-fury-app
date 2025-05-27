import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#030303",
    letterSpacing: 0.96,
    marginBottom: 20,
  },
  input: {
    width: "85%",
    height: 41,
    borderWidth: 1,
    borderColor: "#00000040",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: "Poppins",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#fe6807",
    width: "85%",
    height: 41,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fffefe",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
  loginText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins",
    color: "#595959",
    marginTop: 20,
  },
  linkText: {
    color: "#fe6807",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default globalStyles;
