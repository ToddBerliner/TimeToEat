import Immutable from "seamless-immutable";
import defaultPlan from "./defaultPlan";
import {
  getDow,
  DOW,
  getDateKey,
  getTimestampFromTimeObj,
  getNotificationTimeFromTimeObj,
} from "../../utils";
import {
  _getNodeIdByDayIdAndMealIdx,
  _getMealByMealIdx,
  _getNotificationIdByMealIdx,
} from "../reducer";
import { NODE_UPDATED } from "../nodes/reducer";
import { Notifications } from "expo";
const notificationIcon = require("../../../assets/images/notification_icon.png");

// Action Types & Constants
export const MEAL_EDITED = "meal_edited";
export const NOTIFICATION_UPDATED = "notification_updated";
export const NAME = "name";
export const TIME = "time";
export const TRACKING = "tracking";

// Methods
export function scheduleAllMealNotifications(dispatch, getState) {
  const meals = getMeals(getState().plan);
  meals.forEach((meal, mealIdx) => {
    if (meal.tracking) {
      scheduleMealNotification(mealIdx, meal, dispatch);
    }
  });
}
export function scheduleMealNotification(mealIdx, meal, dispatch) {
  // get meals
  // forEach -> scheduleMeal()
  // meal, dispatch
  const mealNotification = {
    title: meal.name,
    body: "It's Time to Eat!",
    data: {
      title: meal.name,
      message: "It's Time to Eat!",
      icon: notificationIcon,
    },
  };
  const mealNotificationSchedule = {
    time: getNotificationTimeFromTimeObj(meal.time),
    repeat: "day",
  };
  Notifications.scheduleLocalNotificationAsync(
    mealNotification,
    mealNotificationSchedule,
  )
    .then(notificationId => {
      console.log(`Scheduled notification ${notificationId}`);
      dispatch({ type: NOTIFICATION_UPDATED, mealIdx, notificationId });
    })
    .catch(err => console.log(err));
}

// Actions
export const editMeal = (mealIdx, field, value) => {
  return function(dispatch, getState) {
    // check for need to update/cancel a notification
    // if (field === time || field === tracking)
    if (field === TIME || field === TRACKING) {
      // get the meal in the plan
      let meal = _getMealByMealIdx(getState(), mealIdx);
      meal = Immutable.asMutable(meal, { deep: true });
      // get and clear the existing notification
      let notificationId = _getNotificationIdByMealIdx(getState(), mealIdx);
      if (notificationId !== null) {
        Notifications.cancelScheduledNotificationAsync(notificationId);
      }
      // if time && tracking or tracking && tracking, schedule new notification
      if ((field === TIME && meal.tracking) || (field === TRACKING && value)) {
        // schedule notification and distpatch NOTIFICATION_UPDATED action
        if (field === TIME) {
          meal.time = value;
        }
        scheduleMealNotification(mealIdx, meal, dispatch);
      }
      if (field === TRACKING && !value) {
        notificationId = null;
        dispatch({ type: NOTIFICATION_UPDATED, mealIdx, notificationId });
      }
    }
    dispatch({
      type: MEAL_EDITED,
      mealIdx,
      field,
      value,
    });
    // get node id
    const nodeId = _getNodeIdByDayIdAndMealIdx(
      getState(),
      getDateKey(),
      mealIdx,
    );
    if (nodeId) {
      dispatch({
        type: NODE_UPDATED,
        nodeId: nodeId,
        field,
        value,
      });
    }
  };
};

// Reducer
const initialState = Immutable(defaultPlan);

export default function reduce(state = initialState, action = {}) {
  const { mealIdx } = action;
  switch (action.type) {
    case MEAL_EDITED:
      const newState = Immutable.asMutable(state, { deep: true });
      const { field, value } = action;
      DOW.forEach(day => (newState.days[day].nodes[mealIdx][field] = value));
      return Immutable(newState);
    case NOTIFICATION_UPDATED:
      const { notificationId } = action;
      const newNotificationsState = [...state.notifications];
      newNotificationsState[mealIdx] = notificationId;
      return Immutable.set(state, "notifications", newNotificationsState);
    default:
      return state;
  }
}

// Selectors
export const getPlanDayByDayId = (state, dayId) => {
  const dateToGet = new Date(parseInt(dayId, 10));
  const dayOfWeek = getDow(dateToGet.getDay());
  return state.days[dayOfWeek];
};
export const getMealByMealIdx = (state, mealIdx) => {
  return state.days["Monday"].nodes[mealIdx];
};
export const getNotificationIdByMealIdx = (state, mealIdx) => {
  return state.notifications[mealIdx];
};
export const getMeals = state => {
  return state.days["Monday"].nodes;
};
