import Immutable from "seamless-immutable";
import { Selector, Reducer, Thunk } from "redux-testkit";
import plan, {
  editMeal,
  getPlanDayByDayId,
  getMealByMealIdx,
  getNotificationIdByMealIdx,
  MEAL_EDITED,
  NOTIFICATION_UPDATED,
} from "./reducer";
import { dateKeyWednesday } from "../days/fixtures";
import {
  expectedInitialState,
  expectedPlanDayWednesday,
  expectedMeal0,
  mealEditedNameAction,
  mealEditedTimeAction,
  mealEditedTrackingAction,
  mealEditedNotificationAction,
  mealEditedNotificationOffAction,
  expectedStateWithNotificationIds,
} from "./fixtures";
import {
  expectedNodeUpdatedAction,
  expectedNodeTimeUpdatedAction,
  expectedNodeTrackingUpdatedAction,
  expectedNodeTrackingOffUpdatedAction,
} from "../nodes/fixtures";
import { stateWithMonday, stateWithToday } from "../fixtures";

describe("plan Actions", () => {
  it("shoudl return thunk 2 actions for name change", () => {
    const dispatches = Thunk(editMeal)
      .withState(stateWithToday)
      .execute(1, "name", "Foofast");
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual(mealEditedNameAction);
    expect(dispatches[1].getAction()).toEqual(expectedNodeUpdatedAction);
  });
  it("should return thunk with 3 actions for time change", () => {
    // must set mealIdx tracking to true
    stateWithToday.plan.days["Monday"].nodes[1].tracking = true;
    const dispatches = Thunk(editMeal)
      .withState(stateWithToday)
      .execute(1, "time", { hours: 0, minutes: 30 });
    expect(dispatches.length).toBe(3);
    expect(dispatches[0].getAction()).toEqual(mealEditedNotificationAction);
    expect(dispatches[1].getAction()).toEqual(mealEditedTimeAction);
    expect(dispatches[2].getAction()).toEqual(expectedNodeTimeUpdatedAction);
  });
  it("should return thunk with 3 actions for tracking change to false", () => {
    const dispatches = Thunk(editMeal)
      .withState(stateWithToday)
      .execute(1, "tracking", false);
    expect(dispatches.length).toBe(3);
    expect(dispatches[0].getAction()).toEqual(mealEditedNotificationOffAction);
    expect(dispatches[1].getAction()).toEqual(mealEditedTrackingAction);
    expect(dispatches[2].getAction()).toEqual(
      expectedNodeTrackingOffUpdatedAction,
    );
  });
});

describe("plan Reducer", () => {
  it("should update the name of a meal", () => {
    // build up expected State
    const expectedState = Immutable.asMutable(expectedInitialState, {
      deep: true,
    });
    for (let day in expectedState.days) {
      expectedState.days[day].nodes[0].name = "Foo";
    }
    Reducer(plan)
      .withState(expectedInitialState)
      .expect({ type: MEAL_EDITED, mealIdx: 0, field: "name", value: "Foo" })
      .toReturnState(expectedState);
  });
  it("should update the time of a meal", () => {
    // build up expected State
    const expectedState = Immutable.asMutable(expectedInitialState, {
      deep: true,
    });
    for (let day in expectedState.days) {
      expectedState.days[day].nodes[0].time = { hours: 0, minutes: 30 };
    }
    Reducer(plan)
      .withState(expectedInitialState)
      .expect({
        type: MEAL_EDITED,
        mealIdx: 0,
        field: "time",
        value: { hours: 0, minutes: 30 },
      })
      .toReturnState(expectedState);
  });
  it("should update the tracking state of a meal", () => {
    // build up expected state
    const expectedState = Immutable.asMutable(expectedInitialState, {
      deep: true,
    });
    for (let day in expectedState.days) {
      expectedState.days[day].nodes[0].tracking = false;
    }
    Reducer(plan)
      .withState(expectedInitialState)
      .expect({
        type: MEAL_EDITED,
        mealIdx: 0,
        field: "tracking",
        value: false,
      })
      .toReturnState(expectedState);
  });
  it("should add set the notification id for a given mealIdx", () => {
    Reducer(plan)
      .withState(expectedInitialState)
      .expect(mealEditedNotificationAction)
      .toReturnState(expectedStateWithNotificationIds);
  });
  it("should remove the notification id for a given mealIdx", () => {
    Reducer(plan)
      .withState(expectedStateWithNotificationIds)
      .expect(mealEditedNotificationOffAction)
      .toReturnState(expectedInitialState);
  });
});

describe("plan Selectors", () => {
  it("should return a plan day from a dayId", () => {
    Selector(getPlanDayByDayId)
      .expect(expectedInitialState, dateKeyWednesday)
      .toReturn(expectedPlanDayWednesday);
  });
  it("should retun a meal from a mealIdx", () => {
    Selector(getMealByMealIdx)
      .expect(expectedInitialState, 0)
      .toReturn(expectedMeal0);
  });
  it("should return a notification id for a mealIdx", () => {
    // add a getNotificationId
    const expectedInitialStateWithNotifications = Immutable.set(
      expectedInitialState,
      "notifications",
      [null, "123"],
    );
    Selector(getNotificationIdByMealIdx)
      .expect(expectedInitialStateWithNotifications, 1)
      .toReturn("123");
  });
});
