import "react-native-gesture-handler";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "react-native-elements";
import RootStackNavigator from "./src/navigations/RootStackNavigator";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import * as Font from "expo-font";
import ActivityIndicatorCard from "./src/library/components/ActivityIndicatorCard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LogBox } from "react-native";

const getFonts = () =>
  Font.loadAsync({
    "lato-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "lato-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "lato-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  });

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  "Possible",
  "You should always pass contentWidth prop",
  "Warning: Each child",
]);

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  const fun = async () => {
    await getFonts();
    setFontsLoaded(true);
  };

  fun();

  if (!fontsLoaded) {
    return <ActivityIndicatorCard />;
  }

  return (
    <StripeProvider
      publishableKey="pk_test_51LdSV1SH62860s701ZWgszH08MEcAWUWjjvAQ37szzxhyCjlha0Q4vla5z9x8YBqbamQlbx7IO6wh0mKXTL8d5Kz00XmYNzGag"
      merchantIdentifier="merchant.com.tastebuds"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ThemeProvider>
              <PaperProvider>
                <RootStackNavigator />
              </PaperProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
