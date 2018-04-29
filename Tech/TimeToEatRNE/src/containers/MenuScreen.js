import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Switch,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { clearSavedState } from "../store/configureStore";
import DateBackButton from "../components/DateBackButton";
import TteButton from "../components/TteButton";
import {
  _getWaterTrackingState,
  _getWeightTrackingState,
  _getNotificationsState,
} from "../store/reducer";
import {
  toggleWaterTracking,
  toggleWeightTracking,
  toggleNotifications,
  getScheme,
} from "../store/uiState/reducer";
import { editMeal, NAME, TIME, TRACKING } from "../store/plan/reducer";
import {
  getFriendlyTime,
  getTimestampFromTimeObj,
  getDateKey,
  getTimeObjFromDate,
} from "../utils";
import Line from "../components/forms/Line";
import SwitchRow from "../components/forms/SwitchRow";
import TextAndTimeRow from "../components/forms/TextAndTimeRow";
import HeaderShadow from "../components/HeaderShadow";
import {
  FormSettings,
  SectionStyles,
  SCStyles,
  DPStyles,
  TIStyles,
} from "../styles/formStyles";
import { MenuScreenStyles, TextStyles, Schemes } from "../styles/styles";
import Colors, { HeaderColors, BackgroundColors } from "../styles/colors";
import { Notifications, Permissions } from "expo";

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { dayId, scheme } = screenProps;
    return {
      headerTitle: null,
      headerStyle: [
        {
          paddingRight: 12,
          paddingLeft: 12,
        },
        Schemes[scheme].header,
      ],
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()} dayId={dayId}>
          <Text
            style={{
              fontFamily: "fugaz-one-regular",
              color: HeaderColors[scheme],
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      notificationsDisabled: false,
      openPicker: null,
      nodeIds: [],
    };
    props.plan.days["Monday"].nodes.forEach((node, idx) => {
      const nodeId = idx.toString();
      this.state.nodeIds.push(nodeId);
      this.state[nodeId] = new Animated.Value(0);
    });
  }

  goToPrivacy = () => {
    Linking.openURL("https://github.com/ToddBerliner/TimeToEat");
  };

  goToTos = () => {
    Linking.openURL("https://github.com/ToddBerliner/TimeToEat");
  };

  handleShowPicker(mealIdx) {
    this.setState(
      prevState => {
        return {
          openPicker: prevState.openPicker === mealIdx ? null : mealIdx,
        };
      },
      () => {
        this.state.nodeIds.forEach(nodeId => {
          Animated.timing(this.state[nodeId.toString()], {
            toValue:
              nodeId === mealIdx.toString() && this.state.openPicker === mealIdx
                ? 1
                : 0,
            duration: 150,
          }).start();
        });
      },
    );
  }

  handleToggleWater(waterToggleState) {
    this.props.toggleWater(waterToggleState);
  }

  handleToggleWeight(weightToggleState) {
    this.props.toggleWeight(weightToggleState);
  }

  handleToggleNotifications(notificationsState) {
    this.props.toggleNotifications(notificationsState);
  }

  handleChange(mealIdx, field, event) {
    let value = null;
    if (field === TIME) {
      value = getTimeObjFromDate(event);
    }
    if (field === NAME) {
      value = event.nativeEvent.text;
    }
    if (field === TRACKING) {
      value = event;
    }
    if (value !== null) {
      this.props.editMeal(mealIdx, field, value);
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      this.setState({ notificationsDisabled: true });
    }
  }

  render() {
    const {
      waterTracking,
      weightTracking,
      plan,
      notifications,
      mealsOnly,
      navigation,
      scheme,
    } = this.props;
    const { nodes } = plan.days.Monday;
    const pickerHeights = {};
    nodes.forEach((node, idx) => {
      const nodeId = idx.toString();
      pickerHeights[nodeId] = this.state[nodeId].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 217],
      });
      pickerHeights[`${nodeId}wrap`] = this.state[nodeId].interpolate({
        inputRange: [0, 1],
        outputRange: [
          FormSettings.defaultCellHeight,
          217 + FormSettings.defaultCellHeight,
        ],
      });
    });
    const meals = [];
    nodes.forEach((node, idx, nodesArr) => {
      const { name, time, tracking } = node;
      const ts = getTimestampFromTimeObj(getDateKey(), time);
      const cuteDate = getFriendlyTime(ts);
      const date = new Date(ts);
      const nodeId = idx.toString();
      const mealRow = (
        <TextAndTimeRow
          key={`timeAndTextRow${idx}`}
          idx={idx}
          value={name}
          tracking={tracking}
          date={date}
          cuteDate={cuteDate}
          onChange={this.handleChange.bind(this, idx, NAME)}
          onDateChange={this.handleChange.bind(this, idx, TIME)}
          onTrackingchange={this.handleChange.bind(this, idx, TRACKING)}
          onShowPicker={this.handleShowPicker.bind(this, idx)}
          isPickerShowing={this.state.openPicker === idx}
          pickerHeight={pickerHeights[nodeId]}
          pickerWrapHeight={pickerHeights[`${nodeId}wrap`]}
        />
      );
      if (idx < nodesArr.length - 1) {
        meals.push(
          <View key={`wrap${idx}`}>
            {mealRow}
            <Line key={`line${idx}`} marginLeft={FormSettings.textMarginLeft} />
          </View>,
        );
      } else {
        meals.push(mealRow);
      }
    });

    if (mealsOnly) {
      return (
        <View style={SectionStyles.container}>
          <Line />
          <View style={SectionStyles.sectionWrapper}>{meals}</View>
          <Line />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={[
              MenuScreenStyles.settingsWrap,
              { backgroundColor: BackgroundColors[scheme] },
            ]}
          >
            <TouchableOpacity onPress={clearSavedState}>
              <Text style={[MenuScreenStyles.title, { color: Colors[scheme] }]}>
                Make a Plan
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View style={SectionStyles.container}>
                <View>
                  <Text style={SectionStyles.sectionTitle}>MEALS TO TRACK</Text>
                  <View style={SectionStyles.sectionWrapper}>{meals}</View>
                  <Text
                    key={"mealsToTrackHelpText"}
                    style={SectionStyles.sectionHelpText}
                  >
                    Rename or edit the time for each.
                  </Text>
                </View>
              </View>
              <View style={SectionStyles.container}>
                <Text style={SectionStyles.sectionTitle}>
                  TIME TO EAT OPTIONS
                </Text>
                <View style={SectionStyles.sectionWrapper}>
                  <SwitchRow
                    switchTitle="Track Weight"
                    onValueChange={this.handleToggleWeight.bind(this)}
                    value={weightTracking}
                  />
                  <Line marginLeft={FormSettings.textMarginLeft} />
                  <SwitchRow
                    switchTitle="Notifications"
                    onValueChange={this.handleToggleNotifications.bind(this)}
                    value={notifications}
                  />
                  {this.state.notificationsDisabled && (
                    <View style={MenuScreenStyles.notificationsMsgWrap}>
                      <Text style={{ fontWeight: "700", marginBottom: 4 }}>
                        Notifications Are Currently Off
                      </Text>
                      <Text>
                        Time to Eat Notifications are not allowed in your
                        Settings. Please go to{` `}
                        <Text style={{ fontWeight: "bold" }}>
                          Settings > Time to Eat > Notifications
                        </Text>
                        {` `}and turn on "Allow Notifications".
                      </Text>
                    </View>
                  )}
                </View>
                <View style={MenuScreenStyles.helpButtonRow}>
                  <TteButton
                    iconName="ios-help-circle-outline"
                    style={{ width: "80%" }}
                    title="Help"
                    onPress={() => navigation.navigate("Help")}
                  />
                </View>
                <View style={MenuScreenStyles.linkRow}>
                  <TouchableOpacity onPress={this.goToPrivacy}>
                    <Text style={TextStyles.link}>Privacy Policy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.goToTos}>
                    <Text style={TextStyles.link}>Terms of Service</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <HeaderShadow />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const waterTracking = _getWaterTrackingState(state);
  const weightTracking = _getWeightTrackingState(state);
  const notifications = _getNotificationsState(state);
  const scheme = getScheme(state.uiState);
  const { plan } = state;
  return { waterTracking, weightTracking, notifications, plan, scheme };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleWater: waterToggleState => {
      dispatch(toggleWaterTracking(waterToggleState));
    },
    toggleWeight: weightToggleState => {
      dispatch(toggleWeightTracking(weightToggleState));
    },
    toggleNotifications: notificationsState => {
      dispatch(toggleNotifications(notificationsState));
    },
    editMeal: (mealIdx, field, value) => {
      dispatch(editMeal(mealIdx, field, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
