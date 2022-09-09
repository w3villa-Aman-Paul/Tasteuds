import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";

export const styles = StyleSheet.create({
  statusBarWrapper: {
    ...globalStyles.containerFluid,
    ...globalStyles.bgWhite,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  statusBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  inputStyle: {
    ...globalStyles.latoRegular14,
    color: colors.gray,
  },
  inputContainerStyle: {
    paddingLeft: 5,
    borderBottomColor: "#fff",
  },
  containerStyle: {
    ...globalStyles.mt16,
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 4,
  },
  inlineContainer: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  iconStyle: {
    color: colors.primary,
    marginRight: 8,
  },
  footer: {
    height: 80,
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: colors.background,
  },
  orderTotalContainer: {
    ...globalStyles.containerFluid,
    ...globalStyles.bgWhite,
    ...globalStyles.mt24,
    paddingBottom: 32,
  },
  orderTotalDetailsText: {
    ...globalStyles.label,
    fontSize: 14,
  },
  orderDetailsRow: {
    ...globalStyles.mt8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dividerStyle: {
    ...globalStyles.mt8,
    backgroundColor: "#f5f5f5",
  },
  shippingIndicatorLine: {
    flex: 1,
    borderBottomWidth: 0.8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  orderTotalAmountContainer: {
    ...globalStyles.container,
    ...globalStyles.mt8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  address_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...globalStyles.iosShadow,
  },
  address_body: {
    elevation: 10,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
  },
  address_title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  address_text: {
    fontSize: 14,
  },
  address_btn: {
    paddingRight: 10,
  },
  address_btn_text: {
    color: "#EB1741",
    fontSize: 14,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "lato-bold",
  },
  sub_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  subtitle: {
    paddingRight: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  payment_container: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    padding: 15,
    ...globalStyles.iosShadow,
  },
  payment_title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  payment_body: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 10,
  },
  payment_btn_body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
    ...globalStyles.iosShadow,
  },
  payment_btn: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: "transparent",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  payment_img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  login_container: {
    backgroundColor: "#232332",
    flex: 1,
    justifyContent: "flex-end",
  },

  fav_close_container: {
    position: "absolute",
    right: 14,
    top: 10,
    marginBottom: 15,
    elevation: 5,
    zIndex: 3,
  },
  fav_close: {
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "lato-bold",
    marginTop: 15,
    marginBottom: 15,
  },
  cardContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  cardContent: {
    marginBottom: 15,
  },
  cardText: {
    color: colors.white,
    marginBottom: 5,
    fontSize: 14,
  },
  cardInput: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "90%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardInputDate: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "30%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
  },
  lastInputs: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBtn: {
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    borderRadius: 10,
  },
  headerSection: {
    flexDirection: "row",
  },
  buyButton: {
    backgroundColor: "#007DFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  textButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    color: "#007DFF",
  },
  selectButton: {
    borderColor: "#007DFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  boldText: {
    fontSize: 17,
    fontWeight: "700",
  },
  fontProgress: {
    fontFamily: "lato-medium",
    fontSize: 14,
  },

  fontProgressBold: {
    fontFamily: "lato-bold",
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
});
