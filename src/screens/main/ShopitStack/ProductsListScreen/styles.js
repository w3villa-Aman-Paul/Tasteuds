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
    height: 180,
    resizeMode: "contain",
  },
  newJustInItemContainer: {
    flex: 1,
    margin: 0,
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
    alignItems: "center",
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
    padding: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    fontSize: 17,
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
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
    borderColor: '#000',
    borderWidth: 1.2,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  stickyBottomBtn: {
    backgroundColor: colors.white,
    marginHorizontal: 30,

    height: 30,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "transparent",
  },

  topBanner: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 80,
    flex: 1,
    flexDirection: "row",
    elevation: 3,
    backgroundColor: "#fff",
    borderColor: "transparent",
  },

  addLogo: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    ...globalStyles.iosShadow,
    elevation: 5,
  },

  selectedFilter: {
    backgroundColor: colors.btnLink,
    marginRight: 8,
    borderRadius: 3,
    padding: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedFilterText: {
    color: colors.white,
    marginRight: 3,
    fontSize: 16,
  },
  addLogo: {
    position: "absolute",
    bottom: 2,
    right: 0,
    ...globalStyles.iosShadow,
    flexDirection: "row",
    elevation: 8,
    borderRadius: 12,
    padding: 8,
    zIndex: 8,
    backgroundColor: "#fff",
  },
  dynamicAddItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    right: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: 8,
  },
  dynamicText: {
    color: colors.btnLink,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  afterText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    ...globalStyles.iosShadow,
    borderRadius: 10,
    height: 42,
    width: 42,
    zIndex: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
  },
});
