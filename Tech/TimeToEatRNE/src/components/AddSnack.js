import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

const AddSnack = props => {
  return (
    <TouchableOpacity onPress={props.onTap} style={styles.addSnackWrap}>
      <Ionicons
        name="ios-add-circle-outline"
        size={32}
        style={styles.addSnackIcon}
        color={Colors[props.scheme]}
        activeOpacity={0.8}
      />
      <Text style={[styles.addSnackText, { color: Colors[props.scheme] }]}>
        Add Snack
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addSnackWrap: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 32,
    paddingRight: 10,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  addSnackIcon: {
    position: "absolute",
    top: 4,
    left: 6,
  },
  addSnackText: {
    fontSize: 18,
    letterSpacing: -1,
    marginLeft: 6,
  },
});

export default AddSnack;
