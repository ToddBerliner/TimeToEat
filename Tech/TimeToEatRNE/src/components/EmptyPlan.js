import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getDateKey, isSeSize } from "../utils";

import TteButton from "./TteButton";
const welcomeIcon = require("../../assets/welcome_icon.png");
import { obText, obTitle, obSmallTitle } from "../styles/styles";

export default class EmptyPlan extends Component {
  render() {
    const isSe = isSeSize();
    return (
      <View
        key="nomeals"
        style={{
          flex: 1,
          width: "100%",
          height: this.props.height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            padding: 18,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            alignItems: "center",
            borderRadius: 18,
          }}
        >
          <Image
            source={welcomeIcon}
            style={{
              width: isSe ? 48 : 96,
              height: isSe ? 48 : 96,
              marginBottom: isSe ? 20 : 35,
            }}
          />
          <Text style={obSmallTitle}>
            {this.props.dayId === getDateKey()
              ? "Your Plan Needs Meals!"
              : "No Meals Tracked This Day"}
          </Text>
          {this.props.dayId === getDateKey() ? (
            <Text style={[obText, { marginBottom: 36 }]}>
              There are no meals being tracked in your plan. Turn on tracking
              for the meals you want in your plan in the settings screen.
            </Text>
          ) : (
            <Text style={[obText, { marginBottom: 36 }]}>
              There were no meals tracked this day. It's all good, let's focus
              on the future!
            </Text>
          )}
          {this.props.dayId === getDateKey() && (
            <TteButton
              style={{ width: "80%" }}
              onPress={() => {
                this.props.navigate("Menu");
              }}
              title="Go to Settings"
              iconName="ios-contact-outline"
            />
          )}
        </View>
      </View>
    );
  }
}
