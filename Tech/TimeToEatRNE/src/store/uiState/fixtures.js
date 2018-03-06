import Immutable from "seamless-immutable";
import { DAY_SELECTED } from "./reducer";
import { dateKeyMonday } from "../days/fixtures";

export const expectedInitialState = Immutable({
  selectedDayId: null,
  waterTracking: true,
  notifications: false,
  onboardingComplete: false,
});

export const expectedSampleDaySelected = {
  type: DAY_SELECTED,
  dayId: "123",
};

export const expectedMondaySelectedAction = {
  type: DAY_SELECTED,
  dayId: dateKeyMonday,
};
