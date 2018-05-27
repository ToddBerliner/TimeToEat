import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import {
  obTitle,
  obSmallTitle,
  obText,
  MenuScreenStyles,
  TextStyles,
  HelpScreenStyles,
  Schemes,
} from "../styles/styles";
import Colors, { HeaderColors, BackgroundColors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import HeaderShadow from "./HeaderShadow";
import { isSeSize } from "../utils";

class HelpScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { scheme } = screenProps;
    return {
      headerTitle: null,
      headerStyle: [
        {
          paddingRight: 12,
          paddingLeft: 12,
        },
        Schemes[scheme].header,
      ],
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontFamily: "fugaz-one-regular",
              color: HeaderColors[scheme],
              fontSize: 16,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  contact = () => {
    Linking.openURL("mailto://support@eatontime.app");
  };

  render() {
    const { scheme } = this.props.screenProps;
    const isSe = isSeSize();
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={[
            HelpScreenStyles.helpWrap,
            { backgroundColor: BackgroundColors[scheme] },
          ]}
        >
          <Text
            style={[
              MenuScreenStyles.title,
              { color: Colors[scheme], marginTop: isSe ? 8 : 12 },
            ]}
          >
            Time for Help
          </Text>
          <View style={[HelpScreenStyles.helpSection, { marginTop: 8 }]}>
            <Text style={TextStyles.content}>
              Please find the simple instructions below and email us with any
              questions or feedback.
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-mail-outline"
                size={22}
                color={Colors[scheme]}
                style={{ marginRight: 4 }}
              />
              <TouchableOpacity onPress={this.contact} style={{ height: 22 }}>
                <Text style={TextStyles.link}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={HelpScreenStyles.headerWrap}>
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={36}
              color={Colors[scheme]}
            />
            <Text
              style={[HelpScreenStyles.headerText, { color: Colors[scheme] }]}
            >
              Meal Tracking
            </Text>
          </View>
          <View style={HelpScreenStyles.helpSection}>
            <Text style={TextStyles.content}>
              Tap the weight to update your weight each day. You can turn off
              weight tracking in Settings if you're not interested in it.
            </Text>
            <Text style={TextStyles.content}>
              Tap the circle next to each meal when you've eaten it. Tap and
              hold the circle to un-check it.
            </Text>
            <Text style={TextStyles.content}>
              Tap the Add Sack button to add an off plan snack. Tap and hold the
              added snack to remove it.
            </Text>
          </View>
          <View style={HelpScreenStyles.headerWrap}>
            <Ionicons
              name="ios-calendar-outline"
              size={36}
              color={Colors[scheme]}
            />
            <Text
              style={[HelpScreenStyles.headerText, { color: Colors[scheme] }]}
            >
              How You're Eating
            </Text>
          </View>
          <View style={HelpScreenStyles.helpSection}>
            <Text style={TextStyles.content}>
              The calendar shows your progress for each day.
            </Text>
            <Text style={TextStyles.content}>
              Green means you ate all your planned meals, yellow means you
              missed one or more planned meals and red means you ate an off plan
              snack.
            </Text>
            <Text style={TextStyles.content}>
              If weight tracking is turned on, your daily weight will be charted
              below the calendar.
            </Text>
          </View>
          <View style={HelpScreenStyles.headerWrap}>
            <Ionicons
              name="ios-contact-outline"
              size={36}
              color={Colors[scheme]}
            />
            <Text
              style={[HelpScreenStyles.headerText, { color: Colors[scheme] }]}
            >
              App Settings
            </Text>
          </View>
          <View style={HelpScreenStyles.helpSection}>
            <Text style={TextStyles.content}>
              Toggle the meals you want to track on and off.
            </Text>
            <Text style={TextStyles.content}>
              Tap the meal name to edit it.
            </Text>
            <Text style={TextStyles.content}>
              Tap the meal time to change it.
            </Text>
            <Text style={TextStyles.content}>
              Toggle the weight tracking and notifications on and off.
            </Text>
            <Text style={TextStyles.content}>
              Select the visual theme for the app.
            </Text>
          </View>
        </ScrollView>
        <HeaderShadow />
      </View>
    );
  }
}

export default HelpScreen;
