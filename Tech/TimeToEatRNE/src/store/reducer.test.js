import { Selector, Thunk } from "redux-testkit";
import {
  _ensureDaysAndNodes,
  _getDayById,
  _getNodeIdByDayIdAndMealIdx,
  _getNotificationsState,
  _getMealByMealIdx,
  _getNotificationIdByMealIdx,
} from "./reducer";
import * as rootFixtures from "./fixtures";
import * as uiStateFixtures from "./uiState/fixtures";
import defaultPlan from "./plan/defaultPlan";
import * as daysFixtures from "./days/fixtures";
import * as nodesFixtures from "./nodes/fixtures";
import * as planFixtures from "./plan/fixtures";

describe("root Actions", () => {
  it("should dispatch the DAY_AND_NODES_ADDED for each dayId", () => {
    // call action with 3 days to create
    const dispatches = Thunk(_ensureDaysAndNodes)
      .withState(rootFixtures.expectedInitialState)
      .execute(daysFixtures.dateKeySunday, daysFixtures.dateKeyWednesday);
    // expect 3 dispatches
    expect(dispatches.length).toBe(3);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual(
      rootFixtures.expectedMondayDayAndNodesAddedAction,
    );
  });
  it("should dispatch the DAY_AND_NODES_ADDED action with weight", () => {
    const dispatches = Thunk(_ensureDaysAndNodes)
      .withState(rootFixtures.stateWithWeight)
      .execute(daysFixtures.dateKeyMonday, daysFixtures.dateKeyTuesday);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual(
      rootFixtures.expectedTuesdayDayAndNodesAddedAction,
    );
  });
});

describe("root Selectors", () => {
  it("should return undefined if selected day doesn't exist", () => {
    Selector(_getDayById)
      .expect(rootFixtures.expectedInitialState, "abc")
      .toReturn(undefined);
  });
  it("should return the selected day for the given dayId", () => {
    Selector(_getDayById)
      .expect(rootFixtures.stateWithDay, "123")
      .toReturn(daysFixtures.sampleDay);
  });
  it("should return the nodeId for a dateKey and mealIdx", () => {
    Selector(_getNodeIdByDayIdAndMealIdx)
      .expect(rootFixtures.stateWithMonday, daysFixtures.dateKeyMonday, 0)
      .toReturn(daysFixtures.mealKeyMonday);
  });
  it("should return the notificaiton state", () => {
    Selector(_getNotificationsState)
      .expect(rootFixtures.expectedInitialState)
      .toReturn(false);
  });
  it("shoudl return the meal for a given mealIdx", () => {
    Selector(_getMealByMealIdx)
      .expect(rootFixtures.expectedInitialState, 0)
      .toReturn(planFixtures.expectedMeal0);
  });
  it("should return the notificationId for a given mealIdx", () => {
    Selector(_getNotificationIdByMealIdx)
      .expect(rootFixtures.stateWithNotifications, 1)
      .toReturn("123");
  });
});
