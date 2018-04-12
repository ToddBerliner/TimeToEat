import React from "react";
import { Text, StyleSheet } from "react-native";
import { months, getDow, getFriendlyDate } from "../utils";

const TitleDate = props => {
  const dateStr = getFriendlyDate(props.dayId, true);
  return <Text style={styles.titleDate}>{dateStr}</Text>;
};

const styles = StyleSheet.create({
  titleDate: {
    textAlign: "center",
    fontFamily: "fugaz-one-regular",
    fontSize: 18,
    letterSpacing: -1,
    width: 180,
  },
});

export default TitleDate;
