import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import TteButton from "./TteButton";
const welcomeIcon = require("../../assets/images/welcome_icon.png");
import { obText, obTitle, obSmallTitle } from "../styles/styles";

export default class EmptyPlan extends Component {
  render() {
    return (
      <View
        key="nomeals"
        style={{
          flex: 1,
          height: this.props.height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={welcomeIcon} style={{ marginBottom: 35 }} />
        <Text style={obSmallTitle}>Your Plan Needs Meals!</Text>
        <Text style={[obText, { marginBottom: 36 }]}>
          There are no meals being tracked in your plan. Turn on tracking for
          the meals you want in your plan in the settings screen.
        </Text>
        <TteButton
          style={{ width: "80%" }}
          onPress={() => {
            this.props.navigate("Menu");
          }}
          title="Go to Settings"
          iconName="ios-contact"
        />
      </View>
    );
  }
}
