import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SnackNodeRow = props => {
  return (
    <View style={styles.snackNodeRow}>
      <View style={styles.circle}>
        <View style={styles.circleFill} />
      </View>
      <View style={styles.nodeNameBlock}>
        <Text style={styles.nodeName}>Off-plan Snack</Text>
        <Text>{props.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  snackNodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    paddingLeft: 48
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  circleFill: {
    backgroundColor: "black",
    width: 32,
    height: 32,
    borderRadius: 16
  },
  nodeNameBlock: {
    marginLeft: 14
  },
  nodeName: {
    fontSize: 20
  }
});

export default SnackNodeRow;
