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
  let rows = [];
  const { nodes, height, scrollingRequired, scheme } = props;
  const selectedNodeId = getCurrentNodeId(nodes);
  const justifyContent = scrollingRequired ? "space-between" : "space-around";
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
        if (node.tracking) {
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
              isPickerShowing={props.openPicker === node.id}
              onShowPicker={() => props.onShowPicker(node.id)}
              pickerHeight={props.pickerHeights[node.id]}
              scheme={scheme}
            />,
          );
        }
        break;
      case OFFPLAN:
        rows.push(
          <SnackNodeRow
            key={node.id}
            time={node.time}
            onTapAndHold={() => {
              props.onTapAndHoldSnack(node.id);
            }}
            onDateChange={time => props.onEditSnackTime(node.id, time)}
            isPickerShowing={props.openPicker === node.id}
            onShowPicker={() => props.onShowPicker(node.id)}
          />,
        );
      default:
        break;
    }
  });
  return (
    <View style={[styles.content, { height }, { justifyContent }]}>{rows}</View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default NodeRows;
