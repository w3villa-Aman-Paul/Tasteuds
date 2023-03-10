import { StyleSheet } from "react-native";
import { colors } from "../../../res/palette";
import { globalStyles } from "../../../styles/global";

export const styles = StyleSheet.create({
  footer: {
    height: 80,
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderTopWidth: 2,
    borderTopColor: colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footerAction: {
    ...globalStyles.btn,
    ...globalStyles.btnSolid,
    marginBottom: "2%",
    marginLeft: "4%",
    marginRight: "4%",
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cart_total_price: {
    height: 135,
    justifyContent: "center",
    backgroundColor: "#232332",
    borderTopWidth: 1,
    borderColor: "transparent",
    elevation: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cart_footer_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  total_text: {
    fontSize: 18,
    color: colors.white,
  },
  total_price: {
    fontSize: 14,
    color: colors.white,
  },
  container: {
    height: 280,
    width: "100%",
    backgroundColor: "#282835",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  filter_text: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center",
  },
  item_body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  item_text: {
    color: "#fff",
    fontSize: 14,
  },
  cancel: {
    justifyContent: "center",
    alignItems: "center",
  },
  filter_chevron: {
    color: "#fff",
    fontSize: 10,
  },
  filter_btn: {
    width: "60%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "#EB1741",
    marginTop: 25,
    marginBottom: 25,
  },
  btnText:{
    color: colors.white,
    textAlign: 'center',
    fontFamily: "lato-bold",
    fontSize: 16,
  }
});
