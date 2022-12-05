import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#184E77",
  },
  input: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "5%",
    borderWidth: 2,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: "#1E6091",
    backgroundColor: "#168AAD",
  },
  check: {
    width: "89%",
    alignItems: "flex-start",
  },
});
