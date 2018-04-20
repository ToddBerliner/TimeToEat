import Immutable from "seamless-immutable";
import {
  getDateKey,
  getDateFromKey,
  getAdjacentDateKey,
  createDayAndNodes,
  PREV,
} from "../../utils";
import { _getDayById, DAY_AND_NODES_ADDED } from "../reducer";
import {
  getPlanDayByDayId,
  scheduleAllMealNotifications,
} from "../plan/reducer";
import { Notifications } from "expo";

// Action Types
export const DAY_SELECTED = "day_selected";
export const WATER_TRACKING_TOGGLED = "water_tracking_toggled";
export const WEIGHT_TRACKING_TOGGLED = "weight_tracking_toggled";
export const NOTIFICATIONS_TOGGLED = "notifications_toggled";
export const ONBOARDING_COMPLETED = "onboarding_completed";
export const INTRO_READ = "intro_read";

// Actions
export const selectDay = (dayId = getDateKey()) => {
  return function(dispatch, getState) {
    // check for existing day
    if (_getDayById(getState(), dayId) === undefined) {
      // create the day and dispatch the DAY_AND_NODES_ADDED action
      const planDay = getPlanDayByDayId(getState().plan, dayId);
      // check for previous day
      const prevDay = _getDayById(getState(), getAdjacentDateKey(dayId, PREV));
      const prevWeight = prevDay ? prevDay.weight : undefined;
      const dayAndNodes = createDayAndNodes(dayId, planDay, prevWeight);
      dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
    }
    // once day is created, dispatch the DAY_SELECTED
    dispatch({ type: DAY_SELECTED, dayId });
  };
};

export const toggleWaterTracking = trackingState => {
  return { type: WATER_TRACKING_TOGGLED, trackingState };
};

export const toggleWeightTracking = trackingState => {
  return { type: WEIGHT_TRACKING_TOGGLED, trackingState };
};

export const toggleNotifications = notificationState => {
  return function(dispatch, getState) {
    if (notificationState) {
      // schedule all notifications
      scheduleAllMealNotifications(dispatch, getState);
    } else {
      console.log("Cancelling all notifications");
      Notifications.cancelAllScheduledNotificationsAsync();
    }
    dispatch({ type: NOTIFICATIONS_TOGGLED, notificationState });
  };
};

export const completeOnboarding = () => {
  return { type: ONBOARDING_COMPLETED };
};

export const readIntro = (read = true) => {
  return { type: INTRO_READ, read };
};

// Reducer
const initialState = Immutable({
  selectedDayId: null,
  waterTracking: true,
  weightTracking: true,
  notifications: false,
  onboardingComplete: false,
  introRead: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_SELECTED:
      return Immutable({ ...state, selectedDayId: action.dayId });
    case WATER_TRACKING_TOGGLED:
      return Immutable({ ...state, waterTracking: action.trackingState });
    case WEIGHT_TRACKING_TOGGLED:
      return Immutable({ ...state, weightTracking: action.trackingState });
    case NOTIFICATIONS_TOGGLED:
      return Immutable({ ...state, notifications: action.notificationState });
    case ONBOARDING_COMPLETED:
      return Immutable({
        ...state,
        onboardingComplete: !state.onboardingComplete,
      });
    case INTRO_READ:
      return Immutable.set(state, ["introRead"], action.read);
    default:
      return state;
  }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId || getDateKey();
export const getWaterTrackingState = state => state.waterTracking;
export const getWeightTrackingState = state => state.weightTracking;
export const getNotificationsState = state => state.notifications;
export const getOnboardingState = state => state.onboardingComplete;
export const getIntroReadState = state => state.introRead;
