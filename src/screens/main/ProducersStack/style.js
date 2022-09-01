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
  bgWhite: {
    backgroundColor: colors.white,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.white,
    height: 96,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 5,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: "lato-medium",
    paddingLeft: 10,
  },

  buttonText: {
    fontSize: 14,
    fontFamily: "lato-medium",
  },
  producer: {
    marginVertical: 10,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 5,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    ...globalStyles.iosShadow,
  },
  producerCoverImage: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  nameContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    margin: 15,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
  producerName: {
    fontSize: 14,
    fontFamily: "lato-bold",
    paddingHorizontal: 10,
  },
  detailHeaderContainer: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
    elevation: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 0,
  },
  detailHeader: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,

    position: "relative",
  },

  detailHeaderText: {
    fontSize: 18,
    fontFamily: "lato-bold",
    flex: 0.8,
    textAlign: "center",
  },

  descriptionTitle: {
    fontSize: 18,
    fontFamily: "lato-bold",
  },
  newJustInImage: {
    height: 180,
    resizeMode: "cover",
  },
  newJustInItemContainer: {
    flex: 1,
    width: "45%",
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
  seeMoreButton: {
    backgroundColor: colors.btnLink,
    marginVertical: 20,
    height: 35,
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  seeMoreButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "lato-medium",
  },

  addLogo: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    elevation: 8,
    borderRadius: 12,
    padding: 10,
    zIndex: 8,
    backgroundColor: "#fff",
    ...globalStyles.iosShadow,
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
  dynamicText: {
    color: colors.btnLink,
    fontSize: 20,
    paddingHorizontal: 10,
  },

  modal: {
    backgroundColor: "transparent",
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
  },

  sorterBtnContainer: {
    flex: 0.4,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: colors.primary,
  },

  sorterHeaderText: {
    color: "#fff",
    fontFamily: "lato-medium",
    fontSize: 20,
  },

  sorterButton: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    margin: 10,
    // borderWidth: 1,
    borderRadius: 10,
    ...globalStyles.iosShadow,
  },

  sorterButtonText: {
    padding: 10,
    fontFamily: "lato-regular",
    fontSize: 18,
    color: "#fff",
  },
  hideButton: {
    width: 100,
    padding: 10,
    backgroundColor: colors.skyBlue,
    borderRadius: 10,
    marginTop: 10,
  },
  hideButtonText: {
    color: colors.white,
    textAlign: "center",
  },
});
