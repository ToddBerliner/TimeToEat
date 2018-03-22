import React from "react";
import Colors from "../styles/colors";
import { View, MaskedViewIOS, Text } from "react-native";
import PropTypes from "prop-types";
import { getMonth } from "../utils";
import DateLabel from "./DateLabel";

export default class DayChart extends React.PureComponent {
  /*
  BarChart - same markings as calendar
  - get days in month
  - draw days using colors from markedDates
  */
  render() {
    // get number of days in month
    const numDays = new Date(
      this.props.calYear,
      this.props.calMonth, // already 1 month "ahead" due to calMonth being 1 index
      0,
    ).getDate();
    // dayKey format 2018-03-08
    const monthKey =
      this.props.calMonth.toString().length === 1
        ? `0${this.props.calMonth}`
        : this.props.calMonth;
    const dayKeyBase = `${this.props.calYear}-${monthKey}-`;

    // build days
    const days = [];
    for (const day = 1; day <= numDays; day++) {
      const isFuture = day > new Date().getDate();
      const dayKeyDay = day.toString().length === 1 ? `0${day}` : day;
      const dayKey = `${dayKeyBase}${dayKeyDay}`;
      days.push(
        <View
          key={`day${day}`}
          style={{
            width: Math.ceil(this.props.width / numDays),
            height: "100%",
            backgroundColor: this.props.markedDates[dayKey]
              ? this.props.markedDates[dayKey].color
              : isFuture ? "whitesmoke" : "white",
          }}
        />,
      );
    }

    // get date lables
    const monthText = getMonth(this.props.calMonth - 1);
    return (
      <View
        style={[
          {
            flexDirection: "column",
            height: "auto",
          },
          this.props.style,
        ]}
      >
        {this.props.showDateLabels && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: Math.ceil(this.props.height / 3),
              paddingRight: Math.ceil(this.props.height / 3),
            }}
          >
            <DateLabel month={monthText} day={1} />
            <DateLabel month={monthText} day={numDays} />
          </View>
        )}
        <View
          style={{
            height: this.props.height,
            borderColor: Colors.borderGrey,
            borderWidth: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <MaskedViewIOS
            style={{ flex: 1, flexDirection: "row", height: "100%" }}
            maskElement={
              <View
                style={{
                  backgroundColor: "black",
                  flex: 1,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
            }
          >
            {days}
          </MaskedViewIOS>
        </View>
      </View>
    );
  }
}

DayChart.propTypes = {
  calMonth: PropTypes.number,
  calYear: PropTypes.number,
  markedDates: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  showDateLabels: PropTypes.bool,
  style: PropTypes.object,
};

DayChart.defaultProps = {
  calMonth: new Date().getMonth() + 1,
  calyear: new Date().getFullYear(),
  markedDates: {},
  width: "100%",
  height: 15,
  showDateLabels: true,
  style: {},
};
