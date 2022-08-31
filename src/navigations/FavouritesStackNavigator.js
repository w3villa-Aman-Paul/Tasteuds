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
import { TouchableOpacity } from "react-native-gesture-handler";

const FavouritesStack = createStackNavigator();

function FavouritesStackNavigator({ navigation }) {
  const favorites = useSelector((state) => state.products.favorites);

  return (
    <FavouritesStack.Navigator
      screenOptions={{
        headerTitle: "FAVORITTER",
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
        headerTitleAlign: "center",
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
