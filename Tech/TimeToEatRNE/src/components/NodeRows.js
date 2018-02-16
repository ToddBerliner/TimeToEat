import React from "react";
import { View, StyleSheet } from "react-native";
import NodeRow from "./NodeRow";
import SnackNodeRow from "./SnackNodeRow";
import {
  UNCHECKED,
  CHECKED,
  MISSED,
  PLAN,
  OFFPLAN,
} from "../store/nodes/reducer";
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
    switch (node.type) {
      case PLAN:
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
            time={node.time}
            completedTime={node.completedTime}
            status={status}
            selected={node.id === selectedNodeId}
            id={node.id}
            onTap={() => {
              if (node.completedTime === null) {
                props.onTap(node.id);
              }
            }}
            onDateChange={time => props.onTap(node.id, time)}
            onTapAndHold={() => {
              if (node.completedTime !== null) {
                props.onTapAndHold(node.id);
              }
            }}
          />,
        );
        break;
      case OFFPLAN:
        rows.push(
          <SnackNodeRow key={node.id} time={getFriendlyTime(node.time)} />,
        );
      default:
        break;
    }
  });

  return <View style={styles.content}>{rows}</View>;
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "whitesmoke",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default NodeRows;
