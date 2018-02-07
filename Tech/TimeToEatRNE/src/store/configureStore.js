import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { _ensureDaysAndNodes, _getLastDayId } from "./reducer";
import { selectDay } from "./uiState/reducer";
import thunk from "redux-thunk";
import Immutable from "seamless-immutable";
import { AsyncStorage } from "react-native";

export const clearSavedState = async () => {
  try {
    await AsyncStorage.removeItem("@state");
    console.log("State cleared");
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
  // create the store
  let store = null;
  if (savedState !== undefined) {
    store = createStore(
      rootReducer,
      Immutable(savedState),
      applyMiddleware(thunk),
    );
  } else {
    console.log("Null savedState, creating fresh store.");
    store = createStore(rootReducer, applyMiddleware(thunk));
  }
  // subscribe to save
  store.subscribe(() => {
    saveState(store.getState());
  });
  // ensure the store is up to date
  const lastDayId = _getLastDayId(store.getState());
  store.dispatch(_ensureDaysAndNodes(lastDayId));
  // ensure today is selected
  store.dispatch(selectDay());
  return store;
};

export default configureStore;
