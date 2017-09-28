import Immutable from "seamless-immutable";
import { DAY_SELECTED } from "../uiState/reducer";
import { DAY_AND_NODES_ADDED } from "../reducer";

// Action Types
export const NODE_CHECKED = "node_checked";
export const NODE_UNCHECKED = "node_unchecked";

// Actions
export const tapNode = (nodeId, time) => ({
    type: NODE_CHECKED,
    nodeId,
    time
});
export const tapAndHoldNode = (nodeId, time) => ({
    type: NODE_UNCHECKED,
    nodeId,
    time
});

// Reducer
const initialState = Immutable({
    nodesById: {}
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
    return { ...node, completedTime: timestamp };
};
const nodeUnCheck = node => {
    return { ...node, completedTime: null };
};
export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case DAY_AND_NODES_ADDED:
            return { ...state, nodesById: nodesAdd(state.nodesById, action) };
        case NODE_CHECKED:
            return {
                ...state,
                nodesById: {
                    ...state.nodesById,
                    [action.nodeId]: nodeCheck(
                        getNodeById(state, action.nodeId),
                        action.time
                    )
                }
            };
        case NODE_UNCHECKED:
            return {
                ...state,
                nodesById: {
                    ...state.nodesById,
                    [action.nodeId]: nodeUnCheck(
                        getNodeById(state, action.nodeId),
                        action.time
                    )
                }
            };
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
