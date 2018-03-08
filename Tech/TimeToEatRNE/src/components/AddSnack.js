import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AddSnack = props => {
  return (
    <TouchableOpacity
      onPress={props.onTap}
      style={{ borderRadius: 8, paddingLeft: 8 }}
    >
      <View style={styles.addSnackWrap}>
        <Icon name="ios-add-circle-outline" size={36} />
        <Text style={styles.addSnackText}>Add Snack</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addSnackWrap: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  addSnackText: {
    fontSize: 18,
    letterSpacing: -1,
    marginLeft: 6,
  },
});

export default AddSnack;
