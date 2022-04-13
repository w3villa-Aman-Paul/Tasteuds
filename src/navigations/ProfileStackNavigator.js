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
import { useSelector } from "react-redux";
import { Image, StyleSheet } from "react-native";

const ProfileStack = createStackNavigator();

function ProfileStackNavigator({ navigation }) {
  const authState = useSelector((state) => state.auth);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerRight: () => (
          <>
            {authState?.access_token ? (
              <>
                <User
                  size={25}
                  style={{ color: colors.black, marginRight: 14 }}
                />
                <ShoppingCart
                  size={24}
                  style={{ color: colors.black }}
                  onPress={() => navigation.navigate("Bag")}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ),

        headerLeft: () => (
          <Image
            source={require("../../assets/images/Header-Icon/header_logo.png")}
            style={styles.header}
          />
        ),
        title: "",
        headerLeftContainerStyle: {
          paddingHorizontal: 18,
        },
        headerTitleStyle: {
          ...globalStyles.latoBold18,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 18,
          flexDirection: "row",
          alignItems: "center",
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

export default ProfileStackNavigator;
