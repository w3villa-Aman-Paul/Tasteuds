import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTransform } from "redux-persist";
import Flatted from "flatted";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import reducer from "./rootReducer";

let composeStoreWithMiddleware = applyMiddleware(promise, thunk, logger);

export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState)
);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(composeStoreWithMiddleware)
);

export const persistor = persistStore(store);
export default store;
