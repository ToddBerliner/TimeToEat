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

// Action Types & Constants
export const MEAL_EDITED = "meal_edited";
export const NOTIFICATION_UPDATED = "notification_updated";
export const NAME = "name";
export const TIME = "time";
export const TRACKING = "tracking";

// Actions
export const editMeal = (mealIdx, field, value) => {
  return function(dispatch, getState) {
    // check for need to update/cancel a notification
    // if (field === time || field === tracking)
    if (field === TIME || field === TRACKING) {
      // get the meal in the plan
      const meal = _getMealByMealIdx(getState(), mealIdx);
      // if time && tracking = true
      if ((field === TIME && meal.tracking) || (field === TRACKING && value)) {
        // schedule notification and distpatch NOTIFICATION_UPDATED action
        const time =
          field === TIME
            ? getNotificationTimeFromTimeObj(value)
            : getNotificationTimeFromTimeObj(meal.time);
        const mealNotification = {
          title: meal.name,
          body: "It's Time to Eat!",
        };
        const mealNotificationSchedule = {
          time: time,
          repeat: "day",
        };
        Notifications.scheduleLocalNotificationAsync(
          mealNotification,
          mealNotificationSchedule,
        )
          .then(notificationId => {
            console.log(`Got notification id ${notificationId}`);
            dispatch({ type: NOTIFICATION_UPDATED, mealIdx, notificationId });
          })
          .catch(err => console.log(err));
      }
      if (field === TRACKING && !value) {
        // cancel notification and dispatch NOTIFICATION_UPDATED action
        let notificationId = _getNotificationIdByMealIdx(getState(), mealIdx);
        console.log(`should clear ${notificationId}`);
        Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log(`Cleared notificaiton ${notificationId}`);
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
