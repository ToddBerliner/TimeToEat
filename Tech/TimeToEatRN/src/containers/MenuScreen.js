import React from "react";
import { StyleSheet, View, Text } from "react-native";

class MenuScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "FugazOne-Regular",
            fontSize: 24
          }}
        >
          MenuThis!
        </Text>
      </View>
    );
  }
}
export default MenuScreen;
