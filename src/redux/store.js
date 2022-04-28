import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import rootReducer from './rootReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const composeStoreWithMiddleware = applyMiddleware(
  promise,
  thunk, 
  logger
)


const store = createStore(rootReducer, composeWithDevTools(composeStoreWithMiddleware));

export default store;