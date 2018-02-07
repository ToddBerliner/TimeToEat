import Immutable from "seamless-immutable";

import { DAY_AND_NODES_ADDED } from "./reducer";
import * as uiStateFixtures from "./uiState/fixtures";
import defaultPlan from "./plan/defaultPlan";
import * as daysFixtures from "./days/fixtures";
import * as nodesFixtures from "./nodes/fixtures";

export const expectedInitialState = Immutable({
  uiState: uiStateFixtures.expectedInitialState,
  plan: defaultPlan,
  days: daysFixtures.expectedInitialState
  // nodes: nodes.expectedInitialState
});

export const stateWithDay = Immutable({
  days: daysFixtures.stateWithDay
});

export const expectedMondayDayAndNodesAddedAction = {
  type: DAY_AND_NODES_ADDED,
  dayAndNodes: {
    day: daysFixtures.expectedDayMonday,
    nodes: nodesFixtures.expectedNodesMonday
  }
};
