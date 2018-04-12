import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
} from "react-native";
import { getFriendlyTime, isSeSize } from "../utils";
import Colors from "../styles/colors";

export const snackRowHeight = 60;
const isSe = isSeSize();

const SnackNodeRow = props => {
  return (
    <View style={{ display: "flex" }}>
      <View style={styles.snackNodeRow}>
        <TouchableOpacity
          onLongPress={props.onTapAndHold}
          style={styles.circleTouchable}
        >
          <View style={styles.circle}>
            <View style={styles.circleFill} />
          </View>
        </TouchableOpacity>
        <View style={styles.nodeNameBlock}>
          <Text style={styles.nodeName}>Off-plan Snack</Text>
        </View>
      </View>
      {props.isPickerShowing ? (
        <DatePickerIOS
          mode="time"
          onDateChange={event => {
            props.onDateChange(event.getTime());
          }}
          date={new Date(props.time)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  snackNodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: snackRowHeight,
    paddingLeft: 24,
  },
  circleTouchable: {
    width: 60,
    height: 40,
    borderRadius: 30,
  },
  circle: {
    width: isSe ? 35 : 40,
    height: isSe ? 35 : 40,
    borderRadius: isSe ? 18 : 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    backgroundColor: "black",
    width: isSe ? 27 : 32,
    height: isSe ? 27 : 32,
    borderRadius: isSe ? 14 : 16,
  },
  nodeNameBlock: {
    flex: 1,
  },
  nodeTimeBlock: {
    fontSize: 20,
    marginRight: 14,
    color: "#969696",
  },
  nodeTimeBlockActive: {
    fontSize: 20,
    marginRight: 14,
    color: Colors.textRed,
  },
  nodeName: {
    fontSize: isSe ? 18 : 20,
  },
});

export default SnackNodeRow;
