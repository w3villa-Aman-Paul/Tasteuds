import { StyleSheet } from "react-native";
import { colors } from "../../../res/palette";
import { globalStyles } from "../../../styles/global";

export const styles = StyleSheet.create({
  footer: {
    height: 80,
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: colors.background,
  },
  footerAction: {
    ...globalStyles.btn,
    ...globalStyles.btnSolid,
    margin: "4%",
    height: 48,
  },
  cart_total_price: {
    height: 135,
    justifyContent: "center",
    backgroundColor: colors.white,
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
  },
  total_price: {
    fontSize: 14,
  },
});
