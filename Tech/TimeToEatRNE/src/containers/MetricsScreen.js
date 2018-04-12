import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  MaskedViewIOS,
  Dimensions,
} from "react-native";
import DateBackButton from "../components/DateBackButton";
import { Calendar } from "react-native-calendars";
import Colors from "../styles/colors";
import WeightChart from "../components/WeightChart";
import DayChart from "../components/DayChart";
import DateLabel from "../components/DateLabel";
import {
  getMonth,
  getDateKey,
  getColorFromNodes,
  getDateKeyForCal,
  isSeSize,
} from "../utils";
import {
  getFirstDayId,
  getLastDayId,
  getAllDayIdsInOrder,
  getDayById,
} from "../store/days/reducer";
import { _getWeightTrackingState } from "../store/reducer";
import { getNodesByIds, OFFPLAN } from "../store/nodes/reducer";
import { selectDay } from "../store/uiState/reducer";
import { FormSettings, SectionStyles } from "../styles/formStyles";
import { whiteBlock, MetricsScreenStyles } from "../styles/styles";

const isSe = isSeSize();

class MetricsScreen extends React.Component {
  constructor(props) {
    super(props);
    const curDate = new Date();
    this.state = {
      calMonth: curDate.getMonth() + 1,
      calYear: curDate.getFullYear(),
      daysInMonth: new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1, // already 1 month "ahead" due to calMonth being 1 index
        0,
      ).getDate(),
    };
  }
  /*
    Calendar TODO:
      ✔ minDate = first date in state.days
      ✔ month nav buttons - only allow scroll to months in state
      ✔ day tap = selectDay (if not disabled)
      ✔ markedDates for state
      ❍ make dot and period marking PR?
      ❍ at least color text of days w/ off plan snacks
      ❍ suggestions! (eg, you have a lot of off-plan snacks - update your plan)
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
    const markedDates = {};
    const orderedDayIds = getAllDayIdsInOrder(daysState);

    let prevDayId = null;
    let prevDayIsContiguous = false;
    let prevColor = null;
    const todayKey = getDateKey();

    for (const dayId of orderedDayIds) {
      const calDateKey = getDateKeyForCal(dayId);
      const dayObj = getDayById(daysState, dayId);

      if (prevDayId !== null) {
        let thisDay = new Date(parseInt(dayId, 10));
        thisDay.setDate(thisDay.getDate() - 1);
        prevDayIsContiguous = prevDayId === getDateKeyForCal(thisDay);
      }

      // failsafe to not mark days in future
      if (dayId === todayKey) {
        // mark today
        markedDates[calDateKey] = {
          color: Colors.ltGrey,
          startingDay: true,
          endingDay: true,
          weight: dayObj.weight,
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
      const dayConfig = { color, weight: dayObj.weight };
      // calculate starting and ending day values
      if (prevColor !== color || !prevDayIsContiguous) {
        dayConfig.startingDay = true;
      } else {
        dayConfig.startingDay = false;
      }
      if (
        (prevColor !== color || !prevDayIsContiguous) &&
        markedDates[prevDayId]
      ) {
        markedDates[prevDayId].endingDay = true;
      }
      // set dayConfig into markedDates & set prev values for next iteration
      markedDates[calDateKey] = dayConfig;
      prevDayId = calDateKey;
      prevColor = color;
    }
    return markedDates;
  }

  _handleDayPress(day) {
    if (!day || !day.timestamp) return;
    const dayId = getDateKey(new Date(day.year, day.month - 1, day.day));
    // ignore taps on future days
    if (dayId >= getDateKey()) return;
    this.props.selectDay(dayId);
    this.props.navigation.goBack();
  }

  _handleMonthChange(month) {
    this.setState({
      calMonth: month.month,
      calYear: month.year,
      daysInMonth: new Date(month.year, month.month, 0).getDate(),
    });
  }

  _legend = (text, color, idx) => {
    return (
      <View
        key={`lv${idx}`}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 8,
        }}
      >
        <View
          style={{
            width: isSe ? 12 : 15,
            height: isSe ? 12 : 15,
            borderRadius: 7,
            backgroundColor: color,
          }}
        />
        <Text style={{ fontSize: 12, color: "#808080", marginLeft: 4 }}>
          {text}
        </Text>
      </View>
    );
  };

  render() {
    const { firstDayId, lastDayId, days, nodes, weightTracking } = this.props;
    const markedDates = this._calculateMarkedDates(days, nodes);
    const { width } = Dimensions.get("window");
    const legends = [
      {
        text: "Perfect!",
        color: Colors.calGreen,
      },
      {
        text: "Missed Meals",
        color: Colors.calYellow,
      },
      {
        text: "Off Plan Snacks",
        color: Colors.calRed,
      },
    ].map((legendDef, idx) =>
      this._legend(legendDef.text, legendDef.color, idx),
    );
    return (
      <ScrollView style={MetricsScreenStyles.metricsWrap}>
        <Text style={MetricsScreenStyles.title}>How You're Eating</Text>
        <Text style={SectionStyles.sectionTitle}>MEAL TRACKING</Text>
        <View style={whiteBlock}>
          <Calendar
            style={{ width: "95%", alignSelf: "center" }}
            markedDates={markedDates}
            markingType={"period"}
            onDayPress={this._handleDayPress.bind(this)}
            hideExtraDays={true}
            onMonthChange={this._handleMonthChange.bind(this)}
            hideArrowsPastMinMaxMonths={true}
            minMonthDate={new Date(parseInt(firstDayId, 10))}
            maxMonthDate={new Date()}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {legends}
            </View>
          </View>
        </View>
        {weightTracking ? (
          <View style={{ flex: 1, marginTop: 8 }}>
            <Text style={SectionStyles.sectionTitle}>WEIGHT TRACKING</Text>
            <View
              style={[whiteBlock, { alignItems: "center", marginBottom: 22 }]}
            >
              <View
                style={{
                  width: width - FormSettings.textMarginLeft * 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.borderGrey,
                }}
              >
                <DateLabel
                  month={getMonth(this.state.calMonth - 1)}
                  day={1}
                  monthFontSize={12}
                  subFontSize={9}
                />
                <DateLabel
                  month={getMonth(this.state.calMonth - 1)}
                  day={this.state.daysInMonth}
                  monthFontSize={12}
                  subFontSize={9}
                />
              </View>
              <WeightChart
                width={width}
                markedDates={markedDates}
                calMonth={this.state.calMonth}
                calYear={this.state.calYear}
                style={{ marginTop: 0 }}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  const firstDayId = getFirstDayId(state.days);
  const lastDayId = getLastDayId(state.days);
  const weightTracking = _getWeightTrackingState(state);
  const { days, nodes } = state;
  return {
    firstDayId,
    lastDayId,
    days,
    nodes,
    weightTracking,
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
