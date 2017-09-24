import { combineReducers } from 'redux';
import { getDateKey, getDayIdsBetweenDayIds, getDow,
    createDayAndNodes } from '../utils';
import uiState from './uiState/reducer';
import plan, { getPlanDayByDayId } from './plan/reducer';
import days, { getDayById, getDayKeys } from './days/reducer';
import nodes from './nodes/reducer';

// Action Types
export const DAY_AND_NODES_ADDED = 'day_added';

// Actions
export const _ensureDaysAndNodes = (sinceDayId, throughDayId = getDateKey()) => {
    const dayIdsToCreate = getDayIdsBetweenDayIds(sinceDayId, throughDayId);
    if (dayIdsToCreate.length > 0) {
        return function(dispatch, getState) {
            const dayAndNodesPayloads = [];
            // map over dayIdsToCreate, create the payload and dispatch the action
            dayIdsToCreate.map((dayId) => {
                const planDay = getPlanDayByDayId(getState().plan, dayId);
                const dayAndNodes = createDayAndNodes(dayId, planDay);
                dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
            });
        }
    }
}

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
}
