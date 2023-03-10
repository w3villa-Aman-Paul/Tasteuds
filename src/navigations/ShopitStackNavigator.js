import { useState, useEffect, useLayoutEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";
import { AppleCheckoutScreen } from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen/MethodSelector";
import { Heart } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";

import { Icon } from "react-native-elements";
import HomeComponent from "../screens/main/ShopitStack/HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";
import SavedAddress from "../screens/main/ProfileStack/SavedAddress";
import AddAddress from "../screens/main/ProfileStack/AddAddress";
import { useSelector, useDispatch } from "react-redux";
import { createCart, getMenus, getMostBoughtGoods } from "../redux";
import updateAddress from "../screens/main/ProfileStack/updateAddress";
import Payments from "../library/components/Payments/Payments";

const ShopitStack = createStackNavigator();

function ShopitStackNavigator({ navigation, route }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.checkout);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);
  const menus = useSelector((state) => state.taxons.menus);

  useEffect(() => {
    if( menus?.menu_items?.length === 0){
      dispatch(getMenus());
    }
  }, [menus.menu_items]);

  useEffect(() => {
    if( mostBoughtGoods?.length === 0 ){
      dispatch(getMostBoughtGoods());
    }
  }, []);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === "Bag" ||
      routeName === "ShippingAddress" ||
      routeName === "SavedAddress" ||
      routeName === "OrderComplete"
    ) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <ShopitStack.Navigator
      screenOptions={{
        headerBackTitle: "",
      }}
    >
      <ShopitStack.Screen
        name="Shop"
        component={HomeComponent}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigation.navigate("Shop")}
            >
              <Image
                source={require("../../assets/images/Header-Icon/banner-logo.png")}
                style={styles.headerImg}
              />
            </TouchableOpacity>
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
                <Image
                  source={require("../../assets/images/icons/shopping_bag.png")}
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
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
          headerLeftContainerStyle: {
            margin: 0,
          },
        }}
      />

      <ShopitStack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={({ route }) => ({
          headerTitle: "PRODUKTER",

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
                <Image
                  source={require("../../assets/images/icons/shopping_bag.png")}
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
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
                <Image
                  source={require("../../assets/images/icons/shopping_bag.png")}
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
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
          headerTitleStyle: {
            flex: 0.6,
          },

          headerRightContainerStyle: {
            flex: 0.2,
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      />

     
      <ShopitStack.Screen name="Favorites" component={FavouritesScreen} />
      <ShopitStack.Screen name="SavedAddress" component={SavedAddress} />
      <ShopitStack.Screen name="AddAdress" component={AddAddress} />
      <ShopitStack.Screen name="updateAddress" component={updateAddress} />
      <ShopitStack.Screen name="Payments" component={Payments} />
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
    height: "100%",
  },
  headerImg: {
    height: "100%",
    width: "100%",
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
