import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateBackButton from "../components/DateBackButton";
import { Calendar } from "react-native-calendars";
import Colors from "../styles/colors";
import { getDateKey, getColorFromNodes, getDateKeyForCal } from "../utils";
import {
  getFirstDayId,
  getLastDayId,
  getAllDayIdsInOrder,
} from "../store/days/reducer";
import { getNodesByIds, OFFPLAN } from "../store/nodes/reducer";
import { selectDay } from "../store/uiState/reducer";
import { FormSettings, SectionStyles } from "../styles/formStyles";

class MetricsScreen extends React.Component {
  /*
    Calendar TODO:
      ✔ minDate = first date in state.days
      ❍ month nav buttons - only allow scroll to months in state
      ✔ day tap = selectDay (if not disabled)
      ✔ markedDates for state
      ❍ make dot and period marking PR?
      ❍ at least color text of days w/ off plan snacks
      ❍ suggestions! (eg, you have a lot of off-plan snacks - update your plan)
      ❍ on time stats - separate chart below calendar

      Add prop to control month nav arrows based on minMax dates
      - hide next/back arrows if the current month is the min or max date month
      https://github.com/wix/react-native-calendars/blob/master/src/calendar/header/index.js

  */
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

  // calculate day markings
  _calculateMarkedDates(daysState, nodesState) {
    /*
      Calculating day colors
      - green 100%
      - yellow 51-99%
      - red 0-50%

      For each day, in order, get nodes
      - count tracked nodes
      - count completed nodes
      - calc completed/tracked
      - update days.daysById[dayId].color
      - update previous days endingDay value
    */
    const markedDates = {};
    const orderedDayIds = getAllDayIdsInOrder(daysState);

    let prevDayId = null;
    let prevColor = null;
    const todayKey = getDateKey();

    for (const dayId of orderedDayIds) {
      const calDateKey = getDateKeyForCal(dayId);

      // failsafe to not mark days in future
      if (dayId === todayKey) {
        // mark today
        markedDates[calDateKey] = {
          color: Colors.calBlue,
          startingDay: true,
          endingDay: true,
          textColor: "white",
        };
        // ensure previous day is endingDay
        if (markedDates[prevDayId]) {
          markedDates[prevDayId].endingDay = true;
        }
        break;
      }
      const nodeIds = daysState.daysById[dayId].nodeIds;
      const nodes = getNodesByIds(nodesState, nodeIds);

      // calc color
      const color = getColorFromNodes(nodes);
      // create and update dayConfig
      const day = { color, endingDay: true };
      const dayConfig = { color };
      // calculate starting and ending day values
      if (prevColor !== color) {
        dayConfig.startingDay = true;
      } else {
        dayConfig.startingDay = false;
      }
      if (prevColor !== color && markedDates[prevDayId]) {
        markedDates[prevDayId].endingDay = true;
      }
      // set dayConfig into markedDates & set prev values for next iteration
      markedDates[calDateKey] = dayConfig;
      prevDayId = calDateKey;
      prevColor = color;
    }
    return markedDates;
  }

  _handleDayPress = day => {
    if (!day || !day.timestamp) return;
    const dayId = getDateKey(new Date(day.year, day.month - 1, day.day));
    if (dayId >= getDateKey()) return;
    this.props.selectDay(dayId);
    this.props.navigation.goBack();
  };

  _legend = (text, color, idx) => {
    return (
      <View
        key={`lv${idx}`}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: FormSettings.textMarginLeft,
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 7,
            backgroundColor: color,
          }}
        />
        <Text style={[SectionStyles.sectionTitle, { marginBottom: 0 }]}>
          {text}
        </Text>
      </View>
    );
  };

  render() {
    const { firstDayId, lastDayId, days, nodes } = this.props;
    const markedDates = this._calculateMarkedDates(days, nodes);
    const legends = [
      {
        text: "PERFECT!",
        color: Colors.calGreen,
      },
      {
        text: "50%+",
        color: Colors.calYellow,
      },
      {
        text: "< 50% OR OFF PLAN SNACKS",
        color: Colors.calRed,
      },
    ].map((legendDef, idx) =>
      this._legend(legendDef.text, legendDef.color, idx),
    );
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "rgb(245, 245, 245)",
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontFamily: "fugaz-one-regular",
            fontSize: 36,
            marginLeft: FormSettings.textMarginLeft,
            marginBottom: 20,
          }}
        >
          How You're Eating
        </Text>
        <View
          style={{
            width: "100%",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            backgroundColor: "white",
            borderColor: "#D3D3D3",
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Calendar
            style={{ width: "90%", alignSelf: "center" }}
            markedDates={markedDates}
            minDate={new Date(parseInt(firstDayId, 10))}
            markingType={"period"}
            onDayPress={this._handleDayPress.bind(this)}
            hideExtraDays={true}
          />
        </View>
        {legends}
      </View>
    );
  }
}

mapStateToProps = state => {
  const firstDayId = getFirstDayId(state.days);
  const lastDayId = getLastDayId(state.days);
  const { days, nodes } = state;
  return {
    firstDayId,
    lastDayId,
    days,
    nodes,
  };
};
mapDispatchToProps = dispatch => {
  return {
    selectDay: dayId => {
      dispatch(selectDay(dayId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricsScreen);
