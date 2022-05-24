import * as React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import PaymentScreen from "../screens/main/ShopitStack/CheckoutScreens/PaymentScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";

import { ShoppingBag, Heart, Share, ChevronLeft } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";

import { Icon } from "react-native-elements";
import HomeComponent from "../screens/main/ShopitStack/HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";
import SavedAddress from "../screens/main/ProfileStack/SavedAddress";
import AddAddress from "../screens/main/ProfileStack/AddAddress";

import ProducersListScreen from "../screens/main/ProducersStack/ProducersListScreen";

import ProducerDetailScreen from "../screens/main/ProducersStack/ProducerDetailScreen";

const ShopitStack = createStackNavigator();

function ShopitStackNavigator({ navigation, route }) {
  const cart = useSelector((state) => state.checkout.cart);

  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    setCartCount(cart.item_count);
  }, [cart]);

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === "Bag" ||
      routeName === "ShippingAddress" ||
      routeName === "SavedAddress" ||
      routeName === "AddAdress" ||
      routeName === "ProducersDetailScreen"
    ) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <ShopitStack.Navigator>
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
          title: "",
          headerLeftContainerStyle: {
            paddingHorizontal: 10,
          },
        }}
      />
      <ShopitStack.Screen
        name="ProducersListScreen"
        component={ProducersListScreen}
        options={{
          headerTitle: "PRODUSENTER",
          headerTitleAlign: "center",
        }}
      />
      <ShopitStack.Screen
        name="ProducersDetailScreen"
        component={ProducerDetailScreen}
        options={{
          headerTitle: "",
          headerShown: false,
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
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.primary,
            fontFamily: "lato-bold",
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

          headerLeft: () => (
            <ChevronLeft
              size={29}
              onPress={() => navigation.goBack()}
              style={styles.chevron}
              title="Back"
            />
          ),
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginRight: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Icon
                  name="person"
                  type="ionicons"
                  size={30}
                  color={colors.primary}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Bag")}
              >
                <Icon
                  name="shoppingcart"
                  type="ant-design"
                  size={30}
                  color={colors.primary}
                />

                {cartCount > 0 ? (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "red",
                      width: 16,
                      height: 16,
                      borderRadius: 15 / 2,
                      right: 0,
                      top: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: 10,
                      }}
                    >
                      {cartCount}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          ),
          title: "",
          headerStyle: {},
          headerTitleStyle: {
            flex: 0.6,
          },
          headerLeftContainerStyle: {
            flex: 0.2,
            paddingHorizontal: 15,
          },
          headerRightContainerStyle: {
            flex: 0.2,
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      />
      <ShopitStack.Screen
        name="Bag"
        component={BagScreen}
        options={{
          headerTitle: "HANDLEKURV",

          headerRight: () => <></>,

          headerLeft: () => (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: "transparent",
                elevation: 2,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="cross"
                type="entypo"
                size={24}
                style={{ color: colors.black }}
                onPress={() => navigation.navigate("ProductDetail")}
              />
            </TouchableOpacity>
          ),

          headerTitleStyle: {
            color: colors.primary,
            fontFamily: "lato-bold",
          },
          headerTitleAlign: "center",
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            elevation: 0,
          },
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
          headerTitleStyle: {
            color: colors.primary,
            fontFamily: "lato-bold",
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
      <ShopitStack.Screen name="Favorites" component={FavouritesScreen} />
      <ShopitStack.Screen name="SavedAddress" component={SavedAddress} />
      <ShopitStack.Screen name="AddAdress" component={AddAddress} />
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
