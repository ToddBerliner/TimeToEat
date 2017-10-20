import React from "react";
import NodeRow from "../components/NodeRow";
import "../styles/styles.css";
import { UNCHECKED, CHECKED, MISSED } from "../store/nodes/reducer";
import { getFriendlyTime } from "../utils";

const getCurrentNodeId = nodes => {
  const nowDate = new Date();
  let selectedNodeId = null;
  nodes.every(node => {
    // node end bound is node time + 30 mins
    const nodeEndBoudaryDate = new Date(node.time + 1800 * 1000);
    if (nowDate < nodeEndBoudaryDate) {
      selectedNodeId = node.id;
      return false; // found the current node idx, stop
    }
    return true; // continue through nodes
  });
  return selectedNodeId;
};

// NodeRows handles layout of node rows
const NodeRows = props => {
  const rows = [];
  const { nodes } = props;
  const selectedNodeId = getCurrentNodeId(nodes);
  nodes.forEach(node => {
    const nowDate = new Date();
    let status = UNCHECKED;
    const nodeEndBoudaryDate = new Date(node.time + 1800 * 1000);
    if (nowDate > nodeEndBoudaryDate) {
      status = MISSED;
    }
    if (node.completedTime !== null) {
      status = CHECKED;
    }

    rows.push(
      <NodeRow
        key={node.id}
        name={node.name}
        time={getFriendlyTime(node.time)}
        status={status}
        selected={node.id === selectedNodeId}
        id={node.id}
        onClick={() => {
          if (node.completedTime === null) {
            props.tap(node.id);
          }
        }}
      />
    );
  });

  return <div className="content">{rows}</div>;
};

export default NodeRows;
