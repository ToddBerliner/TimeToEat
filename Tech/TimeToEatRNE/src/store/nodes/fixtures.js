import Immutable from "seamless-immutable";
import {
  dateKeyMonday,
  dateKeyTuesday,
  snackTimestampMonday,
  snackTimestampMondayEdited,
  snackKeyMondayEdited,
} from "../days/fixtures";
import {
  NODE_CHECKED,
  NODE_UNCHECKED,
  SNACK_NODE_UNCHECKED,
  NODE_UPDATED,
  PLAN,
  OFFPLAN,
  NODE_ADDED,
} from "./reducer";
import { MEAL_EDITED } from "../plan/reducer";
import { getDateKey } from "../../utils";

export const expectedInitialState = Immutable({
  nodesById: {},
});
export const expectedInitialStateWithMonday = Immutable({
  nodesById: {
    // can't use template strings as keys? 1486368000000 = dateKeyMonday
    "1486368000000_1486393200000": {
      type: PLAN,
      id: `${dateKeyMonday}_1486393200000`,
      name: "Breakfast",
      time: 1486393200000, // 7am
      items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
      completedTime: null,
      tracking: false,
    },
    "1486368000000_1486402200000": {
      type: PLAN,
      id: `${dateKeyMonday}_1486402200000`,
      name: "Midmorning Snack",
      time: 1486402200000, // 9:30am
      items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
      completedTime: null,
      tracking: false,
    },
    "1486368000000_1486413000000": {
      type: PLAN,
      id: `${dateKeyMonday}_1486413000000`,
      name: "Lunch",
      time: 1486413000000, //12:30pm
      items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
      completedTime: null,
      tracking: false,
    },
    "1486368000000_1486422000000": {
      type: PLAN,
      id: `${dateKeyMonday}_1486422000000`,
      name: "Afternoon Snack",
      time: 1486422000000, // 3pm
      items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
      completedTime: null,
      tracking: false,
    },
    "1486368000000_1486432800000": {
      type: PLAN,
      id: `${dateKeyMonday}_1486432800000`,
      name: "Dinner",
      time: 1486432800000, // 6pm
      items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
      completedTime: null,
      tracking: false,
    },
  },
});
export const nodeKeyMonday0 = `${dateKeyMonday}_0`;
export const nodeKeyToday1 = `${getDateKey()}_1`;
export const expectedSingleNode = Immutable({
  type: PLAN,
  id: `${dateKeyMonday}_1486393200000`,
  name: "Breakfast",
  time: 1486393200000,
  items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
  completedTime: null,
  tracking: false,
});
export const expectedSnackNodeMonday = {
  type: OFFPLAN,
  id: `${dateKeyMonday}_${snackTimestampMonday}`,
  time: snackTimestampMonday,
  completedTime: snackTimestampMonday,
};
export const expectedSnackNodeMondayEdited = {
  type: OFFPLAN,
  id: `${dateKeyMonday}_${snackTimestampMondayEdited}`,
  time: snackTimestampMondayEdited,
  completedTime: snackTimestampMondayEdited,
};
export const checkedTrackedNode = {
  type: PLAN,
  completedTime: "123",
  tracking: true,
};
export const uncheckedTrackedNode = {
  type: PLAN,
  completedTime: null,
  tracking: true,
};
export const checkedUntrackedNode = {
  type: PLAN,
  completedTime: "123",
  tracking: false,
};
export const uncheckedUntrackedNode = {
  type: PLAN,
  completedTime: null,
  tracking: false,
};
export const expectedNodesMonday = Immutable([
  {
    type: PLAN,
    id: `${dateKeyMonday}_1486393200000`,
    name: "Breakfast",
    time: 1486393200000,
    items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyMonday}_1486402200000`,
    name: "Midmorning Snack",
    time: 1486402200000,
    items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyMonday}_1486413000000`,
    name: "Lunch",
    time: 1486413000000,
    items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyMonday}_1486422000000`,
    name: "Afternoon Snack",
    time: 1486422000000,
    items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyMonday}_1486432800000`,
    name: "Dinner",
    time: 1486432800000,
    items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
    completedTime: null,
    tracking: false,
  },
]);
export const expectedNodesTuesday = Immutable([
  {
    type: PLAN,
    id: `${dateKeyTuesday}_1486479600000`,
    name: "Breakfast",
    time: 1486479600000,
    items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyTuesday}_1486488600000`,
    name: "Midmorning Snack",
    time: 1486488600000,
    items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyTuesday}_1486499400000`,
    name: "Lunch",
    time: 1486499400000,
    items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyTuesday}_1486508400000`,
    name: "Afternoon Snack",
    time: 1486508400000,
    items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
    completedTime: null,
    tracking: false,
  },
  {
    type: PLAN,
    id: `${dateKeyTuesday}_1486519200000`,
    name: "Dinner",
    time: 1486519200000,
    items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
    completedTime: null,
    tracking: false,
  },
]);
export const expectedStateWithMondayWithSnack = expectedInitialStateWithMonday.setIn(
  ["nodesById", expectedSnackNodeMonday.id],
  expectedSnackNodeMonday,
);
export const expectedStateWithMondayWithSnackEdited = expectedInitialStateWithMonday.setIn(
  ["nodesById", expectedSnackNodeMondayEdited.id],
  expectedSnackNodeMondayEdited,
);
export const expectedNodeCheckAction = {
  type: NODE_CHECKED,
  nodeId: nodeKeyMonday0,
  time: 456,
};
export const expectedSnackNodeChangeAction = {
  type: NODE_CHECKED,
  nodeId: expectedSnackNodeMonday.id,
  time: 456,
};
export const expectedNodeUnCheckAction = {
  type: NODE_UNCHECKED,
  nodeId: nodeKeyMonday0,
  time: 456,
};
export const expectedSnackNodeUnCheckAction = {
  type: SNACK_NODE_UNCHECKED,
  nodeId: expectedSnackNodeMonday.id,
  time: snackTimestampMonday,
};
export const expectedSnackTapAction = {
  type: NODE_ADDED,
  node: expectedSnackNodeMonday,
};
export const expectedSnackNodeEditActionUncheck = {
  type: SNACK_NODE_UNCHECKED,
  nodeId: expectedSnackNodeMonday.id,
  time: snackTimestampMondayEdited,
};
export const expectedSnackEditActionNodeAdded = {
  type: NODE_ADDED,
  node: expectedSnackNodeMondayEdited,
};
export const expectedNodeUpdatedAction = {
  type: NODE_UPDATED,
  nodeId: nodeKeyToday1,
  field: "name",
  value: "Foofast",
};
export const expectedNodeTimeUpdatedAction = {
  type: NODE_UPDATED,
  nodeId: nodeKeyToday1,
  field: "time",
  value: { hours: 0, minutes: 30 },
};
export const expectedNodeTrackingUpdatedAction = {
  type: NODE_UPDATED,
  nodeId: nodeKeyToday1,
  field: "tracking",
  value: true,
};
export const expectedNodeTrackingOffUpdatedAction = {
  type: NODE_UPDATED,
  nodeId: nodeKeyToday1,
  field: "tracking",
  value: false,
};
export const expectedStateNodeChecked = Immutable({
  nodesById: {
    "1486368000000_0": {
      type: PLAN,
      id: `${dateKeyMonday}_1486393200000`,
      name: "Breakfast",
      time: 1486393200000,
      items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
      completedTime: 456,
      tracking: false,
    },
  },
});
export const expectedStateNodeUnChecked = Immutable({
  nodesById: {
    "1486368000000_0": {
      type: PLAN,
      id: `${dateKeyMonday}_1486393200000`,
      name: "Breakfast",
      time: 1486393200000,
      items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
      completedTime: null,
      tracking: false,
    },
  },
});
