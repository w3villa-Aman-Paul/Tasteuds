import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import PaymentScreen from "../screens/main/ShopitStack/CheckoutScreens/PaymentScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";
import FiltersTabNavigator from "./FiltersTabNavigator";
import { ShoppingBag, Heart, Share } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import HomeComponent from "../screens/main/ShopitStack/HomeScreen";
import FavouritesStackNavigator from "./FavouritesStackNavigator";

const ShopitStack = createStackNavigator();

function ShopitStackNavigator({ navigation }) {
  const productsList = useSelector((state) => state.products.productsList);
  const authState = useSelector((state) => state.auth);

  return (
    <ShopitStack.Navigator
      screenOptions={{
        headerRight: () => (
          <>
            <Icon
              name="user"
              type="font-awesome"
              size={29}
              color={colors.primary}
              onPress={() => navigation.navigate("Profile")}
              style={{}}
            />
            <Icon
              name="shoppingcart"
              type="ant-design"
              size={29}
              color={colors.primary}
              onPress={() => navigation.navigate("Bag")}
            />
          </>
        ),
        headerTitleStyle: {
          ...globalStyles.latoBold18,
        },
        headerRightContainerStyle: {
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          paddingHorizontal: 18,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <ShopitStack.Screen
        name="Shop"
        component={HomeComponent}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/images/Header-Icon/header_logo.png")}
              style={styles.header}
            />
          ),
          title: "",
          headerLeftContainerStyle: {
            paddingHorizontal: 18,
          },
        }}
      />
      <ShopitStack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={({ route }) => ({
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/images/Header-Icon/header_logo.png")}
              style={styles.header}
            />
          ),
        })}
      />
      <ShopitStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerTitle: "",
          headerRightContainerStyle: styles.headerRight,
          headerLeft: () => (
            <Image
              source={require("../../assets/images/Header-Icon/header_logo.png")}
              style={styles.header}
            />
          ),
        }}
      />
      <ShopitStack.Screen
        name="Bag"
        component={BagScreen}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Heart
              size={24}
              style={{ color: colors.black }}
              onPress={() => navigation.navigate("Favorites")}
            />
          ),
        }}
      />
      <ShopitStack.Screen
        name="FiltersTabNavigator"
        component={FiltersTabNavigator}
        options={{
          headerTitle: "Filters",
          headerRight: () => <Text style={styles.resetButton}>Reset All</Text>,
        }}
      />
      <ShopitStack.Screen
        name="ShippingAddress"
        component={ShippingAddressScreen}
        options={{
          headerTitle: "Shipping Address",
          headerRight: () => (
            <Heart
              size={24}
              style={{ color: colors.black }}
              onPress={() => navigation.navigate("Favorites")}
            />
          ),
        }}
      />
      <ShopitStack.Screen
        name="CheckoutPayment"
        component={PaymentScreen}
        options={{
          headerTitle: "Payment",
          headerRight: () => (
            <Heart
              size={24}
              style={{ color: colors.black }}
              onPress={() => navigation.navigate("Favorites")}
            />
          ),
        }}
      />
      <ShopitStack.Screen
        name="Favorites"
        component={FavouritesStackNavigator}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/images/Header-Icon/header_logo.png")}
              style={styles.header}
            />
          ),
          headerRight: () => (
            <Heart
              size={24}
              style={{ color: colors.black }}
              onPress={() => navigation.navigate("Favorites")}
            />
          ),
        }}
      />
    </ShopitStack.Navigator>
  );
}

export default ShopitStackNavigator;

const styles = StyleSheet.create({
  headerRight: {
    borderColor: "#000",
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  resetButton: {
    ...globalStyles.textPrimary,
  },
  header: {
    width: 150,
    height: 30,
    resizeMode: "contain",
  },
});
