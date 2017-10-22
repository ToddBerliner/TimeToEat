import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AddSnack = props => {
  return (
    <View style={styles.addSnackWrap}>
      <Icon name="ios-add-circle-outline" size={36} />
      <Text style={styles.addSnackText}>Add Snack</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addSnackWrap: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  addSnackText: {
    fontSize: 18,
    letterSpacing: -1,
    marginLeft: 6
  }
});

export default AddSnack;
