import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabNavigator from "./MainTabNavigator";
// import OrdersScreen from '../screens/main/MainDrawer/OrdersScreen'
import OrdersStackNavigator from "../screens/main/MainDrawer/OrdersStack/OrdersStackNavigator";
import CustomDrawerContent from "../library/components/CustomDrawerContent";
import { colors } from "../res/palette";
import { Browse, ShoppingBag } from "../library/icons";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  const authState = useSelector((state) => state?.auth);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          width: "75%",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: colors.primary,
          activeBackgroundColor: colors.white,
        }}
      >
        <Drawer.Screen
          name="Shopit"
          component={MainTabNavigator}
          options={{
            drawerLabel: "Browse Catalogue",
            drawerIcon: ({ focused, color, size }) => (
              <Browse size={size} style={{ color }} />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersStackNavigator}
          options={{
            drawerLabel: "Orders",
            drawerIcon: ({ focused, color, size }) => (
              <ShoppingBag size={size} style={{ color }} />
            ),
          }}
        />

        {authState.isAuth ? (
          <></>
        ) : (
          <>
            <Drawer.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                drawerLabel: "Sign In",
                drawerIcon: ({ focused, color, size }) => (
                  <Icon
                    name="login"
                    type="ant-design"
                    size={size}
                    style={{ color }}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                drawerLabel: "Sign Up",
                drawerIcon: ({ focused, color, size }) => (
                  <Icon
                    name="sign-in"
                    type="font-awesome"
                    size={size}
                    style={{ color }}
                  />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </>
  );
}
