import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { AreaChart, XAxis, LineChart } from "react-native-svg-charts";
import { Svg } from "expo";
import DateLabel from "./DateLabel";
import { getMonth } from "../utils";

import Colors from "../styles/colors";

export default class WeightChart extends React.PureComponent {
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
    const data = [];
    const points = [];
    let firstPointIdx = null;
    let lastPointIdx = null;
    let datumCount = 0;
    for (const day = 1; day <= numDays; day++) {
      const dayKeyDay = day.toString().length === 1 ? `0${day}` : day;
      const dayKey = `${dayKeyBase}${dayKeyDay}`;
      const point =
        this.props.markedDates[dayKey] && this.props.markedDates[dayKey].weight
          ? {
              idx: day - 1,
              color: "white",
              weight: this.props.markedDates[dayKey].weight,
            }
          : undefined;
      if (typeof point !== "undefined") {
        datumCount++;
      }
      if (firstPointIdx === null && typeof point !== "undefined") {
        firstPointIdx = day - 1;
      }
      if (point) {
        lastPointIdx = day - 1;
      }
      points.push(point);
      data.push(point === undefined ? point : point.weight);
    }

    // build circles and weight labels
    const circles = [];
    const weightLabels = [];
    const textLabels = [];

    points.forEach((point, idx, points) => {
      if (typeof point !== "undefined") {
        // is this a 7th point - big circle + weight
        if (idx % 7 === 0) {
          point.r = 6;
          point.color = Colors.ltGrey;
          circles.push(point);
          weightLabels.push(point);
        } else if (
          // first or last points of a segment
          idx === lastPointIdx ||
          idx === firstPointIdx ||
          (idx > 1 && points[idx - 1] === undefined) ||
          (idx < points.length - 2 && points[idx + 1] === undefined)
        ) {
          point.r = 4;
          point.color = "white";
          circles.push(point);
          weightLabels.push(point);
        }
      }
    });

    let prevIdx = null;
    weightLabels.forEach(point => {
      if (prevIdx === null || point.idx - prevIdx > 3) {
        textLabels.push(point);
        prevIdx = point.idx;
      }
    });

    const StartEndDots = ({ x, y }) => {
      return (
        <Svg.G key="startEndDots">
          {circles.map(point => (
            <Svg.Circle
              key={`c${point.idx}`}
              x={x(point.idx)}
              cy={y(data[point.idx])}
              r={point.r}
              stroke={Colors.grey}
              strokeWidth={2}
              fill={point.color}
            />
          ))}
        </Svg.G>
      );
    };

    const WeightLabels = ({ x, y }) => {
      return (
        <Svg.G key="weightLabels">
          {weightLabels.map(point => (
            <Svg.G key={`gl${point.idx}`} x={x(point.idx)}>
              <Svg.Line
                key={`line${point.idx}`}
                y1={y(data[point.idx])}
                y2={this.props.height + this.props.bottomInset}
                d={(0, 0, 50, 50)}
                stroke={Colors.grey}
                strokeWidth={1}
              />
            </Svg.G>
          ))}
          <Svg.Rect
            key="weightmask"
            x="0"
            y={this.props.height + 12}
            width={this.props.width}
            height={this.props.bottomInset - 12}
            fill="white"
          />
          {textLabels.map(point => (
            <Svg.G key={`gt${point.idx}`} x={x(point.idx)}>
              <Svg.G key={`lab${point.idx}`}>
                <Svg.Text
                  key={`wl${point.idx}`}
                  textAnchor="middle"
                  y={this.props.height + 12 + 18}
                  fontSize="14"
                  fontWeight="lighter"
                >
                  {data[point.idx]}
                </Svg.Text>
                <Svg.Text
                  key={`wllbs${point.idx}`}
                  y={this.props.height + 12 + 16 + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="lighter"
                  fill={Colors.grey}
                >
                  LBS
                </Svg.Text>
              </Svg.G>
            </Svg.G>
          ))}
        </Svg.G>
      );
    };

    const Fline = ({ line }) => (
      <Svg.Path
        key={"line"}
        d={line}
        stroke={Colors.grey}
        strokeWidth={2}
        fill={"none"}
      />
    );

    if (datumCount === 0) {
      return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
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

    return (
      <View
        style={[
          {
            width: this.props.width,
            height: this.props.height + this.props.bottomInset,
          },
          { ...this.props.style },
        ]}
      >
        <AreaChart
          style={{ flex: 1 }}
          data={data}
          svg={{ fill: Colors.superLtGrey }}
          showGrid={false}
          contentInset={{
            top: 10,
            bottom: this.props.bottomInset,
            left: 22,
            right: 22,
          }}
        >
          <WeightLabels />
          <Fline />
          <StartEndDots />
        </AreaChart>
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
  bottomInset: PropTypes.number,
  style: PropTypes.object,
};

WeightChart.defaultProps = {
  calMonth: new Date().getMonth() + 1,
  calyear: new Date().getFullYear(),
  markedDates: {},
  width: "100%",
  height: 55,
  bottomInset: 44,
  style: {},
};
