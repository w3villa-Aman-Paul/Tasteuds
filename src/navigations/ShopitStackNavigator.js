import { useState, useEffect, useLayoutEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import PaymentScreen from "../screens/main/ShopitStack/CheckoutScreens/PaymentScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";
import { Heart } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";

import { Icon } from "react-native-elements";
import HomeComponent from "../screens/main/ShopitStack/HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";
import SavedAddress from "../screens/main/ProfileStack/SavedAddress";
import AddAddress from "../screens/main/ProfileStack/AddAddress";

import ProducerDetailScreen from "../screens/main/ProducersStack/ProducerDetailScreen";
import SearchScreen from "../screens/main/ShopitStack/SearchScreen/index";
import ProducersListScreen from "../screens/main/ProducersStack/ProducersListScreen";
import { useSelector, useDispatch } from "react-redux";
import { createCart } from "../redux";

const ShopitStack = createStackNavigator();

function ShopitStackNavigator({ navigation, route }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (!cart.token) {
      dispatch(createCart());
    }
  }, []);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === "Bag" ||
      routeName === "ShippingAddress" ||
      routeName === "SavedAddress" ||
      routeName === "ProducersDetailScreen"
    ) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <ShopitStack.Navigator screenOptions={{}}>
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
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.navigate("SearchScreen")}
              >
                <Icon
                  name="search"
                  type="font-awesome"
                  size={25}
                  color={colors.primary}
                  onPress={() => navigation.navigate("SearchScreen")}
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

                {cart?.item_count > 0 ? (
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
                      {cart?.item_count}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          ),
          headerRightContainerStyle: {
            flex: 0.2,
            justifyContent: "space-between",
            alignItems: "center",
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
          headerShown: true,
          headerTitleAlign: "center",

          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.goBack()}
              title="Back"
            />
          ),

          headerLeftContainerStyle: [
            {
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
            globalStyles.iosShadow,
          ],
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
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.navigate("SearchScreen")}
              >
                <Icon
                  name="search"
                  type="font-awesome"
                  size={25}
                  color={colors.primary}
                  onPress={() => navigation.navigate("SearchScreen")}
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

                {cart?.item_count > 0 ? (
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
                      {cart?.item_count}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
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
            flex: 0.2,
            justifyContent: "space-between",
            alignItems: "center",
          },
        })}
      />
      <ShopitStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerTitle: "",

          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.goBack()}
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
                onPress={() => navigation.navigate("Bag")}
              >
                <Icon
                  name="shoppingcart"
                  type="ant-design"
                  size={30}
                  color={colors.primary}
                />

                {cart?.item_count > 0 ? (
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
                      {cart?.item_count}
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
                onPress={() => navigation.goBack()}
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
          headerTitle: "BETALING",
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
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
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
              onPress={() => navigation.goBack()}
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

      <ShopitStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: "Søk",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.goBack()}
              title="Back"
            />
          ),
          headerLeftContainerStyle: [
            {
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
            globalStyles.iosShadow,
          ],
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
