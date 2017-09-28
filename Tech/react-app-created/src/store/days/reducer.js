import Immutable from "seamless-immutable";
import { DAY_AND_NODES_ADDED } from "../reducer";

// Action Types
export const WATER_ADDED = "water_added";
export const WATER_REMOVED = "water_removed";

// Actions
export const tapWater = (dayId, time) => ({
    type: WATER_ADDED,
    dayId,
    time
});
export const tapAndHoldWater = (dayId, time) => ({
    type: WATER_REMOVED,
    dayId,
    time
});

// Reducer
const initialState = Immutable({
    daysById: {}
});
const dayAdd = (daysById, action) => {
    const key = action.dayAndNodes.day.id;
    const day = action.dayAndNodes.day;
    return { ...daysById, [key]: day };
};
const waterAdd = (day, time) => {
    const newCompletes = day.water.completedTimes.asMutable();
    const waterTimeIdx = newCompletes.indexOf(time);
    if (waterTimeIdx === -1) {
        newCompletes.push(time);
        return {
            ...day,
            water: { ...day.water, completedTimes: newCompletes }
        };
    } else {
        return day;
    }
};

const waterRemove = (day, time) => {
    const newCompletes = day.water.completedTimes.asMutable();
    const waterTimeIdx = newCompletes.indexOf(time);
    if (waterTimeIdx > -1) {
        newCompletes.splice(waterTimeIdx, 1);
        return {
            ...day,
            water: { ...day.water, completedTimes: newCompletes }
        };
    } else {
        return day;
    }
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case DAY_AND_NODES_ADDED:
            return { ...state, daysById: dayAdd(state.daysById, action) };
        case WATER_ADDED:
            return {
                ...state,
                daysById: {
                    ...state.daysById,
                    [action.dayId]: waterAdd(
                        getDayById(state, action.dayId),
                        action.time
                    )
                }
            };
        case WATER_REMOVED:
            return {
                ...state,
                daysById: {
                    ...state.daysById,
                    [action.dayId]: waterRemove(
                        getDayById(state, action.dayId),
                        action.time
                    )
                }
            };
        default:
            return state;
    }
}

// Selectors
export const getDayById = (state, dayId) => {
    return state.daysById[dayId];
};
export const getAllDayIds = state => {
    return Object.keys(state.daysById);
};
