import Immutable from "seamless-immutable";
import { Reducer, Selector, Thunk } from "redux-testkit";
import * as uiStateFixtures from "./fixtures";
import * as rootFixtures from "../fixtures";
import * as daysFixtures from "../days/fixtures";
import uiState, {
  DAY_SELECTED,
  WATER_TRACKING_TOGGLED,
  NOTIFICATIONS_TOGGLED,
  ONBOARDING_COMPLETED,
  selectDay,
  getSelectedDayId,
  toggleWaterTracking,
  toggleNotifications,
  completeOnboarding,
  getWaterTrackingState,
  getNotificationsState,
  getOnboardingState,
} from "./reducer";
import { getDateKey } from "../../utils";

const rootState = rootFixtures.expectedInitialState;

describe("uiState Actions", () => {
  // test action if day doesnt exist
  it("should return thunk with ADDED and SELECTED actions", () => {
    const dispatches = Thunk(selectDay)
      .withState(rootFixtures.expectedInitialState)
      .execute(daysFixtures.dateKeyMonday);
    // expect 2 dispatches - DAY_AND_NODES_ADDED & DAY_SELECTED
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual(
      rootFixtures.expectedMondayDayAndNodesAddedAction,
    );
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual(
      uiStateFixtures.expectedMondaySelectedAction,
    );
  });
  // test action if day exists
  it("should dispatch the day selected action with the dayId", () => {
    const dispatches = Thunk(selectDay)
      .withState(rootFixtures.stateWithDay)
      .execute("123");
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual(
      uiStateFixtures.expectedSampleDaySelected,
    );
  });
  it(
    ("should dispatch the water toggled action",
    () => {
      const waterTrackingState = false;
      const expectedToggleWaterTrackingAction = {
        type: WATER_TRACKING_TOGGLED,
        trackingState: waterTrackingState,
      };
      expect(toggleWaterTracking(waterTrackingState)).toEqual(
        expectedToggleWaterTrackingAction,
      );
    }),
  );
  it("should return thunk with the notification toggled action", () => {
    const notificationState = false;
    const expectedToggleNotificationAction = {
      type: NOTIFICATIONS_TOGGLED,
      notificationState: notificationState,
    };
    const dispatches = Thunk(toggleNotifications)
      .withState(rootFixtures.expectedInitialState)
      .execute(notificationState);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual(expectedToggleNotificationAction);
  });
  it("should dispatch the onboardingComplete action", () => {
    expect(completeOnboarding()).toEqual({ type: ONBOARDING_COMPLETED });
  });
});

describe("uiState Selectors", () => {
  it("should return the current day id if no day is selected", () => {
    Selector(getSelectedDayId)
      .expect(uiStateFixtures.expectedInitialState)
      .toReturn(getDateKey());
  });
  const selectedDayState = uiStateFixtures.expectedInitialState.set(
    "selectedDayId",
    "123",
  );
  it("should return a dayId if one is selected", () => {
    Selector(getSelectedDayId)
      .expect(selectedDayState)
      .toReturn("123");
  });
  it("should return true if water tracking is on", () => {
    Selector(getWaterTrackingState)
      .expect(uiStateFixtures.expectedInitialState)
      .toReturn(true);
  });
  it("should return flase if notifications are off", () => {
    Selector(getNotificationsState)
      .expect(uiStateFixtures.expectedInitialState)
      .toReturn(false);
  });
  it("should return false if onboarding is not complete", () => {
    Selector(getOnboardingState)
      .expect(uiStateFixtures.expectedInitialState)
      .toReturn(false);
  });
});

describe("uiState Reducer", () => {
  it("should have default state", () => {
    expect(uiState()).toEqual(uiStateFixtures.expectedInitialState);
  });
  it("should ignore uninteresting action types", () => {
    Reducer(uiState)
      .expect({ type: "INTERESTED_NOT" })
      .toReturnState(uiStateFixtures.expectedInitialState);
  });
  it("should return new state with selectedDay set", () => {
    const dayId = "123";
    const expectedState = {
      selectedDayId: "123",
      waterTracking: true,
      notifications: false,
      onboardingComplete: false,
    };
    Reducer(uiState)
      .expect({ type: DAY_SELECTED, dayId })
      .toReturnState(expectedState);
  });
  it("should return new state with water tracking off", () => {
    const expectedState = {
      selectedDayId: null,
      waterTracking: false,
      notifications: false,
      onboardingComplete: false,
    };
    Reducer(uiState)
      .expect({ type: WATER_TRACKING_TOGGLED, trackingState: false })
      .toReturnState(expectedState);
  });
  it("should return new state with onboardingComplete true", () => {
    const expectedState = {
      selectedDayId: null,
      waterTracking: true,
      notifications: false,
      onboardingComplete: true,
    };
    Reducer(uiState)
      .expect({ type: ONBOARDING_COMPLETED })
      .toReturnState(expectedState);
  });
});
