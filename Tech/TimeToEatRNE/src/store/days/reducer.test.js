import Immutable from "seamless-immutable";
import { Reducer, Selector } from "redux-testkit";
import days, {
  getDayById,
  getAllDayIds,
  getLastDayId,
  getFirstDayId,
  getAllDayIdsInOrder,
  WATER_ADDED,
  WATER_REMOVED,
  tapWater,
  tapAndHoldWater,
  editWeight,
} from "./reducer";
import * as daysFixtures from "./fixtures";
import * as nodesFixtures from "../nodes/fixtures";
import { expectedMondayDayAndNodesAddedAction } from "../fixtures";
import { getDateKey } from "../../utils";

describe("days Actions", () => {
  it("should dispatch the water add action", () => {
    expect(tapWater(daysFixtures.dateKeyMonday, "456")).toEqual(
      daysFixtures.expectedWaterAddAction,
    );
  });
  it("should dispatch the water removed action", () => {
    expect(tapAndHoldWater(daysFixtures.dateKeyMonday, "456")).toEqual(
      daysFixtures.expectedWaterRemoveAction,
    );
  });
  it("should dispatch the weight edited action", () => {
    expect(editWeight(daysFixtures.dateKeyMonday, 123)).toEqual(
      daysFixtures.expectedWeightEditedAction,
    );
  });
});

describe("days Reducer", () => {
  // sample state with Monday added
  const expectedSampleStateWithMonday = {
    daysById: {
      "123": Immutable({ id: "123" }),
    },
  };
  expectedSampleStateWithMonday.daysById[daysFixtures.dateKeyMonday] =
    daysFixtures.expectedDayMonday;

  // sample state with monday with water added
  const expectedStateWaterAdded = { daysById: {} };
  expectedStateWaterAdded.daysById[daysFixtures.dateKeyMonday] =
    daysFixtures.expectedDayMondayWithWater;

  it("should have initial state", () => {
    expect(days()).toEqual(daysFixtures.expectedInitialState);
  });
  it("should add a new day to the intial days slice of state", () => {
    Reducer(days)
      .withState(daysFixtures.expectedInitialState)
      .expect(expectedMondayDayAndNodesAddedAction)
      .toReturnState(daysFixtures.expectedInitialStateWithMonday);
  });
  it("should ensure that the added day is an instance of Immutable", () => {
    const stateWithNewDay = Reducer(days)
      .withState(daysFixtures.expectedInitialState)
      .execute(expectedMondayDayAndNodesAddedAction);
  });
  it("should add a new day to a populated days slice of state", () => {
    Reducer(days)
      .withState(daysFixtures.stateWithDay)
      .expect(expectedMondayDayAndNodesAddedAction)
      .toReturnState(expectedSampleStateWithMonday);
  });
  it("should splice a new nodeId into the correct index of day.nodeIds", () => {
    Reducer(days)
      .withState(daysFixtures.expectedInitialStateWithMonday)
      .expect(nodesFixtures.expectedSnackTapAction)
      .toReturnState(daysFixtures.expectedStateWithMondayWithSnack);
  });
  it("should remove a snack nodeId from the day.nodeIds", () => {
    Reducer(days)
      .withState(daysFixtures.expectedStateWithMondayWithSnack)
      .expect(nodesFixtures.expectedSnackNodeUnCheckAction)
      .toReturnState(daysFixtures.expectedInitialStateWithMonday);
  });
  it("should add a timestamp to the completedTimes of the water prop of the day", () => {
    Reducer(days)
      .withState(daysFixtures.expectedInitialStateWithMonday)
      .expect(daysFixtures.expectedWaterAddAction)
      .toReturnState(expectedStateWaterAdded);
  });
  it("should remove a timestamp to the completedTimes of the water prop of the day", () => {
    Reducer(days)
      .withState(expectedStateWaterAdded)
      .expect(daysFixtures.expectedWaterRemoveAction)
      .toReturnState(daysFixtures.expectedInitialStateWithMonday);
  });
  it("should edit the weight for a day", () => {
    Reducer(days)
      .withState(daysFixtures.expectedInitialStateWithMonday)
      .expect(daysFixtures.expectedWeightEditedAction)
      .toReturnState(daysFixtures.stateWithMondayWithWeight);
  });
});

describe("days Selectors", () => {
  it("should return undefined if selected day doesn't exist", () => {
    Selector(getDayById)
      .expect(daysFixtures.expectedInitialState, "abc")
      .toReturn(undefined);
  });
  it("should return the selected day for the given dayId", () => {
    Selector(getDayById)
      .expect(daysFixtures.stateWithDay, "123")
      .toReturn(daysFixtures.sampleDay);
  });
  it("should return and empty array from the initial state which has no days", () => {
    Selector(getAllDayIds)
      .expect(daysFixtures.expectedInitialState)
      .toReturn([]);
  });
  it("should return the keys of the days piece of state which are the dayIds", () => {
    Selector(getAllDayIds)
      .expect(daysFixtures.stateWithDay)
      .toReturn(["123"]);
  });
  it("should return the max date in state", () => {
    const expectedDateKey = getDateKey(new Date(2018, 1, 5));
    Selector(getLastDayId)
      .expect(daysFixtures.stateWithDateKeys)
      .toReturn(expectedDateKey);
  });
  it("should return the minimum date in state", () => {
    const expectedDateKey = getDateKey(new Date(2017, 12, 31));
    Selector(getFirstDayId)
      .expect(daysFixtures.stateWithDateKeys)
      .toReturn(expectedDateKey);
  });
  it("should return a correctly ASC ordered set of dayIds", () => {
    const expectedDayIds = [
      getDateKey(new Date(2018, 1, 1)),
      getDateKey(new Date(2018, 1, 2)),
      getDateKey(new Date(2018, 3, 20)),
    ];
    const daysState = { daysById: {} };
    daysState.daysById[getDateKey(new Date(2018, 3, 20))] = "foo";
    daysState.daysById[getDateKey(new Date(2018, 1, 2))] = "foo";
    daysState.daysById[getDateKey(new Date(2018, 1, 1))] = "foo";
    Selector(getAllDayIdsInOrder)
      .expect(daysState)
      .toReturn(expectedDayIds);
  });
});
