import React from "react";
import { View, StyleSheet } from "react-native";

const Line = props => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#D3D3D3",
        ...props,
      }}
    />
  );
};
export default Line;
