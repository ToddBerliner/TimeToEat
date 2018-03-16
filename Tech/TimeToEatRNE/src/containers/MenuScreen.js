import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { clearSavedState } from "../store/configureStore";
import DateBackButton from "../components/DateBackButton";
import {
  _getWaterTrackingState,
  _getWeightTrackingState,
  _getNotificationsState,
} from "../store/reducer";
import {
  toggleWaterTracking,
  toggleWeightTracking,
  toggleNotifications,
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
import {
  FormSettings,
  SectionStyles,
  SCStyles,
  DPStyles,
  TIStyles,
} from "../styles/formStyles";
import { Notifications, Permissions } from "expo";

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { dayId } = screenProps;
    return {
      headerTitle: null,
      headerStyle: {
        paddingRight: 12,
        paddingLeft: 12,
      },
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()} dayId={dayId}>
          <Text style={{ fontFamily: "fugaz-one-regular" }}>Done</Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = { notificationsDisabled: false, openPicker: null };
  }

  handleShowPicker(mealIdx) {
    this.setState(prevState => {
      return {
        openPicker: prevState.openPicker === mealIdx ? null : mealIdx,
      };
    });
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
    } = this.props;
    const { nodes } = plan.days.Monday;

    const meals = [];
    nodes.forEach((node, idx, nodesArr) => {
      const { name, time, tracking } = node;
      const ts = getTimestampFromTimeObj(getDateKey(), time);
      const cuteDate = getFriendlyTime(ts);
      const date = new Date(ts);
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
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "rgb(245,245,245)",
            paddingTop: 20,
          }}
        >
          <TouchableOpacity onPress={clearSavedState}>
            <Text
              style={{
                fontFamily: "fugaz-one-regular",
                fontSize: 36,
                marginLeft: FormSettings.textMarginLeft,
              }}
            >
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
                TIME TO EAT SETTINGS
              </Text>
              <View style={SectionStyles.sectionWrapper}>
                <SwitchRow
                  switchTitle="Track Weight"
                  onValueChange={this.handleToggleWeight.bind(this)}
                  value={weightTracking}
                />
                <Line marginLeft={FormSettings.textMarginLeft} />
                <SwitchRow
                  switchTitle="Track Water"
                  onValueChange={this.handleToggleWater.bind(this)}
                  value={waterTracking}
                />
                <Line marginLeft={FormSettings.textMarginLeft} />
                <SwitchRow
                  switchTitle="Notifications"
                  onValueChange={this.handleToggleNotifications.bind(this)}
                  value={notifications}
                />
                {this.state.notificationsDisabled && (
                  <View
                    style={{
                      marginTop: 7,
                      marginLeft: 15,
                      marginRight: 15,
                      marginBottom: 15,
                    }}
                  >
                    <Text style={{ fontWeight: "700", marginBottom: 4 }}>
                      Notifications Are Currently Off
                    </Text>
                    <Text>
                      Notifications are turned off in your Settings. Please go
                      to Settings > Time to Eat and turn on Notifications.
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ height: 15 }} />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => {
  const waterTracking = _getWaterTrackingState(state);
  const weightTracking = _getWeightTrackingState(state);
  const notifications = _getNotificationsState(state);
  const { plan } = state;
  return { waterTracking, weightTracking, notifications, plan };
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
