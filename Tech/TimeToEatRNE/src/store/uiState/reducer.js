import Immutable from "seamless-immutable";
import { getDateKey, getDateFromKey, createDayAndNodes } from "../../utils";
import { _getDayById, DAY_AND_NODES_ADDED } from "../reducer";
import { getPlanDayByDayId } from "../plan/reducer";

// Action Types
export const DAY_SELECTED = "day_selected";
export const WATER_TRACKING_TOGGLED = "water_tracking_toggled";
export const NOTIFICATIONS_TOGGLED = "notifications_toggled";

// Actions
export const selectDay = (dayId = getDateKey()) => {
  return function(dispatch, getState) {
    // check for existing day
    if (_getDayById(getState(), dayId) === undefined) {
      // create the day and dispatch the DAY_AND_NODES_ADDED action
      const planDay = getPlanDayByDayId(getState().plan, dayId);
      const dayAndNodes = createDayAndNodes(dayId, planDay);
      dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
    }
    // once day is created, dispatch the DAY_SELECTED
    dispatch({ type: DAY_SELECTED, dayId });
  };
};

export const toggleWaterTracking = trackingState => {
  return { type: WATER_TRACKING_TOGGLED, trackingState };
};

export const toggleNotifications = notificationState => {
  return { type: NOTIFICATIONS_TOGGLED, notificationState };
};

// Reducer
const initialState = Immutable({
  selectedDayId: null,
  waterTracking: true,
  notifications: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_SELECTED:
      return Immutable({ ...state, selectedDayId: action.dayId });
    case WATER_TRACKING_TOGGLED:
      return Immutable({ ...state, waterTracking: action.trackingState });
    case NOTIFICATIONS_TOGGLED:
      return Immutable({ ...state, notifications: action.notificationState });
    default:
      return state;
  }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId || getDateKey();
export const getWaterTrackingState = state => state.waterTracking;
export const getNotificationsState = state => state.notifications;
