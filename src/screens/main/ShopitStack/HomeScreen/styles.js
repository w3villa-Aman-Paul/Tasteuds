import { StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { getCompletedOrders } from "../../../../redux";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newJustInImage: {
    width: (windowWidth / 100) * 45,
    height: 200,
  },
  newJustInItemContainer: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  flatListHeaderText: {
    ...globalStyles.latoRegular14,
    color: colors.black,
    marginVertical: 16,
  },
  bannerFirst: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  discountStripe: {
    ...globalStyles.mt16,
    width: "100%",
    height: 60,
  },
  bannerEndOfSale: {
    ...globalStyles.mt16,
    width: "100%",
    height: 308,
  },
  hoardingBoard: {
    ...globalStyles.latoRegular14,
    ...globalStyles.mt16,
    textAlign: "center",
    color: colors.black,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  flatListContainer: {
    ...globalStyles.containerFluid,
    ...globalStyles.mt16,
    backgroundColor: colors.white,
  },
  bestDealCards: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  bannerFestiveTrend: {
    width: "100%",
    height: 294,
    paddingVertical: 16,
  },
  flatListImageItemContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  flatListImageItem: {
    width: 109,
    height: 160,
  },
  container: {
    flex: 1,
    marginLeft: 7,
    marginRight: 7,
  },
  banner: {
    position: "absolute",
    right: 40,
    bottom: 30,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },
  body_second: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  first: {
    flex: 0.6,
    width: 220,
    height: 119,
  },
  second: {
    flex: 0.4,
    width: 139,
    height: 119,
  },
  body_second_image: {
    width: "100%",
    borderRadius: 10,
  },
  text1: {
    color: "#ffffff",
  },
  text_second: {
    color: "#ffffff",
  },
  third: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    elevation: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  body_third: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 45,
    paddingRight: 45,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: "50%",
  },

  body_image: {
    flex: 0.3,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  bottom_text: {
    textAlign: "left",
    fontSize: 15,
    height: 60,
    marginTop: 15,
    marginBottom: 15,
  },
  image_center: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  content_text: {
    color: "#000000",
    fontSize: 25,
    textAlign: "left",
  },

  detailsContainer: {
    paddingVertical: 10,
    width: 150,
    paddingHorizontal: 15,
  },
  title: {
    ...globalStyles.latoBold14,
  },
  description: {
    ...globalStyles.latoRegular,
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
  },
  bg_white: {
    backgroundColor: colors.white,
  },
  home_btn: {
    // width: 250,
    flex: 1,
    alignItems: "center",
    marginLeft: 80,
    marginRight: 80,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.btnLink,
    marginBottom: 25,
    borderRadius: 10,
  },
  btn_text: {
    color: colors.white,
    fontSize: 18,
  },
  body_image: {
    flex: 0.2,
    // width: 15,
  },
  bottom_text: {
    textAlign: "center",
    fontSize: 12,
    height: 60,
  },
  image_center: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  fourth: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content_text: {
    marginLeft: 10,
    color: "#000000",
    fontSize: 25,
    textAlign: "left",
  },
  bg_white: {
    backgroundColor: colors.white,
  },
  btn_link: {
    backgroundColor: colors.btnLink,
  },
});
