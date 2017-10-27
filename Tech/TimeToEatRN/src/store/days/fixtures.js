import Immutable from "seamless-immutable";
import { WATER_ADDED, WATER_REMOVED } from "./reducer";
import defaultPlan from "../plan/defaultPlan";
import { getDateKey } from "../../utils";

export const expectedInitialState = Immutable({
  daysById: {}
});
export const sampleDay = Immutable({
  id: "123"
});
export const stateWithDay = Immutable({
  daysById: {
    "123": sampleDay
  }
});
export const planDayMonday = Immutable(defaultPlan.days.Monday);
export const dateKeySunday = getDateKey(new Date(2017, 1, 5));
export const dateKeyMonday = getDateKey(new Date(2017, 1, 6));
export const dateKeyWednesday = getDateKey(new Date(2017, 1, 8));
export const expectedWaterAddAction = {
  type: WATER_ADDED,
  dayId: dateKeyMonday,
  time: "456"
};
export const expectedWaterRemoveAction = {
  type: WATER_REMOVED,
  dayId: dateKeyMonday
};
export const expectedDayMonday = Immutable({
  id: dateKeyMonday,
  water: {
    completedTimes: [],
    target: 8
  },
  nodeIds: [
    "1486368000000_1486393200000",
    "1486368000000_1486402200000",
    "1486368000000_1486413000000",
    "1486368000000_1486422000000",
    "1486368000000_1486432800000"
  ],
  offPlanNodeIds: []
});
export const expectedDayMondayWithWater = Immutable({
  id: dateKeyMonday,
  water: {
    completedTimes: ["456"],
    target: 8
  },
  nodeIds: [
    "1486368000000_1486393200000",
    "1486368000000_1486402200000",
    "1486368000000_1486413000000",
    "1486368000000_1486422000000",
    "1486368000000_1486432800000"
  ],
  offPlanNodeIds: []
});
