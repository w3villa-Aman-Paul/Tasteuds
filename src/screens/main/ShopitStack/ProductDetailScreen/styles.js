import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";

export const styles = StyleSheet.create({
  containerFluid: {
    ...globalStyles.containerFluid,
    ...globalStyles.bgWhite,
  },
  pricingContainer: {
    ...globalStyles.mt8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  discountedPrice: {
    ...globalStyles.prices,
    color: colors.black,
  },
  price: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.black,
  },
  discountPercent: {
    ...globalStyles.prices,
    color: colors.error,
  },
  description: {
    marginTop: 40,
    color: colors.black,
  },
  desc__title: {
    fontSize: 20,
    fontWeight: "700",
  },
  desc__content: {
    fontSize: 16,
    color: colors.black,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.btnLink,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleStyle: {
    fontFamily: "lato-bold",
    color: colors.white,
  },
  productName: {
    fontSize: 32,
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
  },
  sizingTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewFooter: {
    ...globalStyles.mt8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewBorder: {
    ...globalStyles.mt16,
    backgroundColor: colors.gray,
  },
  likesDislikesContainer: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputRight: {
    ...globalStyles.latoRegular,
    ...globalStyles.textPrimary,
  },
  deliveryOffersContainer: {
    ...globalStyles.mt8,
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryOffersIcon: {
    color: colors.black,
    marginRight: 8,
  },
  footerContainer: {
    ...globalStyles.containerFluid,
    ...globalStyles.mt32,
    ...globalStyles.mb114,
    backgroundColor: colors.background,
  },
  footerItemListContainer: {
    ...globalStyles.container,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItemContainer: {
    alignItems: "center",
  },
  footerText: {
    ...globalStyles.latoBold14,
    ...globalStyles.mt8,
    fontSize: 11,
  },
  reviewFooterAction: {
    ...globalStyles.mt8,
    ...globalStyles.latoBold14,
    ...globalStyles.textPrimary,
  },
  alikeProductsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carouselProductsContainer: {
    marginLeft: "5%",
  },
  carouselProductCard: {
    width: 150,
    marginRight: 8,
  },
  carouselProductDescription: {
    borderWidth: 3,
    borderColor: colors.background,
    padding: 4,
  },
  pricingContainer: {
    flex: 1,
    flexDirection: "row",
  },
  carouselCardPrice: {
    color: colors.gray,
    textDecorationLine: "line-through",
  },
  carouselCardDiscountPercent: {
    color: colors.error,
  },
  carouselCardDiscountedPrice: {
    color: colors.black,
  },
  carouselCardPrices: {
    fontFamily: "lato-bold",
    fontSize: 11,
    paddingRight: 2,
  },
  carouselCardPricingContainer: {
    ...globalStyles.mt8,
    flexDirection: "row",
    flex: 1,
  },
  inputWrapperStyle: {
    ...globalStyles.mb16,
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
  },
  footerIcon: {
    color: colors.gray,
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  borderBtn: {
    color: colors.btnLink,
  },
});
