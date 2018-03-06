import Immutable from "seamless-immutable";
import { getDateKey, getDateFromKey, createDayAndNodes } from "../../utils";
import { _getDayById, DAY_AND_NODES_ADDED } from "../reducer";
import {
  getPlanDayByDayId,
  scheduleAllMealNotifications,
} from "../plan/reducer";
import { Notifications } from "expo";

// Action Types
export const DAY_SELECTED = "day_selected";
export const WATER_TRACKING_TOGGLED = "water_tracking_toggled";
export const NOTIFICATIONS_TOGGLED = "notifications_toggled";
export const ONBOARDING_COMPLETED = "onboarding_completed";

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
  return function(dispatch, getState) {
    if (notificationState) {
      // schedule all notifications
      scheduleAllMealNotifications(dispatch, getState);
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
    dispatch({ type: NOTIFICATIONS_TOGGLED, notificationState });
  };
};

export const completeOnboarding = () => {
  return { type: ONBOARDING_COMPLETED };
};

// Reducer
const initialState = Immutable({
  selectedDayId: null,
  waterTracking: true,
  notifications: false,
  onboardingComplete: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_SELECTED:
      return Immutable({ ...state, selectedDayId: action.dayId });
    case WATER_TRACKING_TOGGLED:
      return Immutable({ ...state, waterTracking: action.trackingState });
    case NOTIFICATIONS_TOGGLED:
      return Immutable({ ...state, notifications: action.notificationState });
    case ONBOARDING_COMPLETED:
      return Immutable({
        ...state,
        onboardingComplete: !state.onboardingComplete,
      });
    default:
      return state;
  }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId || getDateKey();
export const getWaterTrackingState = state => state.waterTracking;
export const getNotificationsState = state => state.notifications;
export const getOnboardingState = state => state.onboardingComplete;
