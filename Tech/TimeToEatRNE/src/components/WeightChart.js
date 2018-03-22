import React from "react";
import { View, Stylesheet, Text } from "react-native";
import PropTypes from "prop-types";
import { LineChart } from "react-native-svg-charts";
import { Circle, G } from "react-native-svg";

import Colors from "../styles/colors";

/*
  LineChart - daily data, 7 day points, today point
*/

export default class WeightChart extends React.PureComponent {
  render() {
    // get number of days in month
    const numDays = new Date(
      this.props.calYear,
      this.props.calMonth, // already 1 month "ahead" due to calMonth being 1 index
      0,
    ).getDate();
    const dayWidth = this.props.width / numDays;

    // dayKey format 2018-03-08
    const monthKey =
      this.props.calMonth.toString().length === 1
        ? `0${this.props.calMonth}`
        : this.props.calMonth;
    const dayKeyBase = `${this.props.calYear}-${monthKey}-`;

    // build days
    const data = [];
    let firstPointIdx = null;
    let lastPointIdx = null;
    let circles = [];
    let datumCount = 0;
    for (const day = 1; day <= numDays; day++) {
      const dayKeyDay = day.toString().length === 1 ? `0${day}` : day;
      const dayKey = `${dayKeyBase}${dayKeyDay}`;
      const weight =
        this.props.markedDates[dayKey] && this.props.markedDates[dayKey].weight
          ? this.props.markedDates[dayKey].weight
          : undefined;
      if (typeof weight !== "undefined") {
        datumCount++;
      }
      if (firstPointIdx === null && typeof weight !== "undefined") {
        firstPointIdx = day - 1;
      }
      if (weight) {
        lastPointIdx = day - 1;
      }
      if (day % 4 === 0 && typeof weight !== "undefined") {
        circles.push(day - 1);
      }
      data.push(weight);
    }

    if (datumCount === 0) {
      return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: Colors.borderGrey,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingLeft: 5,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.grey,
              fontSize: 14,
              fontFamily: "System",
            }}
          >
            NO WEIGHTS RECORDED YET THIS MONTH
          </Text>
        </View>
      );
    }

    const StartEndDots = ({ x, y }) => {
      return (
        <G key="startEndDots">
          <Circle
            key="start"
            x={x(firstPointIdx)}
            cy={y(data[firstPointIdx])}
            r={6}
            stroke={Colors.grey}
            strokeWidth={2}
            fill={"white"}
          />
          {circles.map(idx => (
            <Circle
              key={`c${idx}`}
              x={x(idx)}
              cy={y(data[idx])}
              r={4}
              stroke={Colors.grey}
              strokeWidth={2}
              fill={"white"}
            />
          ))}
          <Circle
            key="end"
            x={x(lastPointIdx)}
            cy={y(data[lastPointIdx])}
            r={6}
            stroke={Colors.grey}
            strokeWidth={2}
            fill={Colors.calBlue}
          />
        </G>
      );
    };

    return (
      <View
        style={{
          width: this.props.width,
          height: this.props.height,
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderColor: Colors.borderGrey,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <LineChart
          style={{ flex: 1 }}
          data={data}
          svg={{
            stroke: Colors.grey,
            strokeWidth: 2,
          }}
          showGrid={false}
          contentInset={{
            top: 10,
            bottom: 10,
            left: Math.ceil(this.props.width / numDays / 2),
            right: Math.ceil(this.props.width / numDays / 2),
          }}
          extras={[StartEndDots]}
        />
        <View style={{ height: 14 }}>
          <Text
            style={{
              position: "absolute",
              bottom: 2,
              left: dayWidth * firstPointIdx + 1 - 3,
              fontSize: 12,
              letterSpacing: -1,
              color: Colors.grey,
              textAlign: "center",
            }}
          >
            {data[firstPointIdx]} lbs.
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 2,
              left: dayWidth * lastPointIdx + 1 - 3,
              fontSize: 12,
              letterSpacing: -1,
              color: Colors.grey,
              textAlign: "center",
            }}
          >
            {data[lastPointIdx]} lbs.
          </Text>
        </View>
      </View>
    );
  }
}

WeightChart.propTypes = {
  calMonth: PropTypes.number,
  calYear: PropTypes.number,
  markedDates: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

WeightChart.defaultProps = {
  calMonth: new Date().getMonth() + 1,
  calyear: new Date().getFullYear(),
  markedDates: {},
  width: "100%",
  height: 55,
};
