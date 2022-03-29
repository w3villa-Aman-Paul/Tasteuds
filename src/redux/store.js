import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import rootReducer from './rootReducer'
import AsyncStorage from '@react-native-community/async-storage';

const composeStoreWithMiddleware = applyMiddleware(
  promise,
  thunk, 
  logger
)


const store = createStore(rootReducer, composeStoreWithMiddleware);

export default store;