import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainDrawerNavigator from "./MainDrawerNavigator";

import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import EnterCodeScreen from "../screens/auth/EnterCodeScreen";

import AsyncStorage from "@react-native-community/async-storage";
import { userLogin } from "../redux/actions/authActions";
import { connect } from "react-redux";
import ActivityIndicatorCard from "../library/components/ActivityIndicatorCard";
import { navigationRef } from "../library/utils/RootNavigation";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const RootStack = createStackNavigator();

function RootStackNavigator({ authState, dispatch }) {
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch(
        userLogin({
          refresh_token: await AsyncStorage.getItem("refreshToken"),
          grant_type: "refresh_token",
        })
      );
    };

    bootstrapAsync();
  }, []);

  if (authState.isLoading) {
    return <ActivityIndicatorCard />;
  }
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="MainDrawerNavigator"
          component={MainDrawerNavigator}
        />
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
