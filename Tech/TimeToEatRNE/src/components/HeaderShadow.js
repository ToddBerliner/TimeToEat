import React from "react";
import { View, StyleSheet } from "react-native";

export default class HeaderShadow extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          width: 500,
          height: 50,
          position: "absolute",
          top: -51,
          left: -50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
        }}
      />
    );
  }
}
