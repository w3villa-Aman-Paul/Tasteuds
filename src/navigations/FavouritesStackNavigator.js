import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavouritesScreen from "../screens/main/FavouritesStack/FavouritesScreen";
import { Menu, ShoppingBag, Search } from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";
import CustomTitle from "../library/components/CustomTitle";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Button, Image, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const FavouritesStack = createStackNavigator();

function FavouritesStackNavigator({ navigation }) {
  const favorites = useSelector((state) => state.products.favorites);

  return (
    <FavouritesStack.Navigator
      screenOptions={{
        headerTitle: "FAVORITTER",
        headerLeft: () => (
          <Icon
            name="arrowleft"
            type="ant-design"
            onPress={() => navigation.goBack()}
            title="Back"
          />
        ),
        headerTitleAlign: "center",
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
      <FavouritesStack.Screen name="Favorites" component={FavouritesScreen} />
    </FavouritesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: 30,
    resizeMode: "contain",
  },
});

export default FavouritesStackNavigator;
