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
const day = (state, action) => {
    const key = action.dayAndNodes.day.id;
    const day = action.dayAndNodes.day;
    return { ...state, [key]: day };
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
    const dayId = action.dayId;
    const dayObj = getDayById(state, dayId);
    switch (action.type) {
        case DAY_AND_NODES_ADDED:
            return { ...state, daysById: day(state.daysById, action) };
        case WATER_ADDED:
            return {
                ...state,
                daysById: {
                    ...state.daysById,
                    [dayId]: waterAdd(dayObj, action.time)
                }
            };
        case WATER_REMOVED:
            return {
                ...state,
                daysById: {
                    ...state.daysById,
                    [dayId]: waterRemove(dayObj, action.time)
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
