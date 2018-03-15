import Immutable from "seamless-immutable";
import { DAY_SELECTED, NOTIFICATIONS_TOGGLED } from "./reducer";
import { dateKeyMonday } from "../days/fixtures";

export const expectedInitialState = Immutable({
  selectedDayId: null,
  waterTracking: true,
  notifications: false,
  onboardingComplete: false,
});

export const expectedInitialStateNotificationsOn = Immutable.set(
  expectedInitialState,
  "notifications",
  true,
);

export const expectedSampleDaySelected = {
  type: DAY_SELECTED,
  dayId: "123",
};

export const expectedMondaySelectedAction = {
  type: DAY_SELECTED,
  dayId: dateKeyMonday,
};

export const expectedToggleNotificationOffAction = {
  type: NOTIFICATIONS_TOGGLED,
  notificationState: false,
};

export const expectedToggleNotificationOnAction = {
  type: NOTIFICATIONS_TOGGLED,
  notificationState: true,
};
