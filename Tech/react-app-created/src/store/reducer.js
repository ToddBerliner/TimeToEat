import { combineReducers } from "redux";
import {
    getDateKey,
    getDayIdsBetweenDayIds,
    createDayAndNodes
} from "../utils";
import uiState, { getSelectedDayId } from "./uiState/reducer";
import plan, { getPlanDayByDayId } from "./plan/reducer";
import days, { getDayById, getLastDayId } from "./days/reducer";
import nodes, { getNodesByIds } from "./nodes/reducer";

// Action Types
export const NOOP = "noop";
export const DAY_AND_NODES_ADDED = "day_added";

// Actions
export const _ensureDaysAndNodes = (
    sinceDayId,
    throughDayId = getDateKey()
) => {
    let dayIdsToCreate = [];
    // if sinceDayId is undefined, assume store is empty and create today
    if (typeof sinceDayId === "undefined") {
        dayIdsToCreate = [throughDayId];
    } else if (sinceDayId < throughDayId) {
        dayIdsToCreate = getDayIdsBetweenDayIds(sinceDayId, throughDayId);
    }
    if (dayIdsToCreate.length > 0) {
        return function(dispatch, getState) {
            // iterate over dayIdsToCreate, create the payload and dispatch the action
            for (var dayId of dayIdsToCreate) {
                if (typeof _getDayById(getState(), dayId) === "undefined") {
                    const planDay = getPlanDayByDayId(getState().plan, dayId);
                    const dayAndNodes = createDayAndNodes(dayId, planDay);
                    dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
                }
            }
        };
    } else {
        return { type: NOOP };
    }
};

// Reducers
const store = combineReducers({
    uiState,
    plan, // call plan(state.plan, action);
    days, // call days(state.daysById, action);
    nodes // call nodes(state.nodesById, action);
});
export default store;

// Selectors
export const _getDayById = (state, dayId) => {
    return getDayById(state.days, dayId);
};
export const _getLastDayId = state => {
    return getLastDayId(state.days);
};
export const _getSelectedDayId = state => {
    return getSelectedDayId(state.uiState);
};
export const _getNodesByIds = (state, nodeIdsArr) => {
    return getNodesByIds(state.nodes, nodeIdsArr);
};
