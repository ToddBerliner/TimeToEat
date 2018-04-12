import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { AreaChart, XAxis, LineChart } from "react-native-svg-charts";
import {
  Circle,
  G,
  Text as SvgText,
  TSpan,
  Path,
  Line,
  Rect,
} from "react-native-svg";
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

    const StartEndDots = ({ x, y }) => {
      return (
        <G key="startEndDots">
          {circles.map(point => (
            <Circle
              key={`c${point.idx}`}
              x={x(point.idx)}
              cy={y(data[point.idx])}
              r={point.r}
              stroke={Colors.grey}
              strokeWidth={2}
              fill={point.color}
            />
          ))}
        </G>
      );
    };

    const WeightLabels = ({ x, y }) => {
      return (
        <G key="weightLabels">
          <Rect
            key="weightmask"
            x="0"
            y={this.props.height + 12}
            width={this.props.width}
            height="60"
            fill={"white"}
          />
          {weightLabels.map(point => (
            <G key={`g${point.idx}`} x={x(point.idx)}>
              <Line
                key={`line${point.idx}`}
                y1={y(data[point.idx])}
                y2={this.props.height + 12}
                d={(0, 0, 50, 50)}
                stroke={Colors.grey}
                strokeWidth={1}
              />
              {(point.idx % 7 === 0 ||
                point.idx % 7 === 3 ||
                point.idx % 7 === 4) && (
                <G key={`lab${point.idx}`}>
                  <SvgText
                    key={`wl${point.idx}`}
                    y={this.props.height + 12}
                    textAnchor={"middle"}
                    fontSize={16}
                    fontWeight={-0.4}
                  >
                    {data[point.idx]}
                  </SvgText>
                  <SvgText
                    key={`wlt${point.idx}`}
                    y={this.props.height + 12 + 18}
                    textAnchor={"middle"}
                    fontSize={10}
                    fontWeight={-0.4}
                    fill={Colors.grey}
                  >
                    LBS
                  </SvgText>
                </G>
              )}
            </G>
          ))}
        </G>
      );
    };

    const Fline = ({ line }) => (
      <Path
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
          extras={[WeightLabels, Fline, StartEndDots]}
        />
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
