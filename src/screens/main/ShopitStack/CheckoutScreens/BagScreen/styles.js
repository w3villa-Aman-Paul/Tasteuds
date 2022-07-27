import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";

export const styles = StyleSheet.create({
  productDetailsText: {
    fontSize: 14,
  },
  inputWrapperStyle: {
    ...globalStyles.mb16,
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
  },
  btnStyle: {
    ...globalStyles.btnBlock,
    ...globalStyles.mt16,
    backgroundColor: colors.primary,
  },
  inputRight: {
    ...globalStyles.latoRegular,
    ...globalStyles.textPrimary,
  },
  priceDetailsContainer: {
    ...globalStyles.containerFluid,
    ...globalStyles.bgWhite,
    ...globalStyles.mt16,
    paddingBottom: 32,
  },
  priceDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dividerStyle: {
    ...globalStyles.mt8,
    backgroundColor: "#f5f5f5",
  },
  footer: {
    ...globalStyles.containerFluid,
    ...globalStyles.centeredContent,
    ...globalStyles.mb114,
    ...globalStyles.mt32,
  },
  commonFooter: {
    height: 80,
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: colors.background,
  },
  containerBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body_first: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  body_second: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.3,
  },
  body_third: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
  },
  display_total: {
    fontSize: 15,
  },
  cart_btn: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inc_btn: {
    flex: 1,
    flexDirection: "row",
    marginRight: 5,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  before_Press: {
    flex: 0.5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 5,
    borderColor: "transparent",
    borderRadius: 10,
  },
  after_Press: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    height: "60%",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 5,
    borderColor: "transparent",
    borderRadius: 10,
    zIndex: 10,
  },
  after_img: {
    position: "relative",
    top: 0,
    bottom: 0,
    right: -30,
  },
  image: {
    width: 74,
    height: 74,
    resizeMode: "contain",
  },
  continue: {
    paddingVertical: 25,
  },
  continue_shop: {
    // color: "#EB1741",
    fontSize: 16,
    textAlign: "left",
    fontFamily: "lato-regular",
  },
  promo: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  promo_btn: {
    borderWidth: 1,
    borderColor: "#EB1741",
    width: 190,
    borderRadius: 8,
    padding: 8,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  total_text: {
    fontSize: 18,
  },
  total_price: {
    fontSize: 14,
  },
  offer: {
    paddingBottom: 55,
    paddingHorizontal: 20,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: colors.btnLink,
  },

  bar: {
    width: "40%",
    height: 3,
    // borderRadius: 20,
    backgroundColor: colors.btnLink,
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  fontProgress: {
    fontFamily: "lato-medium",
    fontSize: 14,
  },

  fontProgressBold: {
    fontFamily: "lato-bold",
  },
  login_container: {
    backgroundColor: "#232332",
    flex: 1,
    // justifyContent: "center",
    // width: "100%",
  },
  main_text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "lato-medium",
  },
  login_body: {
    flexDirection: "column",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  login_content: {
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
  },
  login_btn: {
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  login_image: {
    height: 30,
    width: 30,
  },
  link_text: {
    textAlign: "left",
    fontSize: 14,
    color: colors.black,
  },
  bottom_text: {
    textAlign: "center",
    fontSize: 14,
    color: colors.white,
  },
});
