import React from "react";
import { Text, StyleSheet } from "react-native";
import { months, getDow } from "../utils";

const TitleDate = props => {
  const today = new Date(parseInt(props.dayId, 10));
  const dow = getDow(today.getDay());
  const month = months[today.getMonth()];
  const date = today.getDate();
  const dateStr = `${dow}, ${month} ${date}`;
  return <Text style={styles.titleDate}>{dateStr}</Text>;
};

const styles = StyleSheet.create({
  titleDate: {
    textAlign: "center",
    fontFamily: "FugazOne-Regular",
    fontSize: 18,
    letterSpacing: -1,
    width: 220
  }
});

export default TitleDate;
