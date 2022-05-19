import { StyleSheet } from "react-native";
import { globalStyles } from "../../../styles/global";
import { colors } from "../../../res/palette";

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  containerFluid: {
    ...globalStyles.containerFluid,
  },
  section: {
    paddingVertical: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  upperOptions: {
    width: "100%",
    height: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  optionText: {
    flex: 0.8,
    fontSize: 14,
    fontFamily: "lato-medium",
  },
  icon: {
    flex: 0.1,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  categoryHeader: {
    fontSize: 24,
    fontFamily: "lato-bold",
  },
  lowerOptions: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "gray",
  },
});
