import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import EnterCodeScreen from "../screens/auth/EnterCodeScreen";

import { connect } from "react-redux";
import ActivityIndicatorCard from "../library/components/ActivityIndicatorCard";
import { navigationRef } from "../library/utils/RootNavigation";
import splash from "../screens/components/splash";
import Search from "../screens/components/Search";
import ProfileStackNavigator from "./ProfileStackNavigator";
import HomeScreen from "../screens/main/ShopitStack/HomeScreen";
import MainTabNavigator from "./MainTabNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const RootStack = createStackNavigator();

function RootStackNavigator({ authState, dispatch }) {
  if (authState.isLoading) {
    return <ActivityIndicatorCard />;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      screenOptions={{
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
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={splash} />
        <RootStack.Screen name="Shopit" component={MainTabNavigator} />

        <RootStack.Screen name="Profile" component={ProfileStackNavigator} />

        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <RootStack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
        <RootStack.Screen name="EnterCode" component={EnterCodeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(RootStackNavigator);
