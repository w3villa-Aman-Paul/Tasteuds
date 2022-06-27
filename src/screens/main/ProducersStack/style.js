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
    borderRadius: 10,
    ...globalStyles.iosShadow,
  },
  producerCoverImage: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  producerName: {
    backgroundColor: "rgba(255,255,255,0.8)",
    margin: 15,
    fontSize: 14,
    fontFamily: "lato-bold",
    paddingHorizontal: 10,
    borderRadius: 5,
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
  },

  descriptionTitle: {
    fontSize: 18,
    fontFamily: "lato-bold",
    marginBottom: 10,
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
});
