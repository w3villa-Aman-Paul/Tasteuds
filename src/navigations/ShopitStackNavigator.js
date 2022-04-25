import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import PaymentScreen from "../screens/main/ShopitStack/CheckoutScreens/PaymentScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";
import FiltersTabNavigator from "./FiltersTabNavigator";
import { ShoppingBag, Heart, Share, ChevronLeft } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";

import { Icon } from "react-native-elements";
import HomeComponent from "../screens/main/ShopitStack/HomeScreen";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";

const ShopitStack = createStackNavigator();

function ShopitStackNavigator({ navigation }) {
  const productsList = useSelector((state) => state.products.productsList);
  const authState = useSelector((state) => state.auth);

  return (
    <ShopitStack.Navigator
      screenOptions={{
        headerRight: () => (
          <Icon
            name="search"
            type="font-awesome"
            size={25}
            color={colors.primary}
            onPress={() => navigation.navigate("Profile")}
          />
        ),
        headerRightContainerStyle: {
          top: 4,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: 50,
          elevation: 10,
          height: 40,
          width: 40,
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
            paddingHorizontal: 10,
          },
        }}
      />
      <ShopitStack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={({ route }) => ({
          headerTitle: "PRODUKTER",
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.goBack()}
              title="Back"
            />
          ),
          headerTitleStyle: {
            alignSelf: "center",
            color: colors.primary,
          },
          headerLeftContainerStyle: {
            paddingHorizontal: 10,
            top: 4,
            left: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
        })}
      />
      <ShopitStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerTitle: "",
          headerRightContainerStyle: styles.headerRight,
          headerLeft: () => (
            <ChevronLeft
              size={29}
              onPress={() => navigation.goBack()}
              style={styles.chevron}
              title="Back"
            />
          ),
          title: "",
          headerLeftContainerStyle: {
            paddingHorizontal: 15,
          },
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
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
          title: "",
          headerLeftContainerStyle: {
            paddingHorizontal: 10,
          },
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
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
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
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
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
        }}
      />
      <ShopitStack.Screen
        name="Favorites"
        component={FavouritesScreen}
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
          headerRightContainerStyle: {
            top: 4,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 50,
            elevation: 10,
            height: 40,
            width: 40,
          },
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
  chevron: {
    color: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "transparent",
    elevation: 3,
    backgroundColor: "#FFF",
  },
});
