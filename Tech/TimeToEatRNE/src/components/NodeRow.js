import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
} from "react-native";
import { getFriendlyTime } from "../utils";
import { CHECKED, MISSED } from "../store/nodes/reducer";
import Icon from "react-native-vector-icons/Ionicons";

class NodeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPickerShowing: false };
  }

  render() {
    let circleFillJsx;
    const { props } = this;
    switch (props.status) {
      case CHECKED:
        circleFillJsx = (
          <View style={styles.circleFill}>
            <Icon name="ios-checkmark" style={styles.nodeIcon} size={56} />
          </View>
        );
        break;
      case MISSED:
        circleFillJsx = (
          <View style={styles.circleFill}>
            <Icon name="ios-close" style={styles.nodeIcon} size={56} />
          </View>
        );
        break;
      default:
        circleFillJsx = null;
    }

    return (
      <View style={styles.nodeRowWrap}>
        <View style={props.selected ? styles.nodeRowSelected : styles.nodeRow}>
          <TouchableOpacity
            onPress={props.onTap}
            onLongPress={props.onTapAndHold}
            style={styles.circleTouchable}
          >
            <View style={styles.circle} onClick={props.onClick}>
              {circleFillJsx}
            </View>
          </TouchableOpacity>
          <View style={styles.nodeNameBlock}>
            <Text style={styles.nodeName}>{props.name}</Text>
            <Text>{getFriendlyTime(props.time)}</Text>
          </View>
          <View style={styles.nodeEatenTimeBlock}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isPickerShowing: !this.state.isPickerShowing });
              }}
            >
              <Text style={styles.nodeEatenTime}>
                {getFriendlyTime(props.completedTime)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isPickerShowing ? (
          <DatePickerIOS
            mode="time"
            onDateChange={event => {
              props.onDateChange(event.getTime());
            }}
            date={new Date(props.completedTime)}
          />
        ) : null}
      </View>
    );
    // Add DatePicker with onDateChange which must be passed down
    // from MapScreen through NodeRows to here
    // MapScreen.onDateChange must translate the date into timestamp and call
    // tapNode(nodeId, timestamp)
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
    height: 80,
    paddingLeft: 14,
  },
  nodeRowSelected: {
    backgroundColor: "rgba(216,216,216,40)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 80,
    paddingLeft: 14,
  },
  circleTouchable: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 24,
  },
  nodeEatenTimeBlock: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nodeEatenTime: {
    fontSize: 20,
    marginRight: 14,
    color: "#969696",
  },
});

export default NodeRow;
