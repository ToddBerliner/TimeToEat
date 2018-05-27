import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { _ensureDaysAndNodes, _getLastDayId } from "./reducer";
import { selectDay } from "./uiState/reducer";
import thunk from "redux-thunk";
import Immutable from "seamless-immutable";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

export const clearSavedState = async () => {
  try {
    await AsyncStorage.removeItem("@state");
    await Notifications.cancelAllScheduledNotificationsAsync();
    return true;
  } catch (err) {
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
      return undefined;
    });
};

export const saveState = async state => {
  try {
    await AsyncStorage.setItem("@state", JSON.stringify(state));
  } catch (err) {}
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
