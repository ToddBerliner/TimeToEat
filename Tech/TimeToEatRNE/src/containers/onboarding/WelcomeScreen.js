import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Permissions } from "expo";
import TteButton from "../../components/TteButton";

import { clearSavedState } from "../../store/configureStore";

const welcomeIcon = require("../../../assets/images/welcome_icon.png");
import { obText, obTitle } from "../../styles/styles";

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  _handleAllowNotifications() {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(permission => {
      const { status } = permission;
      if (status === "granted") {
        this.props.navigation.navigate("Setup");
      } else {
        this._showAlert();
      }
    });
  }

  _showAlert() {
    const navigate = this.props.navigation.navigate;
    Alert.alert(
      "Notifications Not Allowed",
      "Time to Eat works best with notifications enabled so we can help you stick to your plan. You can turn notifications on anytime in the settings menu.",
      [
        {
          text: "OK",
          onPress: () => {
            navigate("Setup");
          },
        },
      ],
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={clearSavedState}>
          <Image source={welcomeIcon} style={{ marginBottom: 35 }} />
        </TouchableOpacity>
        <Text style={obTitle}>Welcome!</Text>
        <Text style={obText}>
          Time to Eat is the simple meal tracker that will help you to make a
          plan and stick to it. We believe in habbits and that tracking is the
          best way to make or break them.
        </Text>
        <Text style={[obText, { marginBottom: 36 }]}>
          Let’s get you started by turning on Notifications so that we can let
          you know when it’s Time to Eat!
        </Text>
        <TteButton
          style={{ width: "80%" }}
          onPress={this._handleAllowNotifications.bind(this)}
          title="Allow Notifications"
        />
      </View>
    );
  }
}

export default WelcomeScreen;
