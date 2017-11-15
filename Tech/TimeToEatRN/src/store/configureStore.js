import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { _ensureDaysAndNodes, _getLastDayId } from "./reducer";
import thunk from "redux-thunk";
import Immutable from "seamless-immutable";
import { AsyncStorage } from "react-native";

export const clearSavedState = async () => {
  try {
    await AsyncStorage.removeItem("@state");
    return true;
  } catch (err) {
    console.log("Err clearing saved state:", err);
    return false;
  }
};

export const getSavedState = () => {
  return AsyncStorage.getItem("@state")
    .then(state => {
      if (state === null) {
        return undefined;
      }
      return JSON.parse(state);
    })
    .catch(err => {
      console.log("Err getting saved state:", err);
      return undefined;
    });
};

export const saveState = async state => {
  try {
    await AsyncStorage.setItem("@state", JSON.stringify(state));
  } catch (err) {
    console.log("Err trying to save state:", err);
  }
};

export const configureStore = (savedState = undefined) => {
  // add chrome dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  // create the store
  let store = null;
  if (savedState !== undefined) {
    store = createStore(rootReducer, Immutable(savedState), enhancer);
  } else {
    console.log("Null savedState, creating fresh store.");
    store = createStore(rootReducer, enhancer);
  }
  // subscribe to save
  store.subscribe(() => {
    saveState(store.getState());
  });
  // ensure the store is up to date
  const lastDayId = _getLastDayId(store.getState());
  store.dispatch(_ensureDaysAndNodes(lastDayId));
  return store;
};

export default configureStore;
