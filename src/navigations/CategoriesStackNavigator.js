import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "../screens/main/CategoriesStack/CategoriesScreen";
import { colors } from "../res/palette";
import { globalStyles } from "../styles/global";
import { Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import NewlyAddedProducts from "../screens/main/CategoriesStack/NewlyAddedProducts";
import MostBoughtProducts from "../screens/main/CategoriesStack/MostBoughtProducts";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const CategoriesStack = createStackNavigator();

function CategoriesStackNavigator({ navigation, route }) {
  const authState = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "NewProducts" || routeName === "MostBoughtProducts") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

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
            size={22}
            color={colors.primary}
            onPress={() => navigation.navigate("SearchScreen")}
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
          height: 33,
          width: 33,
          ...globalStyles.iosShadow,
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 10,
        },
      }}
    >
      <CategoriesStack.Screen name="Categories" component={CategoriesScreen} />
      <CategoriesStack.Screen
        name="NewProducts"
        component={NewlyAddedProducts}
        options={{
          headerTitle: "Nyheter",
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.navigate("Categories")}
              title="Back"
            />
          ),
          // headerRight: "",
        }}
      />
      <CategoriesStack.Screen
        name="MostBoughtProducts"
        component={MostBoughtProducts}
        options={{
          headerTitle: "Dine mest kjøpte varer",
          headerLeft: () => (
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.navigate("Categories")}
              title="Back"
            />
          ),
          // headerRight: "",
        }}
      />
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
