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

const Tab = createBottomTabNavigator();

function MainTabNavigator({ navigation }) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
        labelStyle: {
          fontFamily: "lato-bold",
        },
      }}
    >
      <Tab.Screen
        name="HJEM"
        component={ShopitStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="entypo" color={colors.primary} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="VARER"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="grid-outline"
              type="ionicon"
              color={colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FAVORITTER"
        component={FavouritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="heart-outline"
              type="ionicon"
              color={colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PROFIL"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="person-outline"
              type="ionicon"
              color={colors.primary}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default connect()(MainTabNavigator);
FavouritesStackNavigator;
