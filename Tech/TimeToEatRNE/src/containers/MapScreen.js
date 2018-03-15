import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  PickerIOS,
  ScrollView,
} from "react-native";
import AddSnack from "../components/AddSnack";
import WaterPie from "../components/WaterPie";
import NodeRows from "../components/NodeRows";
import TitleDateNav from "../containers/TitleDateNav";
import NumberSpinner from "../components/NumberSpinner";
import {
  _getSelectedDayId,
  _getWaterTrackingState,
  _getDayById,
  _getNodesByIds,
} from "../store/reducer";
import { selectDay } from "../store/uiState/reducer";
import { tapWater, tapAndHoldWater, editWeight } from "../store/days/reducer";
import {
  tapNode,
  tapAndHoldNode,
  tapAddSnack,
  tapAndHoldSnack,
  editSnackTime,
} from "../store/nodes/reducer";
import {
  getDateKey,
  getDateFromKey,
  getAdjacentDateKey,
  getFriendlyDate,
  sendImmediateNotification,
  PREV,
  NEXT,
} from "../utils";
import { _logState } from "../store/reducer";
import Icon from "react-native-vector-icons/Ionicons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigator } from "react-navigation";
import { Notifications, Permissions } from "expo";
import Colors from "../styles/colors";

import Notification from "react-native-in-app-notification";
const notificationIcon = require("../../assets/images/notification_icon.png");

// MapScreen is a route in the App
class MapScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { navigate } = navigation;
    return {
      headerTitle: <TitleDateNav />,
      headerStyle: {
        paddingRight: 12,
        paddingLeft: 12,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigate("Menu");
          }}
          style={{ width: 30 }}
          hitSlop={{ left: 10, right: 10 }}
        >
          <Icon name="ios-contact" size={24} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigate("Metrics");
          }}
          style={{ width: 30 }}
          hitSlop={{ left: 10, right: 10 }}
        >
          <Icon name="ios-pulse" size={24} style={{ alignSelf: "flex-end" }} />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      tomorrow: parseInt(getAdjacentDateKey(getDateKey(), NEXT), 10),
      openPicker: null,
      weightPickerOpen: false,
      bodyRowHeight: false,
    };
  }

  _checkTime() {
    // Load new day when it comes around
    if (
      new Date().getTime() === this.state.tomorrow ||
      new Date().getTime() > this.state.tomorrow
    ) {
      this.setState({
        tomorrow: parseInt(getAdjacentDateKey(getDateKey(), NEXT), 10),
      });
      this.props.selectDay(this.props.dayId, NEXT);
    }
  }

  _handleNotification = ({ origin, data }) => {
    if (origin !== "selected") {
      this.notification.show({ ...data });
    }
  };

  _toggleWeightPicker() {
    this.setState(prevState => {
      return {
        weightPickerOpen: !prevState.weightPickerOpen,
        openPicker: null,
      };
    });
  }

  _handleShowPicker(nodeId) {
    this.setState(prevState => {
      return {
        openPicker: prevState.openPicker === nodeId ? null : nodeId,
        weightPickerOpen: false,
      };
    });
  }

  _handleBodyRowLayout(evt) {
    const { height } = evt.nativeEvent.layout;
    this.setState(prevState => {
      if (!prevState.bodyRowHeight) {
        return { bodyRowHeight: height };
      }
    });
  }

  async componentDidMount() {
    // start timer to check for new day
    this.timer = setInterval(() => this._checkTime(), 1000);
    Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.appWrap}>
        <View style={styles.weightRow}>
          <View style={styles.weightTextRow}>
            <View style={{ flexDirection: "row" }}>
              <Button
                style={{ marginRight: 10 }}
                title="Log State"
                onPress={this.props._logState}
              />
              <Button
                title="Next Date"
                onPress={() => {
                  this.props.selectDay(this.props.dayId, NEXT);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={this._toggleWeightPicker.bind(this)}
              style={styles.weightTextButton}
            >
              <McIcon name="scale-bathroom" size={34} />
              <Text
                style={
                  this.state.weightPickerOpen
                    ? styles.weightTextActive
                    : styles.weightText
                }
              >
                {this.props.weight}
              </Text>
              <Text
                style={
                  this.state.weightPickerOpen
                    ? styles.weightTextLabelActive
                    : styles.weightTextLabel
                }
              >
                lbs.
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.weightPickerOpen ? (
            <View style={styles.topBottomBorder}>
              <NumberSpinner
                value={this.props.weight}
                label="LBS."
                onValueChange={val =>
                  this.props.editWeight(this.props.dayId, val)
                }
              />
            </View>
          ) : null}
        </View>
        <ScrollView
          style={styles.bodyRow}
          onLayout={this._handleBodyRowLayout.bind(this)}
        >
          {this.state.bodyRowHeight ? (
            <NodeRows
              dayId={this.props.dayId}
              nodes={this.props.nodes}
              openPicker={this.state.openPicker}
              onShowPicker={nodeId => this._handleShowPicker(nodeId)}
              onTap={(nodeId, timestamp = new Date().getTime()) => {
                this.props.tapNode(nodeId, timestamp);
              }}
              onTapAndHold={nodeId =>
                this.props.tapAndHoldNode(nodeId, new Date().getTime())
              }
              onTapAndHoldSnack={nodeId =>
                this.props.tapAndHoldSnack(nodeId, new Date().getTime())
              }
              onEditSnackTime={(nodeId, timestamp) =>
                this.props.editSnackTime(nodeId, timestamp)
              }
              height={this.state.bodyRowHeight}
            />
          ) : null}
        </ScrollView>
        <View style={styles.footerRow}>
          <AddSnack
            onTap={() => {
              this.props.tapAddSnack(this.props.dayId, new Date().getTime());
            }}
          />
          {this.props.waterTracking ? (
            <WaterPie
              waterCount={this.props.waterCount}
              onTap={() => {
                this.props.tapWater(this.props.dayId, new Date().getTime());
              }}
              onTapAndHold={() => {
                this.props.tapAndHoldWater(this.props.dayId);
              }}
            />
          ) : null}
        </View>
        <Notification
          closeInterval={10000}
          iconApp={notificationIcon}
          ref={ref => {
            this.notification = ref;
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const dayId = _getSelectedDayId(state);
  const dayObj = _getDayById(state, dayId);
  const nodes = _getNodesByIds(state, dayObj.nodeIds);
  const isToday = dayId === getDateKey();
  const waterTracking = _getWaterTrackingState(state);
  return {
    dayId,
    waterCount: dayObj.water.completedTimes.length,
    nodes,
    isToday,
    waterTracking,
    weight: dayObj.weight,
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
    tapAndHoldSnack: (nodeId, time) => {
      dispatch(tapAndHoldSnack(nodeId, time));
    },
    editSnackTime: (nodeId, time) => {
      dispatch(editSnackTime(nodeId, time));
    },
    tapAddSnack: (dayId, time) => {
      dispatch(tapAddSnack(dayId, time));
    },
    editWeight: (dayId, weight) => {
      dispatch(editWeight(dayId, weight));
    },
    selectDay: (dayId, dir) => {
      const newDayId = getAdjacentDateKey(dayId, dir);
      dispatch(selectDay(newDayId));
    },
    _logState: () => {
      dispatch(_logState());
    },
  };
};

const styles = StyleSheet.create({
  appWrap: {
    backgroundColor: "rgb(245, 245, 245)",
    flex: 1,
  },
  box: {
    backgroundColor: "rgb(102, 102, 102)",
    height: 50,
  },
  topBottomBorder: {
    borderColor: "#acacac",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  weightRow: {
    flexDirection: "column",
    marginTop: 12,
  },
  weightTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weightTextButton: {
    marginRight: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  weightText: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 6,
  },
  weightTextActive: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 6,
    color: Colors.textRed,
  },
  weightTextLabel: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 2,
  },
  weightTextLabelActive: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 2,
    color: Colors.textRed,
  },
  bodyRow: {
    flex: 1,
  },
  titleRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginRight: 14,
  },
  titleRowLeft: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRowRight: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
