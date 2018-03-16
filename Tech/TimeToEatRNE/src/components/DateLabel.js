import React from "react";
import { View, Text } from "react-native";
import Colors from "../styles/colors";

export default class DateLabel extends React.PureComponent {
  render() {
    const supMap = {
      "1": "st",
      "2": "nd",
      "3": "rd",
      "4": "th",
      "5": "th",
      "6": "th",
      "7": "th",
      "8": "th",
      "9": "th",
      "0": "th",
    };
    let { month, day } = this.props;
    day = day.toString();
    const sub = supMap[day.substring(day.length - 1)];
    return (
      <View style={{ flexDirection: "row", marginBottom: 4 }}>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: "System",
              fontSize: 14,
              color: Colors.grey,
            }}
          >
            {this.props.month} {this.props.day}
          </Text>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <Text
            style={{
              fontFamily: "System",
              fontSize: 10,
              color: Colors.grey,
            }}
          >
            {sub}
          </Text>
        </View>
      </View>
    );
  }
}
