import Immutable from 'seamless-immutable';
import { DAY_SELECTED } from '../uiState/reducer';

const initialState = Immutable({
    nodesById: {}
});

export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case DAY_SELECTED:
            console.log('nodes DAY_SELECTED');
            return state;
        default:
            return state;
    }
}

// Utilities

// Selectors
