import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
// import TitleDate from "../components/TitleDate";
// import WaterPie from "../components/WaterPie";
// import NodeRows from "../components/NodeRows";
import {
  _getSelectedDayId,
  _getDayById,
  _getNodesByIds
} from "../store/reducer";
import { selectDay } from "../store/uiState/reducer";
import { tapWater, tapAndHoldWater } from "../store/days/reducer";
import { tapNode, tapAndHoldNode } from "../store/nodes/reducer";
import { getAdjacentDateKey } from "../utils";

// MapScreen is a route in the App
const MapScreen = props => {
  return (
    <View style={styles.appWrap}>
      <View style={styles.box} />
      <View style={styles.flexBox} />
      <View style={styles.box} />
    </View>
  );
};

const mapStateToProps = state => {
  const dayId = _getSelectedDayId(state);
  const dayObj = _getDayById(state, dayId);
  const nodes = _getNodesByIds(state, dayObj.nodeIds);
  return {
    dayId,
    waterCount: dayObj.water.completedTimes.length,
    nodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tapWater: (dayId, time) => {
      dispatch(tapWater(dayId, time));
    },
    tapAndHoldWater,
    tapNode: (nodeId, time) => {
      dispatch(tapNode(nodeId, time));
    },
    tapAndHoldNode,
    selectDay: (dayId, dir) => {
      const newDayId = getAdjacentDateKey(dayId, dir);
      dispatch(selectDay(newDayId));
    }
  };
};

const styles = StyleSheet.create({
  appWrap: {
    backgroundColor: "rgb(245, 245, 245)",
    flex: 1,
    paddingTop: 50
  },
  box: {
    backgroundColor: "rgb(102, 102, 102)",
    height: 50
  },
  flexBox: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
