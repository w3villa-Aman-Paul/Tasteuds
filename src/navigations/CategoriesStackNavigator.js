import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/main/CategoriesStack/CategoriesScreen";
import {
  Menu,
  ShoppingBag,
  Search,
  User,
  ShoppingCart,
} from "../library/icons";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

const CategoriesStack = createStackNavigator();

function CategoriesStackNavigator({ navigation }) {
  const authState = useSelector((state) => state.auth);

  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerTitle: "",
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
        headerRight: () => (
          <>
            <Icon
              name="user"
              type="font-awesome"
              size={29}
              color={colors.primary}
              onPress={() => navigation.navigate("Profile")}
              style={{}}
            />
            <Icon
              name="shoppingcart"
              type="ant-design"
              size={29}
              color={colors.primary}
              onPress={() => navigation.navigate("Bag")}
            />
          </>
        ),
        headerTitleStyle: {
          ...globalStyles.latoBold18,
        },
        headerRightContainerStyle: {
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          paddingHorizontal: 18,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <CategoriesStack.Screen name="Categories" component={CategoriesScreen} />
    </CategoriesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: 30,
    resizeMode: "contain",
  },
});

export default CategoriesStackNavigator;
