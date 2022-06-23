import { StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  filterBlock: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    borderStartColor: "grey",
    alignItems: "center",
    padding: 10,
    borderEndWidth: 0.7,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  newJustInImage: {
    // width: (windowWidth / 100) * 45,
    height: 200,
    resizeMode: "contain",
  },
  newJustInItemContainer: {
    flex: 1,
    marginHorizontal: "2%",
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  paletteBlack: {
    color: colors.black,
  },
  title: {
    ...globalStyles.latoBold14,
    fontWeight: "700",
  },
  description: {
    ...globalStyles.latoRegular,
    color: colors.btnLink,
    fontWeight: "700",
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
  discountPercent: {
    color: colors.error,
  },
  detailsContainer: {
    padding: 10,
    paddingVertical: 10,
  },
  price: {
    color: colors.gray,
    textDecorationLine: "line-through",
  },
  bgwhite: {
    backgroundColor: colors.white,
  },

  borderPrimary: {
    borderColor: colors.btnLink,
  },
  active: {
    paddingBottom: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: colors.primary,
  },
  unactive: {
    borderBottomColor: "transparent",
  },
  subActive: {
    marginRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.primary,
  },
  subUnactive: {
    marginRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  stickyBottomBtn: {
    width: 100,
    backgroundColor: colors.white,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
});
