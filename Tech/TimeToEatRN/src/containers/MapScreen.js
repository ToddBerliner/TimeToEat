import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert
} from "react-native";
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
import { tapNode, tapAndHoldNode, tapAddSnack } from "../store/nodes/reducer";
import {
  getDateKey,
  getAdjacentDateKey,
  getFriendlyDate,
  PREV,
  NEXT
} from "../utils";
import Icon from "react-native-vector-icons/Ionicons";

// MapScreen is a route in the App
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "map-to-metrics") {
        this.props.navigator.push({
          screen: "tte.Metrics",
          backButtonTitle: getFriendlyDate(this.props.dayId),
          navigatorButtons: {
            leftButtons: [
              {
                id: "back-to-map"
              }
            ]
          }
        });
      }
      if (event.id == "map-to-menu") {
        this.props.navigator.showModal({
          screen: "tte.Menu",
          title: "Settings",
          navigatorButtons: {
            rightButtons: [
              {
                title: "Done",
                id: "menu-done"
              }
            ]
          }
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.appWrap}>
        <View style={styles.bodyRow}>
          <NodeRows
            dayId={this.props.dayId}
            nodes={this.props.nodes}
            onTap={nodeId => this.props.tapNode(nodeId, new Date().getTime())}
            onTapAndHold={nodeId =>
              this.props.tapAndHoldNode(nodeId, new Date().getTime())}
          />
        </View>
        <View style={styles.footerRow}>
          <AddSnack
            onTap={() => {
              this.props.tapAddSnack(this.props.dayId, new Date().getTime());
            }}
          />
          <WaterPie
            waterCount={this.props.waterCount}
            onTap={() => {
              this.props.tapWater(this.props.dayId, new Date().getTime());
            }}
            onTapAndHold={() => {
              this.props.tapAndHoldWater(this.props.dayId);
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const dayId = _getSelectedDayId(state);
  const dayObj = _getDayById(state, dayId);
  const nodes = _getNodesByIds(state, dayObj.nodeIds);
  const isToday = dayId === getDateKey();
  return {
    dayId,
    waterCount: dayObj.water.completedTimes.length,
    nodes,
    isToday
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tapWater: (dayId, time) => {
      dispatch(tapWater(dayId, time));
    },
    tapAndHoldWater: nodeId => {
      dispatch(tapAndHoldWater(nodeId));
    },
    tapNode: (nodeId, time) => {
      dispatch(tapNode(nodeId, time));
    },
    tapAndHoldNode: (nodeId, time) => {
      dispatch(tapAndHoldNode(nodeId, time));
    },
    tapAddSnack: (dayId, time) => {
      dispatch(tapAddSnack(dayId, time));
    },
    selectDay: (dayId, dir) => {
      const newDayId = getAdjacentDateKey(dayId, dir);
      dispatch(selectDay(newDayId));
    }
  };
};

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    width: 50,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  appWrap: {
    backgroundColor: "rgb(245, 245, 245)",
    flex: 1
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
