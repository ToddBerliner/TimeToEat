import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import TitleDate from "../components/TitleDate";
import AddSnack from "../components/AddSnack";
import WaterPie from "../components/WaterPie";
import NodeRows from "../components/NodeRows";
import {
  _getSelectedDayId,
  _getDayById,
  _getNodesByIds
} from "../store/reducer";
import { selectDay } from "../store/uiState/reducer";
import { tapWater, tapAndHoldWater } from "../store/days/reducer";
import { tapNode, tapAndHoldNode } from "../store/nodes/reducer";
import { getAdjacentDateKey, PREV, NEXT } from "../utils";
import Icon from "react-native-vector-icons/Ionicons";
// MapScreen is a route in the App
const MapScreen = props => {
  console.log(props.selectDay);
  return (
    <View style={styles.appWrap}>
      <View style={styles.titleRow}>
        <View style={styles.titleRowLeft}>
          <Icon name="ios-contact" size={24} />
        </View>
        <View style={styles.titleRowCenter}>
          <TouchableHighlight
            onPress={() => {
              props.selectDay(props.dayId, PREV);
            }}
          >
            <Icon name="ios-arrow-back" size={24} style={{ marginRight: 20 }} />
          </TouchableHighlight>
          <TitleDate dayId={props.dayId} />
          <TouchableHighlight
            onPress={() => {
              props.selectDay(props.dayId, NEXT);
            }}
          >
            <Icon
              name="ios-arrow-forward"
              size={24}
              style={{ marginLeft: 20 }}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.titleRowRight}>
          <Icon name="ios-pulse" size={24} />
        </View>
      </View>
      <View style={styles.bodyRow}>
        <NodeRows
          dayId={props.dayId}
          nodes={props.nodes}
          onTap={nodeId => props.tapNode(nodeId, new Date().getTime())}
        />
      </View>
      <View style={styles.footerRow}>
        <AddSnack />
        <WaterPie
          waterCount={props.waterCount}
          onTap={() => {
            props.tapWater(props.dayId, new Date().getTime());
          }}
        />
      </View>
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
    paddingTop: 50,
    paddingBottom: 30
  },
  box: {
    backgroundColor: "rgb(102, 102, 102)",
    height: 50
  },
  bodyRow: {
    flex: 1,
    backgroundColor: "rgb(220,220,220)"
  },
  titleRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginRight: 14
  },
  titleRowLeft: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  titleRowRight: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  titleRowCenter: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  footerRow: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
