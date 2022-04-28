import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./rootReducer";

let composeStoreWithMiddleware = applyMiddleware(promise, thunk, logger);

// if (__DEV__) {
//   composeStoreWithMiddleware =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
//     composeWithDevTools(applyMiddleware(promise, thunk, logger));
// }

const store = createStore(
  rootReducer,
  composeWithDevTools(composeStoreWithMiddleware)
);

export default store;
