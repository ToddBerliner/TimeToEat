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
    <View style={styles.snackNodeRowWrap}>
      <View style={styles.snackNodeRowBgWrap}>
        <View style={styles.snackNodeRowBgBar} />
        <View style={styles.snackNodeRowBgCircleColumn}>
          <View style={styles.snackNodeRowBgCircle} />
        </View>
      </View>
      <View style={styles.circleColumn}>
        <TouchableOpacity
          onLongPress={props.onTapAndHold}
          style={styles.circleTouchable}
        >
          <View style={[styles.circle, { borderColor: Colors[props.scheme] }]}>
            <View
              style={[
                styles.circleFill,
                { backgroundColor: Colors[props.scheme] },
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.nodeNameBlock}>
        <View style={styles.nodeNameRow}>
          <Text style={styles.nodeName}>Off-plan Snack</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  snackNodeRowWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: snackRowHeight,
  },
  snackNodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: snackRowHeight,
    paddingLeft: 24,
  },
  snackNodeRowBgWrap: {
    position: "absolute",
    width: "100%",
    height: snackRowHeight,
    opacity: 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },
  snackNodeRowBgBar: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
  },
  snackNodeRowBgCircleColumn: {
    position: "absolute",
    height: snackRowHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: isSe ? 70 : 90,
  },
  snackNodeRowBgCircle: {
    width: isSe ? 40 : 52,
    height: isSe ? 40 : 52,
    borderRadius: isSe ? 22 : 29,
    backgroundColor: "white",
  },
  circleColumn: {
    width: isSe ? 70 : 90,
    alignItems: "center",
    justifyContent: "center",
  },
  circleTouchable: {
    width: isSe ? 35 : 40,
    height: isSe ? 35 : 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  circle: {
    width: isSe ? 35 : 40,
    height: isSe ? 35 : 40,
    borderRadius: isSe ? 18 : 25,
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleFill: {
    width: isSe ? 27 : 32,
    height: isSe ? 27 : 32,
    borderRadius: isSe ? 14 : 16,
  },
  nodeNameBlock: {
    flex: 1,
  },
  nodeName: {
    fontSize: isSe ? 18 : 20,
  },
});

export default SnackNodeRow;
