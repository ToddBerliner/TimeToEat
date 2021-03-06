import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  PickerIOS,
  ScrollView,
  Animated,
  SafeAreaView,
  Dimensions,
  Modal,
  StatusBar,
} from "react-native";
import EmptyPlan from "../components/EmptyPlan";
import AddSnack from "../components/AddSnack";
import NodeRows from "../components/NodeRows";
import TitleDateNav from "../containers/TitleDateNav";
import NumberSpinner from "../components/NumberSpinner";
import MapIntro from "../components/MapIntro";
import HeaderShadow from "../components/HeaderShadow";
import TteNotificationBody from "../components/TteNotificationBody";
import {
  _getSelectedDayId,
  _getWaterTrackingState,
  _getWeightTrackingState,
  _getDayById,
  _getNodesByIds,
} from "../store/reducer";
import { PLAN, OFFPLAN } from "../store/nodes/reducer";
import {
  selectDay,
  readIntro,
  getIntroReadState,
  getScheme,
  NUTS,
} from "../store/uiState/reducer";
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
  isXSize,
  PREV,
  NEXT,
} from "../utils";
import { _logState } from "../store/reducer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { Notifications, Permissions } from "expo";
import Colors, { HeaderColors } from "../styles/colors";
import { Schemes, MapScreenStyles } from "../styles/styles";
const backgrounds = {
  board_lt: require("../../assets/board_lt.png"),
  herbs_lt: require("../../assets/herbs_lt.png"),
  nuts: require("../../assets/nuts.png"),
};

import Notification from "react-native-in-app-notification";
const notificationIcon = require("../../assets/notification_icon.png");

// MapScreen is a route in the App
class MapScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const isSe = isSeSize();
    const { navigate } = navigation;
    const { scheme } = screenProps;
    return {
      headerTitle: <TitleDateNav scheme={scheme} />,
      headerStyle: Schemes[scheme].header,
      headerLeft: (
        <View style={MapScreenStyles.headerSide}>
          <TouchableOpacity
            onPress={() => {
              navigate("Menu");
            }}
            style={MapScreenStyles.headerButton}
          >
            <Ionicons
              name="ios-contact-outline"
              size={24}
              color={HeaderColors[scheme]}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View style={MapScreenStyles.headerSide}>
          <TouchableOpacity
            onPress={() => {
              navigate("Metrics");
            }}
            style={MapScreenStyles.headerButton}
          >
            <Ionicons
              name="ios-calendar-outline"
              size={24}
              style={{ position: "absolute" }}
              color={HeaderColors[scheme]}
            />
          </TouchableOpacity>
        </View>
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
      introVisible: false,
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

  _closeNotification = () => {
    this.notification.closeNotification();
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

  _openIntro = () => {
    this.setState({ introVisible: true });
  };

  _closeIntro = () => {
    this.props.readIntro();
    this.setState({ introVisible: false });
  };

  async componentDidMount() {
    // start timer to check for new day
    this.timer = setInterval(() => this._checkTime(), 1000);
    Notifications.addListener(this._handleNotification);
    if (!this.props.introRead) {
      setTimeout(this._openIntro, 550);
    }
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
    const { scheme } = this.props;
    const statusBarStyle = scheme === NUTS ? "light-content" : "dark-content";
    StatusBar.setBarStyle(statusBarStyle);
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
    const isX = isXSize();
    return (
      <View style={MapScreenStyles.appWrap}>
        <Image
          resizeMode="cover"
          style={MapScreenStyles.bg}
          source={backgrounds[scheme]}
        />
        <HeaderShadow />
        <View style={MapScreenStyles.weightRow}>
          <View style={MapScreenStyles.weightTextRow}>
            {this.props.weightTracking && (
              <TouchableOpacity
                onPress={this._toggleWeightPicker.bind(this)}
                style={MapScreenStyles.weightTextButton}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    { color: Colors[scheme] },
                    this.state.weightPickerOpen
                      ? MapScreenStyles.weightTextActive
                      : MapScreenStyles.weightText,
                  ]}
                >
                  {this.props.weight} lbs.
                </Text>
                <MaterialCommunityIcons
                  name="scale-bathroom"
                  size={24}
                  color={Colors[scheme]}
                  style={MapScreenStyles.weightButtonIcon}
                />
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
                scheme={scheme}
                dayId={this.props.dayId}
                nodes={this.props.nodes}
                openPicker={this.state.openPicker}
                onShowPicker={nodeId => this._handleShowPicker(nodeId)}
                onTap={(nodeId, timestamp = new Date().getTime()) => {
                  this._closeNotification();
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
                dayId={this.props.dayId}
              />
            )
          ) : null}
        </ScrollView>
        <View
          style={isX ? MapScreenStyles.footerRowX : MapScreenStyles.footerRow}
        >
          <AddSnack
            scheme={scheme}
            onTap={() => {
              this.props.tapAddSnack(this.props.dayId, new Date().getTime());
            }}
          />
        </View>
        <Notification
          closeInterval={60000}
          ref={ref => {
            this.notification = ref;
          }}
          notificationBodyComponent={TteNotificationBody}
        />
        <MapIntro
          visible={this.state.introVisible}
          onClose={this._closeIntro}
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
  const weightTracking = _getWeightTrackingState(state);
  const introRead = getIntroReadState(state.uiState);
  const scheme = getScheme(state.uiState);
  return {
    dayId,
    waterCount: dayObj.water.completedTimes.length,
    nodes,
    isToday,
    waterTracking,
    weightTracking,
    weight: dayObj.weight,
    introRead,
    scheme,
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
    readIntro: (read = true) => {
      dispatch(readIntro(read));
    },
    _logState: () => {
      dispatch(_logState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
