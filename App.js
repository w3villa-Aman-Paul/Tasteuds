import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "react-native-elements";
import RootStackNavigator from "./src/navigations/RootStackNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import * as Font from "expo-font";
import ActivityIndicatorCard from "./src/library/components/ActivityIndicatorCard";
import { SafeAreaProvider } from "react-native-safe-area-context";

const getFonts = () =>
  Font.loadAsync({
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    "lato-regular": require("./assets/fonts/Lato-Regular.ttf"),
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
      <SafeAreaProvider>
        <ThemeProvider>
          <PaperProvider>
            <RootStackNavigator />
          </PaperProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
