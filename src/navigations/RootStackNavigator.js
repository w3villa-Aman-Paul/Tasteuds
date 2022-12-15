import "react-native-gesture-handler";
import React,{useEffect} from "react";
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
import ProfileStackNavigator from "./ProfileStackNavigator";
import MainTabNavigator from "./MainTabNavigator";
import { useSelector } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import SearchScreen from "../screens/main/ShopitStack/SearchScreen";
import BagScreen from "../screens/main/ShopitStack/CheckoutScreens/BagScreen";
import { colors } from "../res/palette";
import OrderCompleteScreen from "../screens/main/ShopitStack/CheckoutScreens/OrderCompleteScreen";
import ShippingAddressScreen from "../screens/main/ShopitStack/CheckoutScreens/ShippingAddressScreen";
import { createCart, getMenus, getVendorsList, getWeeklyProducer, userLogout } from "../redux";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const RootStack = createStackNavigator();

function RootStackNavigator({ authState, dispatch }) {
  const publishableKey = useSelector(
    (state) => state.checkout?.paymentMethods[0]?.preferences?.publishable_key
  );

  const { status } = useSelector((state) => state.checkout);
  const { isAuth} = useSelector((state) => state.account);
  const {menus, vendors} = useSelector((state) => state.taxons)


  const loader = async () => {
    await dispatch(getWeeklyProducer())
    if(menus.menu_items.length === 0){
      await dispatch(getMenus())
    }
    if(vendors.length === 0){
      await dispatch(getVendorsList())
    }
  }

  useEffect(() => {
    if(!isAuth){
      dispatch(userLogout());
    }
  }, [])

  useEffect(() => {
    if(status === 404){
      dispatch(createCart());
    }
    loader();
  },[])


  if (authState.isLoading) {
    return <ActivityIndicatorCard />;
  }
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.tastebuds"
      urlScheme={
        Constants.appOwnership === "expo"
          ? Linking.createURL("/--/")
          : Linking.createURL("")
      }
    >
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
          <RootStack.Screen name="Shopit" component={MainTabNavigator} />
          <RootStack.Screen name="Profile" component={ProfileStackNavigator} />
          <RootStack.Screen name="Splash" component={splash} />
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
          <RootStack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: "true",
              headerTitle: "Søk",
              headerTitleAlign: "center",
              headerTitleStyle: {
                color: colors.primary,
                fontFamily: "lato-bold",
              },
            }}
          />

          <RootStack.Screen
            name="Bag"
            component={BagScreen}
            // options={{
            //   // headerShown: "true",
            //   headerTitle: "HANDLEKURV",
            //   headerTitleAlign: "center",
            //   headerTitleStyle: {
            //     color: colors.primary,
            //     fontFamily: "lato-bold",
            //   },
            //   headerRightContainerStyle: {
            //     elevation: 0,
            //   },
            // }}
          />

          <RootStack.Screen
            name="ShippingAddress"
            component={ShippingAddressScreen}
            options={{
              headerShown: 'true',
              headerTitle: "BETALING",
              headerTitleStyle: {
                color: colors.primary,
                fontFamily: "lato-bold",
              },
              headerTitleAlign: "center",
              headerRightContainerStyle: {
                elevation: 0,
              },
            }}
          />
          <RootStack.Screen
            name="OrderComplete"
            component={OrderCompleteScreen}
            options={{
              headerTitle: "",
              headerShown: false,
              headerTitleStyle: {
                color: colors.primary,
                fontFamily: "lato-bold",
              },
              headerTitleAlign: "center",
              headerRight: () => (
                <Heart
                  size={24}
                  style={{ color: colors.black }}
                  onPress={() => navigation.goBack()}
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
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(RootStackNavigator);
