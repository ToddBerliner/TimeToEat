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
import Icon from "react-native-vector-icons/Ionicons";
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
          <View style={styles.circleFill}>
            <Icon
              name="ios-checkmark"
              style={styles.nodeIcon}
              size={isSe ? 50 : 56}
            />
          </View>
        );
        break;
      case MISSED:
        circleFillJsx = (
          <View style={styles.circleFill}>
            <Icon
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
        <View style={styles.nodeRow}>
          <TouchableOpacity
            onPress={props.onTap}
            onLongPress={props.onTapAndHold}
            style={styles.circleTouchable}
          >
            <View style={styles.circle}>{circleFillJsx}</View>
          </TouchableOpacity>
          <View style={styles.nodeNameBlock}>
            <View style={styles.nodeNameRow}>
              <Text style={styles.nodeName} numberOfLines={1}>
                {props.name}
              </Text>
            </View>
            <Text>{getFriendlyTime(props.time)}</Text>
          </View>
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
  },
  nodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: nodeRowHeight,
    paddingLeft: 14,
  },
  nodeRowSelected: {
    backgroundColor: "rgba(216,216,216,40)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: nodeRowHeight,
    paddingLeft: 14,
  },
  circleTouchable: {
    width: isSe ? 50 : 60,
    height: isSe ? 50 : 60,
    borderRadius: 30,
  },
  circle: {
    width: isSe ? 50 : 60,
    height: isSe ? 50 : 60,
    borderRadius: isSe ? 25 : 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    width: isSe ? 42 : 52,
    height: isSe ? 42 : 52,
    borderRadius: isSe ? 21 : 26,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  nodeIcon: {
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    textAlignVertical: "bottom",
    includeFontPadding: false,
  },
  nodeNameBlock: {
    marginLeft: 14,
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
