import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { _ensureDaysAndNodes, _getLastDayId } from "./reducer";
import thunk from "redux-thunk";
import Immutable from "seamless-immutable";
import { AsyncStorage } from "react-native";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const savedState = JSON.stringify(loadState());
    const serializedState = JSON.stringify(state);
    if (savedState !== serializedState) {
      AsyncStorage.setItem("state", serializedState, error => {
        if (error === null) {
          AsyncStorage.getItem("state", (error, result) => {
            if (error === null) {
              console.log("Result: ", JSON.parse(result));
            } else {
              console.log("Get Error: ", error);
            }
          });
        } else {
          console.log("Set Error: ", error);
        }
      });
    }
  } catch (err) {
    // ignore write error (for now);
    console.log("Save State Error: ", err);
  }
};

export const configureStore = () => {
  // check for savedState
  const savedState = loadState();
  // add chrome dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  // create the store
  const store = createStore(rootReducer, Immutable(savedState), enhancer);
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
