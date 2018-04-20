import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import TteButton from "./TteButton";
import Icon from "react-native-vector-icons/Ionicons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../styles/colors";
import { TextStyles, IntroStyles } from "../styles/styles";
import { isSeSize } from "../utils";

class MapIntro extends Component {
  render() {
    const isSe = isSeSize();
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={IntroStyles.mask} />
        <View style={IntroStyles.wrap}>
          <View style={IntroStyles.contentWrap}>
            <Text style={[TextStyles.title, TextStyles.centered]}>Hello!</Text>
            <Text
              style={[
                TextStyles.subTitle,
                TextStyles.centered,
                { marginBottom: 16 },
              ]}
            >
              Let's Get You Tracking
            </Text>
            <View style={IntroStyles.sectionWrap}>
              <Icon
                name="ios-checkmark-circle"
                size={36}
                style={{ marginBottom: 10 }}
              />
              <Text style={IntroStyles.content}>
                Tap a meal to mark it eaten
              </Text>
              <Text style={IntroStyles.content}>Tap and hold to unmark it</Text>
            </View>
            <View style={IntroStyles.divider} />
            <View style={IntroStyles.sectionWrap}>
              <Icon
                name="ios-add-circle-outline"
                size={36}
                style={{ marginBottom: 10 }}
              />
              <Text style={IntroStyles.content}>
                Tap "Add Snack" to record a snack
              </Text>
              <Text style={IntroStyles.content}>Tap and hold to remove it</Text>
            </View>
            <View style={IntroStyles.divider} />
            <View style={IntroStyles.sectionWrap}>
              <McIcon
                name="scale-bathroom"
                size={36}
                style={{ marginBottom: 10 }}
              />
              <Text style={IntroStyles.content}>
                Tap the weight to record your weight daily
              </Text>
              <Text style={IntroStyles.content}>
                (You can turn off weight tracking in App Settings)
              </Text>
            </View>
          </View>
          <TteButton
            style={{ width: "80%" }}
            title="Got It"
            onPress={() => {
              this.props.onClose();
            }}
          />
        </View>
      </Modal>
    );
  }
}
export default MapIntro;
