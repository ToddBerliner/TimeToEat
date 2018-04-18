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
  Animated,
  SafeAreaView,
  Dimensions,
} from "react-native";
import EmptyPlan from "../components/EmptyPlan";
import AddSnack from "../components/AddSnack";
import WaterPie from "../components/WaterPie";
import NodeRows from "../components/NodeRows";
import TitleDateNav from "../containers/TitleDateNav";
import NumberSpinner from "../components/NumberSpinner";
import {
  _getSelectedDayId,
  _getWaterTrackingState,
  _getWeightTrackingState,
  _getDayById,
  _getNodesByIds,
} from "../store/reducer";
import { PLAN, OFFPLAN } from "../store/nodes/reducer";
import { selectDay } from "../store/uiState/reducer";
import { tapWater, tapAndHoldWater, editWeight } from "../store/days/reducer";
import { nodeRowHeight } from "../components/NodeRow";
import { snackRowHeight } from "../components/SnackNodeRow";
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
  isSeSize,
  PREV,
  NEXT,
} from "../utils";
import { _logState } from "../store/reducer";
import Icon from "react-native-vector-icons/Ionicons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigator } from "react-navigation";
import { Notifications, Permissions } from "expo";
import Colors from "../styles/colors";
import { MapScreenStyles } from "../styles/styles";

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
        backgroundColor: "white",
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
          <Icon
            name="ios-speedometer"
            size={24}
            style={{ alignSelf: "flex-end" }}
          />
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
      weightPickerAnimated: new Animated.Value(0),
      bodyRowHeight: false,
      pickerAnims: {},
    };
    props.nodes.forEach(node => {
      this.state.pickerAnims[node.id] = new Animated.Value(0);
    });
  }

  // NOTE: moving to scoped arrow functions - TODO: update remainder throughout
  _resetPickerAnims = nodes => {
    const pickerAnims = {};
    const openPicker = null;
    const weightPickerOpen = false;
    const weightPickerAnimated = new Animated.Value(0);
    nodes.forEach(node => {
      pickerAnims[node.id] = new Animated.Value(0);
    });
    this.setState({
      pickerAnims,
      openPicker,
    });
  };

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
    this.setState(
      prevState => {
        return {
          openPicker: null,
          weightPickerOpen: !prevState.weightPickerOpen,
        };
      },
      () => {
        const toValue = this.state.weightPickerOpen ? 1 : 0;
        Animated.timing(this.state.weightPickerAnimated, {
          toValue,
          duration: 150,
        }).start();
        for (let nodeId in this.state.pickerAnims) {
          Animated.timing(this.state.pickerAnims[nodeId], {
            toValue: 0,
            duration: 150,
          }).start();
        }
      },
    );
  }

  _handleShowPicker(nodeId) {
    this.setState(
      prevState => {
        return {
          openPicker: prevState.openPicker === nodeId ? null : nodeId,
          weightPickerOpen: false,
        };
      },
      () => {
        const toValue = this.state.weightPickerOpen ? 1 : 0;
        Animated.timing(this.state.weightPickerAnimated, {
          toValue,
          duration: 150,
        }).start();
        for (let nodeId in this.state.pickerAnims) {
          Animated.timing(this.state.pickerAnims[nodeId], {
            toValue: this.state.openPicker === nodeId ? 1 : 0,
            duration: 150,
          }).start();
        }
      },
    );
  }

  _handleBodyRowLayout(evt) {
    const d = Dimensions.get("window");
    const { width, height } = d;
    const isX = width === 812 || height === 812;
    const minus = isX ? 40 : 10;
    const bodyRowHeight = evt.nativeEvent.layout.height - minus;
    this.setState(prevState => {
      if (!prevState.bodyRowHeight) {
        return {
          bodyRowHeight: bodyRowHeight,
          scrollContentHeight: this._calcScrollContentHeight(
            this.props.nodes,
            bodyRowHeight,
          ),
        };
      }
    });
  }

  _setScrollContentHeight = nodes => {
    const scrollContentHeight = this._calcScrollContentHeight(nodes);
    this.setState({
      scrollContentHeight,
    });
  };

  _calcScrollContentHeight = (
    nodes,
    bodyRowHeight = this.state.bodyRowHeight,
  ) => {
    let height = 0;
    nodes.forEach(node => {
      height += node.type === PLAN ? nodeRowHeight : snackRowHeight;
    });
    return bodyRowHeight > height ? bodyRowHeight : height;
  };

  async componentDidMount() {
    // start timer to check for new day
    this.timer = setInterval(() => this._checkTime(), 1000);
    Notifications.addListener(this._handleNotification);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.weightPickerOpen && this.props.dayId !== nextProps.dayId) {
      this.setState({ weightPickerOpen: false }, () => {
        Animated.timing(this.state.weightPickerAnimated, {
          toValue: 0,
          duration: 0,
        }).start();
      });
    }
    this._resetPickerAnims(nextProps.nodes);
    this._setScrollContentHeight(nextProps.nodes);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const trackedMeals = this.props.nodes.filter(node => node.tracking);
    const heightInterpolate = this.state.weightPickerAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 217],
    });
    const nodeHeights = {};
    for (let nodeId in this.state.pickerAnims) {
      nodeHeights[nodeId] = this.state.pickerAnims[nodeId].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 217],
      });
    }
    const isSe = isSeSize();
    return (
      <SafeAreaView style={MapScreenStyles.appWrap}>
        <View style={MapScreenStyles.weightRow}>
          <View style={MapScreenStyles.weightTextRow}>
            {this.props.weightTracking && (
              <TouchableOpacity
                onPress={this._toggleWeightPicker.bind(this)}
                style={MapScreenStyles.weightTextButton}
              >
                <Text
                  style={
                    this.state.weightPickerOpen
                      ? MapScreenStyles.weightTextActive
                      : MapScreenStyles.weightText
                  }
                >
                  {this.props.weight} lbs.
                </Text>
                <McIcon name="scale-bathroom" size={isSe ? 24 : 34} />
              </TouchableOpacity>
            )}
          </View>
          <Animated.View
            style={{ overflow: "hidden", height: heightInterpolate }}
          >
            <View style={[MapScreenStyles.topBottomBorder]}>
              <NumberSpinner
                value={this.props.weight}
                label="LBS."
                onValueChange={val => {
                  this.props.editWeight(this.props.dayId, val);
                }}
              />
            </View>
          </Animated.View>
        </View>
        <ScrollView
          style={MapScreenStyles.bodyRow}
          onLayout={this._handleBodyRowLayout.bind(this)}
        >
          {this.state.bodyRowHeight ? (
            trackedMeals.length > 0 ? (
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
                pickerHeights={nodeHeights}
                height={this.state.scrollContentHeight}
                scrollingRequired={
                  this.state.bodyRowHeight < this.state.scrollContentHeight
                }
              />
            ) : (
              <EmptyPlan
                navigate={this.props.navigation.navigate}
                height={this.state.scrollContentHeight}
              />
            )
          ) : null}
        </ScrollView>
        <View style={MapScreenStyles.footerRow}>
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const dayId = _getSelectedDayId(state);
  const dayObj = _getDayById(state, dayId);
  const nodes = _getNodesByIds(state, dayObj.nodeIds);
  const isToday = dayId === getDateKey();
  const waterTracking = _getWaterTrackingState(state);
  const weightTracking = _getWeightTrackingState(state);
  return {
    dayId,
    waterCount: dayObj.water.completedTimes.length,
    nodes,
    isToday,
    waterTracking,
    weightTracking,
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

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
