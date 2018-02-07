import { Selector } from "redux-testkit";
import { getPlanDayByDayId } from "./reducer";
import { dateKeyWednesday } from "../days/fixtures";
import { expectedInitialState, expectedPlanDayWednesday } from "./fixtures";

describe("plan Selectors", () => {
  it("should return a plan day from a dayId", () => {
    Selector(getPlanDayByDayId)
      .expect(expectedInitialState, dateKeyWednesday)
      .toReturn(expectedPlanDayWednesday);
  });
});
