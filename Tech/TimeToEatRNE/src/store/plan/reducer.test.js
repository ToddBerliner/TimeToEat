import Immutable from "seamless-immutable";
import { Selector, Reducer, Thunk } from "redux-testkit";
import plan, { editMeal, getPlanDayByDayId, MEAL_EDITED } from "./reducer";
import { dateKeyWednesday } from "../days/fixtures";
import {
  expectedInitialState,
  expectedPlanDayWednesday,
  mealEditedAction,
} from "./fixtures";
import { expectedNodeUpdatedAction } from "../nodes/fixtures";
import { stateWithMonday, stateWithToday } from "../fixtures";

describe("plan Actions", () => {
  it("shoudl return thunk with MEAL_EDITED and NODE_UPDATED actions", () => {
    const dispatches = Thunk(editMeal)
      .withState(stateWithToday)
      .execute(1, "name", "Foofast");
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual(mealEditedAction);
    expect(dispatches[1].getAction()).toEqual(expectedNodeUpdatedAction);
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
});

describe("plan Selectors", () => {
  it("should return a plan day from a dayId", () => {
    Selector(getPlanDayByDayId)
      .expect(expectedInitialState, dateKeyWednesday)
      .toReturn(expectedPlanDayWednesday);
  });
});
