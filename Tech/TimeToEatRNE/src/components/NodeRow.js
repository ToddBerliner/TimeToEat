import React from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
} from "react-native";
import { getFriendlyTime, isSeSize } from "../utils";
import { CHECKED, MISSED } from "../store/nodes/reducer";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";
import { topBottomBorder } from "../styles/styles";

export const nodeRowHeight = 69;
const isSe = isSeSize();

class NodeRow extends React.Component {
  render() {
    let circleFillJsx;
    const { props } = this;
    switch (props.status) {
      case CHECKED:
        circleFillJsx = (
          <View
            style={[
              styles.circleFill,
              { backgroundColor: Colors[props.scheme] },
            ]}
          >
            <Ionicons
              name="ios-checkmark"
              style={styles.nodeIcon}
              size={isSe ? 50 : 56}
            />
          </View>
        );
        break;
      case MISSED:
        circleFillJsx = (
          <View
            style={[
              styles.circleFill,
              { backgroundColor: Colors[props.scheme] },
            ]}
          >
            <Ionicons
              name="ios-close"
              style={styles.nodeIcon}
              size={isSe ? 50 : 56}
            />
          </View>
        );
        break;
      default:
        circleFillJsx = null;
    }

    return (
      <View style={styles.nodeRowWrap}>
        <View style={styles.nodeRowBgWrap}>
          <View style={styles.nodeRowBgBar} />
          <View style={styles.nodeRowBgCircleColumn}>
            <View style={styles.nodeRowBgCircle} />
          </View>
        </View>
        <View style={styles.circleColumn}>
          <TouchableOpacity
            onPress={props.onTap}
            onLongPress={props.onTapAndHold}
            style={styles.circleTouchable}
          >
            <View
              style={[styles.circle, { borderColor: Colors[props.scheme] }]}
            >
              {circleFillJsx}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.nodeNameBlock}>
          <View style={styles.nodeNameRow}>
            <Text style={styles.nodeName} numberOfLines={1}>
              {props.name}
            </Text>
          </View>
          <Text>{getFriendlyTime(props.time)}</Text>
        </View>
        <Animated.View
          style={{ overflow: "hidden", height: props.pickerHeight }}
        >
          <View style={topBottomBorder}>
            <DatePickerIOS
              mode="time"
              onDateChange={event => {
                props.onDateChange(event.getTime());
              }}
              date={new Date(props.completedTime)}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nodeRowWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: nodeRowHeight,
  },
  nodeRowBgWrap: {
    position: "absolute",
    width: "100%",
    height: nodeRowHeight,
    opacity: 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },
  nodeRowBgBar: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
  },
  nodeRowBgCircleColumn: {
    position: "absolute",
    height: nodeRowHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: isSe ? 70 : 90,
  },
  nodeRowBgCircle: {
    width: isSe ? 64 : 74,
    height: isSe ? 64 : 74,
    borderRadius: isSe ? 32 : 37,
    backgroundColor: "white",
  },
  circleColumn: {
    width: isSe ? 70 : 90,
    alignItems: "center",
    justifyContent: "center",
  },
  circleTouchable: {
    width: isSe ? 50 : 60,
    height: isSe ? 50 : 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  circle: {
    width: isSe ? 50 : 60,
    height: isSe ? 50 : 60,
    borderRadius: isSe ? 25 : 30,
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    width: isSe ? 42 : 52,
    height: isSe ? 42 : 52,
    borderRadius: isSe ? 21 : 26,
  },
  nodeIcon: {
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    includeFontPadding: false,
    position: "absolute",
    width: isSe ? 42 : 52,
    height: isSe ? 42 : 52,
    top: isSe ? -4 : -1,
  },
  nodeNameBlock: {
    flex: 1,
  },
  nodeName: {
    fontSize: isSe ? 22 : 24,
  },
  nodeNameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  nodeEatenTime: {
    fontSize: 20,
    marginRight: 14,
    color: "#969696",
  },
  nodeEatenTimeActive: {
    fontSize: 20,
    marginRight: 14,
    color: Colors.textRed,
  },
});

export default NodeRow;
