import { StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";

const windowWidth = Dimensions.get("window");

export const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newJustInImage: {
    width: 109,
    height: 148,
  },
  newJustInItemContainer: {
    marginRight: 16,
    marginBottom: 16,
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
    marginLeft: 10,
    marginRight: 10,
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
    width: 220,
    height: 119,
    // marginRight: 5,
  },
  second: {
    width: 139,
    height: 119,
    // marginLeft: 5,
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
    marginTop: 10,
    marginBottom: 10,
  },
  body_third: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 150,
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
  content_text: {
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
