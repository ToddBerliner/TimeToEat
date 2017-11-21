import React from "react";
import { StyleSheet, View, Text } from "react-native";

class MetricsScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(245, 245, 245)"
        }}
      >
        <Text
          style={{
            fontFamily: "FugazOne-Regular",
            fontSize: 24
          }}
        >
          MetricThis!
        </Text>
      </View>
    );
  }
}

export default MetricsScreen;
