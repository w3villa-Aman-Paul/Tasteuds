import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../res/palette";
import {
  Home,
  MenuGridR,
  Heart,
  Profile,
  Menu,
  Search,
  User,
} from "../library/icons";
import ShopitStackNavigator from "./ShopitStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import SearchComponent from "../screens/components/Search";

import { connect } from "react-redux";
import ProfileStackNavigator from "./ProfileStackNavigator";

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
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="VARER"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MenuGridR color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FAVORITTER"
        component={FavouritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="PROFIL"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default connect()(MainTabNavigator);
FavouritesStackNavigator;
