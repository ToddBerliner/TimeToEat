import Immutable from "seamless-immutable";
import { Selector, Reducer } from "redux-testkit";
import plan, { getPlanDayByDayId, MEAL_EDITED } from "./reducer";
import { dateKeyWednesday } from "../days/fixtures";
import { expectedInitialState, expectedPlanDayWednesday } from "./fixtures";

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
});

describe("plan Selectors", () => {
  it("should return a plan day from a dayId", () => {
    Selector(getPlanDayByDayId)
      .expect(expectedInitialState, dateKeyWednesday)
      .toReturn(expectedPlanDayWednesday);
  });
});
