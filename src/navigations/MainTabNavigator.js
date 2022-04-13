import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../res/palette";
import { Home, MenuGridR, Heart, Profile, Menu, Search } from "../library/icons";
import ShopitStackNavigator from "./ShopitStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import FavouritesStackNavigator from "./FavouritesStackNavigator";
import SearchComponent from "../screens/components/Search";

const Tab = createBottomTabNavigator();

function MainTabNavigator({navigation}) {
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
        name="Shop"
        component={ShopitStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MenuGridR color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={FavouritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size}/>,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
