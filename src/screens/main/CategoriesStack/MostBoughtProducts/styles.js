import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../../res/palette";
import { globalStyles } from "../../../../styles/global";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },

  searchContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginVertical: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.black,
    height: 50,
    paddingLeft: 10,
    borderRadius: 10,
  },

  searchBtn: {
    height: 50,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    elevation: 5,
    ...globalStyles.iosShadow,
  },

  // Products style
  newJustInImage: {
    width: (windowWidth / 100) * 45,
    height: 200,
  },
  newJustInItemContainer: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  bg_white: {
    backgroundColor: colors.white,
  },
  btn_link: {
    backgroundColor: colors.btnLink,
  },
  detailsContainer: {
    paddingVertical: 10,
    width: 150,
    paddingHorizontal: 15,
  },
  title: {
    ...globalStyles.latoBold14,
    fontWeight: "700",
  },
  description: {
    ...globalStyles.latoRegular,
    fontWeight: "700",
    color: colors.btnLink,
  },
  pricingContainer: {
    flex: 1,
    flexDirection: "row",
  },
  prices: {
    fontFamily: "lato-bold",
    fontSize: 13,
    paddingRight: 5,
    marginTop: 3,
    fontWeight: "700",
  },
  addBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
  },
});
