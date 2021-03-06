import Immutable from "seamless-immutable";
import { Reducer, Selector, Thunk } from "redux-testkit";
import * as uiStateFixtures from "./fixtures";
import * as rootFixtures from "../fixtures";
import * as daysFixtures from "../days/fixtures";
import uiState, { DAY_SELECTED, selectDay, getSelectedDayId } from "./reducer";
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
      rootFixtures.expectedMondayDayAndNodesAddedAction
    );
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual(
      uiStateFixtures.expectedMondaySelectedAction
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
      uiStateFixtures.expectedSampleDaySelected
    );
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
    "123"
  );
  it("should return a dayId if one is selected", () => {
    Selector(getSelectedDayId)
      .expect(selectedDayState)
      .toReturn("123");
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
      selectedDayId: "123"
    };
    Reducer(uiState)
      .expect({ type: DAY_SELECTED, dayId })
      .toReturnState(expectedState);
  });
});
