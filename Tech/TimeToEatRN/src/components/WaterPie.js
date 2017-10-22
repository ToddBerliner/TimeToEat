import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight
} from "react-native";
const wp0 = require("../images/wp0.png");
const wp1 = require("../images/wp1.png");
const wp2 = require("../images/wp2.png");
const wp3 = require("../images/wp3.png");
const wp4 = require("../images/wp4.png");
const wp5 = require("../images/wp5.png");
const wp6 = require("../images/wp6.png");
const wp7 = require("../images/wp7.png");
const wp8 = require("../images/wp8.png");
const slices = [wp0, wp1, wp2, wp3, wp4, wp5, wp6, wp7, wp8];

const WaterPie = props => {
  return (
    <View style={styles.waterPieWrap}>
      <TouchableHighlight
        onPress={props.onTap}
        style={styles.waterPieTouchable}
      >
        <Image source={slices[props.waterCount]} style={styles.waterPieImage} />
      </TouchableHighlight>
      <Text style={styles.waterPieText}>Water</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  waterPieWrap: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  waterPieTouchable: {
    borderRadius: 24
  },
  waterPieImage: {
    width: 48,
    height: 48
  },
  waterPieText: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 8
  }
});

export default WaterPie;
