import { createStore } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const savedState = JSON.stringify(loadState());
        const serializedState = JSON.stringify(state);
        if (savedState !== serializedState) {
            localStorage.setItem('state', serializedState);
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
      savedState,
      applyMiddleware(thunk)
    );
    // subscribe to save
    store.subscribe(() => {
        saveState(store.getState());
    });
    // plan.ensureDaysAndNodes() is created (MapScreen will load today by default)
    return store;
};

export default configureStore;
