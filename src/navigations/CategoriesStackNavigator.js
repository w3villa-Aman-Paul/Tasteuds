import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/main/CategoriesStack/CategoriesScreen";
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
        headerLeftContainerStyle: {
          paddingHorizontal: 10,
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
