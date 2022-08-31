import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../res/palette";
import { Home, MenuGridR, Heart } from "../library/icons";
import ShopitStackNavigator from "./ShopitStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import SearchComponent from "../screens/components/Search";

import { connect } from "react-redux";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { Icon } from "react-native-elements";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

function MainTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
        labelStyle: {
          fontFamily: "lato-bold",
        },
        style: {
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        name="HJEM"
        component={ShopitStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/images/icons/shop_active.png")
                    : require("../../assets/images/icons/shop.png")
                }
                style={{ resizeMode: "contain", height: "90%" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="VARER"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/images/icons/ingredients_active.png")
                    : require("../../assets/images/icons/ingredients.png")
                }
                style={{ resizeMode: "contain", height: "85%" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="FAVORITTER"
        component={FavouritesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/images/icons/favorite_active.png")
                    : require("../../assets/images/icons/favorite.png")
                }
                style={{ resizeMode: "contain", height: "85%" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="PROFIL"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                height: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/images/icons/user-menu-male_active.png")
                    : require("../../assets/images/icons/user-menu-male.png")
                }
                style={{ resizeMode: "contain", height: "85%" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default connect()(MainTabNavigator);
FavouritesStackNavigator;
