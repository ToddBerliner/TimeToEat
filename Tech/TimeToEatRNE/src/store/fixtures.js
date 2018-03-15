import Immutable from "seamless-immutable";

import { DAY_AND_NODES_ADDED } from "./reducer";
import * as uiStateFixtures from "./uiState/fixtures";
import defaultPlan from "./plan/defaultPlan";
import * as daysFixtures from "./days/fixtures";
import * as nodesFixtures from "./nodes/fixtures";
import * as planFixtures from "./plan/fixtures";
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

export const expectedTuesdayDayAndNodesAddedAction = {
  type: DAY_AND_NODES_ADDED,
  dayAndNodes: {
    day: daysFixtures.expectedDayTuesdayWithWeight,
    nodes: nodesFixtures.expectedNodesTuesday,
  },
};

export const stateWithMonday = {
  days: daysFixtures.expectedInitialStateWithMonday,
  nodes: nodesFixtures.expectedInitialStateWithMonday,
};

export const stateWithWeight = {
  uiState: uiStateFixtures.expectedInitialState,
  days: daysFixtures.stateWithMondayWithWeight,
  nodes: nodesFixtures.expectedInitialStateWithMonday,
  plan: defaultPlan,
};

export const stateWithNotifications = {
  plan: planFixtures.expectedStateWithNotificationIds,
};

const today = getDateKey();
const todayBreakfast = `${today}_0`;
const todayLunch = `${today}_1`;
const todayState = {
  plan: defaultPlan,
  days: { daysById: {} },
  nodes: { nodesById: {} },
  uiState: uiStateFixtures.expectedInitialStateNotificationsOn,
};
todayState.days.daysById[today] = {
  id: today,
  nodeIds: [todayBreakfast, todayLunch],
};
todayState.nodes.nodesById[todayBreakfast] = {
  id: todayBreakfast,
  type: PLAN,
  name: "bfast",
  time: 1486393200000,
  items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
  completedTime: null,
  tracking: false,
};
todayState.nodes.nodesById[todayLunch] = {
  id: todayLunch,
  type: PLAN,
  name: "lunch",
  time: 1486413000000,
  items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
  completedTime: null,
  tracking: false,
};
todayState.plan.notifications = [null, "123"];
export const stateWithToday = todayState;
