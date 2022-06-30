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

const getFonts = () =>
  Font.loadAsync({
    "lato-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "lato-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "lato-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  });

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
  );
};

export default App;
