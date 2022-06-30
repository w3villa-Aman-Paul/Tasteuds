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
  },
  payment_btn: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    elevation: 5,
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
  },

  fav_close_container: {
    position: "absolute",
    right: 14,
    top: 10,
    marginBottom: 15,
    elevation: 5,
  },
  fav_close: {
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    justifyContent: "center",
    alignSelf: "center",
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
    paddingHorizontal: 10,
  },
  cardInputDate: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
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
});
