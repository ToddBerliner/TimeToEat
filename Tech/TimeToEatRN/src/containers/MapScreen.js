import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert
} from "react-native";
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
import { tapNode, tapAndHoldNode, tapAddSnack } from "../store/nodes/reducer";
import { getDateKey, getAdjacentDateKey, PREV, NEXT } from "../utils";
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
        // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
          screen: "tte.Metrics"
        });
      }
      if (event.id == "map-to-menu") {
        console.log("heyo - open that drawer!");
        // this is the same id field from the static navigatorButtons definition
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
    console.log(event);
  }

  render() {
    return (
      <View style={styles.appWrap}>
        <View style={styles.titleRow}>
          <View style={styles.titleRowLeft}>
            <Icon name="ios-contact" size={24} />
          </View>
          <View style={styles.titleRowCenter}>
            <View style={styles.titleLeftArrow}>
              <TouchableHighlight
                onPress={() => {
                  this.props.selectDay(this.props.dayId, PREV);
                }}
              >
                <Icon name="ios-arrow-back" size={24} />
              </TouchableHighlight>
            </View>
            <TitleDate dayId={this.props.dayId} />
            <View style={styles.titleRightArrow}>
              {!this.props.isToday && (
                <TouchableHighlight
                  onPress={() => {
                    this.props.selectDay(this.props.dayId, NEXT);
                  }}
                >
                  <Icon name="ios-arrow-forward" size={24} />
                </TouchableHighlight>
              )}
            </View>
          </View>
          <View style={styles.titleRowRight}>
            <Icon name="ios-pulse" size={24} />
          </View>
        </View>
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
          {/* <AddSnack
            onTap={() => {
              this.props.tapAddSnack(this.props.dayId, new Date().getTime());
            }}
          />
          <WaterPie
            waterCount={props.waterCount}
            onTap={() => {
              props.tapWater(props.dayId, new Date().getTime());
            }}
            onTapAndHold={() => {
              props.tapAndHoldWater(props.dayId);
            }}
          /> */}
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
  titleLeftArrow: {
    width: 15,
    alignItems: "flex-end"
  },
  titleRightArrow: {
    width: 15
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
