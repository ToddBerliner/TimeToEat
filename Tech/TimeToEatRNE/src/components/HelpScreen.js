import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  obTitle,
  obSmallTitle,
  obText,
  MenuScreenStyles,
  TextStyles,
  HelpScreenStyles,
} from "../styles/styles";
import Colors from "../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";

class HelpScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerStyle: {
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: "white",
      },
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontFamily: "fugaz-one-regular" }}>Done</Text>
        </TouchableOpacity>
      ),
    };
  };
  render() {
    return (
      <ScrollView style={HelpScreenStyles.helpWrap}>
        <Text style={MenuScreenStyles.title}>Time for Help</Text>
        <View style={HelpScreenStyles.headerWrap}>
          <Icon name="ios-checkmark-circle-outline" size={36} />
          <Text style={HelpScreenStyles.headerText}>Meal Tracking</Text>
        </View>
        <View style={HelpScreenStyles.helpSection}>
          <Text style={TextStyles.content}>
            Tap the weight to update your weight each day. You can turn off
            weight tracking in Settings if you're not interested in it.
          </Text>
          <Text style={TextStyles.content}>
            Tap the circle next to each meal when you've eaten it. Tap and hold
            the circle to un-check it.
          </Text>
          <Text style={TextStyles.content}>
            Tap the Add Sack button to add an off plan snack. Tap and hold the
            added snack to remove it.
          </Text>
          <Text style={TextStyles.content}>
            Tap the water pie each time you have a serving of water. Tap and
            hold to remove a serving. You can turn off water tracking in
            Settings if you're not interested it in.
          </Text>
        </View>
        <View style={HelpScreenStyles.headerWrap}>
          <Icon name="ios-speedometer" size={36} />
          <Text style={HelpScreenStyles.headerText}>How You're Eating</Text>
        </View>
        <View style={HelpScreenStyles.helpSection}>
          <Text style={TextStyles.content}>
            The calendar shows your progress for each day. Green means you ate
            all your planned meals, yellow means you missed one or more planned
            meals and red means you ate an off plan snack.
          </Text>
          <Text style={TextStyles.content}>
            If weight tracking is turned on, your daily weight will be charted
            below the calendar.
          </Text>
        </View>
        <View style={HelpScreenStyles.headerWrap}>
          <Icon name="ios-contact" size={36} />
          <Text style={HelpScreenStyles.headerText}>App Settings</Text>
        </View>
        <View style={HelpScreenStyles.helpSection}>
          <Text style={TextStyles.content}>
            Toggle the meals you want to track on and off.
          </Text>
          <Text style={TextStyles.content}>Tap the meal name to edit it.</Text>
          <Text style={TextStyles.content}>
            Tap the meal time to change it.
          </Text>
          <Text style={TextStyles.content}>
            Toggle the weight tracking, water tracking and notifications on and
            off.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default HelpScreen;
