import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";

export const styles = StyleSheet.create({
  container: {
    ...globalStyles.containerFluid,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 30,
    position: "relative",
  },

  crossButton: {
    position: "absolute",
    zIndex: 5,
    left: 14,
    top: 10,
    marginBottom: 15,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: "transparent",
    borderRadius: 50,
    ...globalStyles.iosShadow,
  },
  successLogo: {
    alignSelf: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  completeText: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 18,
    fontFamily: "lato-bold",
  },
  details: {
    flex: 1,
    marginTop: 30,
  },

  container_box: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    elevation: 5,
    ...globalStyles.iosShadow,
    backgroundColor: colors.white,
    marginBottom: 20,
  },

  products: {
    fontSize: 14,
    fontFamily: "lato-bold",
    color: colors.btnLink,
    padding: 10,
  },

  itemContainer: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },

  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  imgContainer: {
    flex: 0.5,
    flexDirection: "row",
  },

  productImg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },

  productText: {
    marginHorizontal: 8,
    alignSelf: "center",
    fontSize: 13,
    fontFamily: "lato-medium",
  },
  productDes: {
    flex: 0.2,
    alignSelf: "center",
  },
  productPrice: {
    flex: 0.3,
    alignSelf: "center",
  },

  totalData: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
  },

  primaryText: {
    fontSize: 14,
    fontFamily: "lato-bold",
    color: colors.btnLink,
  },
  secondaryText: {
    fontSize: 10,
    fontFamily: "lato-medium",
    color: colors.gray,
  },
  delivery: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  deliveryText: {
    fontSize: 12,
    fontFamily: "lato-medium",
    color: colors.black,
  },
});
