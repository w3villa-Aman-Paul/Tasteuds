import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../res/palette";
import { useNavigation } from "@react-navigation/native";

const BottomBarCart = () => {
  const { cart } = useSelector((state) => state.checkout);
  const navigation = useNavigation();

  return (
    <>
      {cart?.item_count > 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Bag")}
          style={styles.qty_footer}
          activeOpacity={0.8}
        >
          <Text
            style={{ color: colors.white, fontSize: 15, fontWeight: "bold" }}
          >
            {cart?.item_count} VARER
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={require("../../../assets/images/icons/shopping-basket.png")}
                style={{
                  height: "100%",
                  width: 30,
                  resizeMode: "contain",
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                SE HANDLEKURV
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default BottomBarCart;

const styles = StyleSheet.create({
  qty_footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.btnLink,
    maxHeight: 40,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    alignSelf: "center",
  },
});
