import Immutable from "seamless-immutable";
import { DAY_AND_NODES_ADDED } from "../reducer";
import {
  NODE_ADDED,
  SNACK_NODE_UNCHECKED,
  NODE_CHECKED,
} from "../nodes/reducer";
import { getIdsFromKey } from "../../utils";

// Action Types
export const WATER_ADDED = "water_added";
export const WATER_REMOVED = "water_removed";

// Actions
export const tapWater = (dayId, time) => {
  return {
    type: WATER_ADDED,
    dayId,
    time,
  };
};
export const tapAndHoldWater = dayId => {
  return {
    type: WATER_REMOVED,
    dayId,
  };
};

// Reducer
const initialState = Immutable({
  daysById: {},
});
const dayAdd = (daysById, action) => {
  const key = action.dayAndNodes.day.id;
  const day = action.dayAndNodes.day;
  return Immutable({ ...daysById, [key]: day });
};
const nodeIdAdd = (day, nodeId) => {
  const newNodeIds = day.nodeIds.asMutable();
  newNodeIds.push(nodeId);
  newNodeIds.sort();
  return Immutable.set(day, "nodeIds", newNodeIds);
};
const nodeIdRemove = (day, nodeId) => {
  const newNodeIds = day.nodeIds.asMutable();
  const nodeIdx = newNodeIds.indexOf(nodeId);
  if (nodeIdx !== -1) {
    newNodeIds.splice(nodeIdx, 1);
  }
  return Immutable.set(day, "nodeIds", newNodeIds);
};
const waterAdd = (day, time) => {
  const newCompletes = day.water.completedTimes.asMutable();
  const waterTimeIdx = newCompletes.indexOf(time);
  if (waterTimeIdx === -1) {
    newCompletes.push(time);
    return Immutable({
      ...day,
      water: { ...day.water, completedTimes: newCompletes },
    });
  } else {
    return day;
  }
};
const waterRemove = day => {
  const newCompletes = day.water.completedTimes.asMutable();
  newCompletes.pop();
  return Immutable({
    ...day,
    water: { ...day.water, completedTimes: newCompletes },
  });
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_AND_NODES_ADDED:
      return Immutable({
        ...state,
        daysById: dayAdd(state.daysById, action),
      });
    case NODE_ADDED:
      const nodeId = action.node.id;
      const ids = getIdsFromKey(nodeId);
      return Immutable({
        ...state,
        daysById: {
          ...state.daysById,
          [ids.dayId]: nodeIdAdd(getDayById(state, ids.dayId), nodeId),
        },
      });
    case SNACK_NODE_UNCHECKED:
      const snackNodeId = action.nodeId;
      const snackNodeIds = getIdsFromKey(snackNodeId);
      return Immutable({
        ...state,
        daysById: {
          ...state.daysById,
          [snackNodeIds.dayId]: nodeIdRemove(
            getDayById(state, snackNodeIds.dayId),
            snackNodeId,
          ),
        },
      });
    case WATER_ADDED:
      return Immutable({
        ...state,
        daysById: {
          ...state.daysById,
          [action.dayId]: waterAdd(
            getDayById(state, action.dayId),
            action.time,
          ),
        },
      });
    case WATER_REMOVED:
      return Immutable({
        ...state,
        daysById: {
          ...state.daysById,
          [action.dayId]: waterRemove(
            getDayById(state, action.dayId),
            action.time,
          ),
        },
      });
    case NODE_CHECKED:
      return state;
    default:
      return state;
  }
}

// Selectors
export const getDayById = (state, dayId) => {
  return state.daysById[dayId];
};
export const getAllDayIds = state => {
  return Object.keys(state.daysById);
};
export const getLastDayId = state => {
  const dayIds = getAllDayIds(state);
  dayIds.sort((a, b) => {
    return parseInt(a, 10) - parseInt(b, 10);
  });
  return dayIds.pop();
};
export const getFirstDayId = state => {
  const dayIds = getAllDayIds(state);
  dayIds.sort((a, b) => {
    return parseInt(a, 10) - parseInt(b, 10);
  });
  return dayIds.shift();
};
export const getAllDayIdsInOrder = state => {
  const dayIds = Object.keys(state.daysById);
  let orderedDayIds = dayIds.map(dayId => parseInt(dayId, 10));
  orderedDayIds.sort();
  orderedDayIds = orderedDayIds.map(dayId => dayId.toString());
  return orderedDayIds;
};
