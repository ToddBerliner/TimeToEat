import Immutable from 'seamless-immutable';
import { DAY_AND_NODES_ADDED, WATER_ADDED,
    WATER_REMOVED } from '../uiState/reducer';

const initialState = Immutable({
    daysById: {}
});

export default function reduce(state = initialState, action = {}){
    switch(action.type) {
        case DAY_AND_NODES_ADDED:
        case WATER_ADDED:
        case WATER_REMOVED:
            return state;
        default:
            return state;
    }
}

// Selectors
export const getDayById = (state, dayId) => {
    return state.daysById[dayId];
}
export const getAllDayIds = (state) => {
    return Object.keys(state.daysById);
}
