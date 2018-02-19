import Immutable from "seamless-immutable";

import { DAY_AND_NODES_ADDED } from "./reducer";
import * as uiStateFixtures from "./uiState/fixtures";
import defaultPlan from "./plan/defaultPlan";
import * as daysFixtures from "./days/fixtures";
import * as nodesFixtures from "./nodes/fixtures";
import { PLAN } from "./nodes/reducer";

import { getDateKey } from "../utils";

export const expectedInitialState = Immutable({
  uiState: uiStateFixtures.expectedInitialState,
  plan: defaultPlan,
  days: daysFixtures.expectedInitialState,
  // nodes: nodes.expectedInitialState
});

export const stateWithDay = Immutable({
  days: daysFixtures.stateWithDay,
});

export const expectedMondayDayAndNodesAddedAction = {
  type: DAY_AND_NODES_ADDED,
  dayAndNodes: {
    day: daysFixtures.expectedDayMonday,
    nodes: nodesFixtures.expectedNodesMonday,
  },
};

export const stateWithMonday = {
  days: daysFixtures.expectedInitialStateWithMonday,
  nodes: nodesFixtures.expectedInitialStateWithMonday,
};

const today = getDateKey();
const todayBreakfast = `${today}_0`;
const todayLunch = `${today}_1`;
const todayState = {
  days: { daysById: {} },
  nodes: { nodesById: {} },
};
todayState.days.daysById[today] = {
  id: today,
  nodeIds: [todayBreakfast, todayLunch],
};
todayState.nodes.nodesById[todayBreakfast] = {
  id: todayBreakfast,
  type: PLAN,
  name: "bfast",
};
todayState.nodes.nodesById[todayLunch] = {
  id: todayLunch,
  type: PLAN,
  name: "lunch",
};
export const stateWithToday = todayState;
