import { StyleSheet } from 'react-native'
import { globalStyles } from '../../../../../styles/global'
import { colors } from '../../../../../res/palette'

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
    flex: 0.2,
  },
  body_second: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.3,
  },
  body_third: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  name: {
    fontSize: 15,
  },
  display_total: {
    fontSize: 15,
  },
  cart_btn: {
    // flex: 0.2,
    flexDirection: "row",
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 5,
    borderColor: "transparent",
    backgroundColor: "#fff",
    elevation: 5,
  },
  inc_btn: {
    flex: 1,
    flexDirection: "column",
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 80,
  },
  continue: {
    paddingVertical: 25,
  },
  continue_shop: {
    color: "#EB1741",
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
});