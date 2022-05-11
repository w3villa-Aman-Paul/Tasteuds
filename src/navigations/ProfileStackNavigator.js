import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/main/ProfileStack/ProfileScreen";
import {
  Menu,
  ShoppingBag,
  Search,
  User,
  ShoppingCart,
} from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import AccountScreen from "../screens/main/ProfileStack/AccountScreen";
import SavedAddress from "../screens/main/ProfileStack/SavedAddress";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";
import OffersScreen from "../screens/main/ProfileStack/OffersScreen";
import updateAddress from "../screens/main/ProfileStack/updateAddress";
import { connect, useSelector } from "react-redux";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ProfileStack = createStackNavigator();

function ProfileStackNavigator({ navigation }) {
  const authState = useSelector((state) => state.auth);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
            <Icon name="arrowleft" type="ant-design" title="Back" />
          </TouchableOpacity>
        ),
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
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Account" component={AccountScreen} />
      <ProfileStack.Screen name="SavedAddress" component={SavedAddress} />
      <ProfileStack.Screen name="Favourites" component={FavouritesScreen} />
      <ProfileStack.Screen name="updateAdd" component={updateAddress} />
      <ProfileStack.Screen name="Offers" component={OffersScreen} />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: 30,
    resizeMode: "contain",
  },
});

export default connect()(ProfileStackNavigator);
