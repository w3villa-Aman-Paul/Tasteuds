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

export const storeData = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeData = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};
