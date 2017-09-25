import Immutable from 'seamless-immutable';
import { DAY_AND_NODES_ADDED } from '../reducer';

// Action Types
export const WATER_ADDED = 'water_added';
export const WATER_REMOVED = 'water_removed';

// Actions

// Reducer
const initialState = Immutable({
    daysById: {}
});
const day = (state, action) => {
    const key = action.dayAndNodes.day.id;
    const day = action.dayAndNodes.day;
    return {...state, [key]: day}
}
const water = (day, time) => {
    let newCompletes = day.water.completedTimes.asMutable();
    const waterTimeIdx = newCompletes.indexOf(time);
    if (waterTimeIdx === -1) {
        newCompletes.push(time);
    } else {
        newCompletes.splice(waterTimeIdx, 1);
    }
    return {...day, water: {...day.water, completedTimes: newCompletes}}
};

export default function reduce(state = initialState, action = {}){
    const dayId = action.dayId;
    const day = getDayById(state, dayId);
    switch(action.type) {
        case DAY_AND_NODES_ADDED:
            return {...state, daysById: day(state.daysById, action)};
        case WATER_ADDED:
            return {
                ...state, daysById: {
                    ...state.daysById, [dayId]: water(day, action.time)
                }
            };
        case WATER_REMOVED:
            // TODO: change the shape of day - flatten nested water obj
            // into 2 props on the day object
            return {
                ...state, daysById: {
                    ...state.daysById, [dayId]: water(day, action.time)
                }
            };
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
