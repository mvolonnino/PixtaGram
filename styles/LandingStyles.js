import { StyleSheet } from "react-native";

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    position: "absolute",
    right: 10,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 3,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 3,
    width: "100%",
  },
});

export default landingStyles;
