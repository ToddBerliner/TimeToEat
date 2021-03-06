import Immutable from "seamless-immutable";
import { DAY_AND_NODES_ADDED } from "../reducer";
import { _getNodeIdByDayIdAndMealIdx } from "../reducer";
import {
  createSnackNode,
  getTimestampFromTimeObj,
  getDateKey,
  getIdsFromKey,
} from "../../utils";

// Node Statuses
export const CHECKED = "checked";
export const UNCHECKED = "unchecked";
export const MISSED = "missed";

// Node Types
export const PLAN = "plan";
export const OFFPLAN = "offplan";

// Action Types
export const NODE_CHECKED = "node_checked";
export const NODE_UNCHECKED = "node_unchecked";
export const NODE_ADDED = "node_added";
export const NODE_UPDATED = "node_updated";
export const SNACK_NODE_UNCHECKED = "snack_node_unchecked";

// Actions
export const tapNode = (nodeId, time) => ({
  type: NODE_CHECKED,
  nodeId,
  time,
});
export const tapAndHoldNode = (nodeId, time) => ({
  type: NODE_UNCHECKED,
  nodeId,
  time,
});
export const tapAddSnack = (dateKey, time) => {
  const node = createSnackNode(dateKey, time);
  return {
    type: NODE_ADDED,
    node,
  };
};
export const tapAndHoldSnack = (nodeId, time) => {
  return {
    type: SNACK_NODE_UNCHECKED,
    nodeId,
    time,
  };
};
export const editSnackTime = (nodeId, time) => {
  return function(dispatch, getState) {
    // remove the existing snack node
    dispatch({ type: SNACK_NODE_UNCHECKED, nodeId, time });
    // create and add a new snack node
    const dateKey = getIdsFromKey(nodeId).dayId;
    const node = createSnackNode(dateKey, time);
    dispatch({ type: NODE_ADDED, node });
  };
};

// Reducer
const initialState = Immutable({
  nodesById: {},
});
const nodesAdd = (nodesById, action) => {
  const newNodesById = { ...nodesById };
  for (var node of action.dayAndNodes.nodes) {
    const key = node.id;
    newNodesById[key] = node;
  }
  return newNodesById;
};
const nodeCheck = (node, timestamp) => {
  return node.type === PLAN
    ? { ...node, completedTime: timestamp }
    : { ...node, time: timestamp, completedTime: timestamp };
};
const nodeUnCheck = node => {
  return { ...node, completedTime: null };
};
export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_AND_NODES_ADDED:
      return Immutable({
        ...state,
        nodesById: nodesAdd(state.nodesById, action),
      });
    case NODE_CHECKED:
      return Immutable({
        ...state,
        nodesById: {
          ...state.nodesById,
          [action.nodeId]: nodeCheck(
            getNodeById(state, action.nodeId),
            action.time,
          ),
        },
      });
    case NODE_UNCHECKED:
      return Immutable({
        ...state,
        nodesById: {
          ...state.nodesById,
          [action.nodeId]: nodeUnCheck(
            getNodeById(state, action.nodeId),
            action.time,
          ),
        },
      });
    case SNACK_NODE_UNCHECKED:
      return Immutable({
        ...state,
        nodesById: Immutable.without(state.nodesById, action.nodeId),
      });
    case NODE_ADDED:
      const newNode = action.node;
      const newNodeKey = newNode.id;
      return Immutable.setIn(state, ["nodesById", newNodeKey], newNode);
    case NODE_UPDATED:
      if (action.field === "time") {
        action.value = getTimestampFromTimeObj(getDateKey(), action.value);
      }
      return Immutable.setIn(
        state,
        ["nodesById", action.nodeId, action.field],
        action.value,
      );
    default:
      return state;
  }
}

// Selectors
export const getNodeById = (state, nodeId) => {
  return state.nodesById[nodeId];
};
export const getNodesByIds = (state, nodeIds) => {
  const nodes = [];
  for (var nodeId of nodeIds) {
    nodes.push(getNodeById(state, nodeId));
  }
  return nodes;
};
