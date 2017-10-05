import { createStore, applyMiddleware } from "redux";
import rootReducer, { _ensureDaysAndNodes, _getLastDayId } from "./reducer";
import thunk from "redux-thunk";
import Immutable from "seamless-immutable";

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
            localStorage.setItem("state", serializedState);
            console.log("saved", state);
        }
    } catch (err) {
        // ignore write error (for now);
    }
};

export const configureStore = () => {
    // check for savedState
    const savedState = loadState();
    // create the store
    const store = createStore(
        rootReducer,
        Immutable(savedState),
        applyMiddleware(thunk)
    );
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
