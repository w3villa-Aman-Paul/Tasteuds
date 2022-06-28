import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import accountReducer from "./reducers/accountReducer";
import checkoutReducer from "./reducers/checkoutReducer";
import productsReducer from "./reducers/productsReducer";
import taxonsReducer from "./reducers/taxonsReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  checkout: checkoutReducer,
  products: productsReducer,
  taxons: taxonsReducer,
});

export default rootReducer;

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const storeData = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value, getCircularReplacer());
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const removeData = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    console.log(e);
  }

  console.log("Done.");
};
