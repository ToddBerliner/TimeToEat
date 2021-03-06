import { combineReducers } from "redux";
import {
  getDateKey,
  getDayIdsBetweenDayIds,
  createDayAndNodes,
} from "../utils";
import uiState, {
  getSelectedDayId,
  getWaterTrackingState,
  getWeightTrackingState,
  getNotificationsState,
  getIntroReadState,
  getScheme,
} from "./uiState/reducer";
import plan, {
  getPlanDayByDayId,
  getMealByMealIdx,
  getNotificationIdByMealIdx,
} from "./plan/reducer";
import days, { getDayById, getLastDayId } from "./days/reducer";
import nodes, { getNodesByIds, PLAN } from "./nodes/reducer";
import { AppNavigator } from "../navigators/AppNavigator";
import { NavigationActions } from "react-navigation";
import MapScreen from "../containers/MapScreen";
import MenuScreen from "../containers/MenuScreen";
import MetricsScreen from "../containers/MetricsScreen";
import Immutable from "seamless-immutable";

// Action Types
export const NOOP = "noop";
export const DAY_AND_NODES_ADDED = "day_added";

// Actions
export const _ensureDaysAndNodes = (
  sinceDayId,
  throughDayId = getDateKey(),
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
      // get sinceDay weight
      const sinceDay = _getDayById(getState(), sinceDayId);
      const prevWeight = typeof sinceDay === "undefined" ? 0 : sinceDay.weight;
      // iterate over dayIdsToCreate, create the payload and dispatch the action
      for (var dayId of dayIdsToCreate) {
        if (typeof _getDayById(getState(), dayId) === "undefined") {
          const planDay = getPlanDayByDayId(getState().plan, dayId);
          const dayAndNodes = createDayAndNodes(dayId, planDay, prevWeight);
          dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
        }
      }
    };
  } else {
    return { type: NOOP };
  }
};

export const _logState = () => {
  return function(dispatch, getState) {
    console.log(getState());
  };
};

const store = combineReducers({
  uiState, // call uiState(state.plan, action);
  plan, // call plan(state.plan, action);
  days, // call days(state.daysById, action);
  nodes, // call nodes(state.nodesById, action);
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
export const _getWaterTrackingState = state => {
  return getWaterTrackingState(state.uiState);
};
export const _getWeightTrackingState = state => {
  return getWeightTrackingState(state.uiState);
};
export const _getNotificationsState = state => {
  return getNotificationsState(state.uiState);
};
export const _getNodesByIds = (state, nodeIdsArr) => {
  return getNodesByIds(state.nodes, nodeIdsArr);
};
export const _getNodeIdByDayIdAndMealIdx = (state, dayId, mealIdx) => {
  const day = _getDayById(state, dayId);
  if (typeof day === "undefined") return day;
  const nodes = _getNodesByIds(state, day.nodeIds);
  const planNodes = nodes.filter(node => node.type === PLAN);
  return planNodes[mealIdx].id;
};
export const _getMealByMealIdx = (state, mealIdx) => {
  return getMealByMealIdx(state.plan, mealIdx);
};
export const _getNotificationIdByMealIdx = (state, mealIdx) => {
  return getNotificationIdByMealIdx(state.plan, mealIdx);
};
export const _getNotificationStatus = state => {
  return state.uiState.notifications;
};
export const _getScheme = state => {
  return getScheme(state.uiState);
};
