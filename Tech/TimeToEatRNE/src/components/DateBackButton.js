import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFriendlyDate } from "../utils";

const styles = StyleSheet.create({
  titleRowCenter: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleLeftArrow: {
    width: 15,
    alignItems: "flex-start",
  },
});

const DateBackButton = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <View style={styles.titleRowCenter}>
      <View style={styles.titleLeftArrow}>
        <Ionicons name="ios-arrow-back" size={24} />
      </View>
      <Text
        style={{
          fontFamily: "fugaz-one-regular",
          fontSize: 18,
          letterSpacing: -1,
          width: 220,
        }}
      >
        {getFriendlyDate(props.dayId)}
      </Text>
    </View>
  </TouchableOpacity>
);

export default DateBackButton;
