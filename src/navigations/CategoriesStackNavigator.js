import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/main/CategoriesStack/CategoriesScreen";
import { colors } from "../res/palette";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import NewlyAddedProducts from "../screens/main/CategoriesStack/NewlyAddedProducts";
import MostBoughtProducts from "../screens/main/CategoriesStack/MostBoughtProducts";
import ProducersListScreen from "../screens/main/ProducersStack/ProducersListScreen";
import ProductsListScreen from "../screens/main/ShopitStack/ProductsListScreen";
import { useDispatch, useSelector } from "react-redux";
import ProducerDetailScreen from "../screens/main/ProducersStack/ProducerDetailScreen";
import ProductDetailScreen from "../screens/main/ShopitStack/ProductDetailScreen";
import { getVendorsList } from "../redux";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";

const CategoriesStack = createStackNavigator();

function CategoriesStackNavigator({ navigation, route }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(getVendorsList());
  }, []);


  return (
    <NavigationContainer independent={true}>
      <CategoriesStack.Navigator
        initialRouteName="Categories"
        screenOptions={{
          headerTitle: "",
          headerBackTitle: "",
        }}
      >
        <CategoriesStack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerLeft: () => (
              <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.navigate('Shop')}
              >
                <Image
                  source={require("../../assets/images/Header-Icon/banner-logo.png")}
                  style={styles.headerImg}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  marginRight: 20,
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
            )
          }}
        />
        <CategoriesStack.Screen
          name="NewProducts"
          component={NewlyAddedProducts}
          options={{
            headerTitle: "Nyheter",
            headerTitleAlign: "center",
          }}
        />
        <CategoriesStack.Screen
          name="MostBoughtProducts"
          component={MostBoughtProducts}
          options={{
            headerTitle: "Dine mest kjøpte varer",
            headerTitleAlign: "center",
          }}
        />
        <CategoriesStack.Screen
          name="ProducersListScreen"
          component={ProducersListScreen}
          options={{
            headerTitle: "PRODUSENTER",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />

        <CategoriesStack.Screen
          name="ProducersDetailScreen"
          component={ProducerDetailScreen}
          options={{
            headerShown: false,
          }}
        />

        <CategoriesStack.Screen
          name="Bag"
          component={BagScreen}
          options={{
            headerShown: false
          }}
        //   headerRightContainerStyle: {
        //     elevation: 0,
        //   },
        // }}
        />

        <CategoriesStack.Screen
          name="ProductsList"
          component={ProductsListScreen}
          options={{
            headerTitle: "PRODUKTER",
            headerTitleAlign: "center",
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
          }}
        />

        <CategoriesStack.Screen
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
      </CategoriesStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: "100%",
  },
  headerImg: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default CategoriesStackNavigator;
