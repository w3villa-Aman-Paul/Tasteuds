import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/main/ProfileStack/ProfileScreen";

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
import AddAddress from "../screens/main/ProfileStack/AddAddress";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";

const ProfileStack = createStackNavigator();

function ProfileStackNavigator({ navigation }) {
  const authState = useSelector((state) => state.auth);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: "",
        headerBackTitle: " ",
        headerBackImage: () => (
          <Image
            source={require("../../assets/images/icons/chevron-left.png")}
            style={{
              height: 25,
              width: 25,
              zIndex: 1,
            }}
          />
        ),
      }}
    >
      <ProfileStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: "ACCOUNT",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingHorizontal: 10 }}
            >
              <Image
                source={require("../../assets/images/icons/chevron-left.png")}
                style={{
                  height: 25,
                  width: 25,
                  zIndex: 1,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: "PROFIL", headerTitleAlign: "center" }}
      />
      <ProfileStack.Screen
        name="SavedAddress"
        component={SavedAddress}
        options={{ headerTitle: "SAVED ADDRESS", headerTitleAlign: "center" }}
      />
      <ProfileStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerTitle: "RESET PASSWORD", headerTitleAlign: "center" }}
      />
      <ProfileStack.Screen
        name="updateAddress"
        component={updateAddress}
        options={{ headerTitle: "UPDATE ADDRESS", headerTitleAlign: "center" }}
      />
      <ProfileStack.Screen
        name="AddAdress"
        component={AddAddress}
        options={{ headerTitle: "ADD ADDRESS", headerTitleAlign: "center" }}
      />
      <ProfileStack.Screen
        name="Offers"
        component={OffersScreen}
        options={{ headerTitle: "OFFERS", headerTitleAlign: "center" }}
      />
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
