import React, { Component } from "react";
import { connect } from "react-redux";
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
import { toggleNotifications } from "../../store/uiState/reducer";

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
        this.props.turnOnNotifications();
        this.props.navigation.navigate("Setup");
      } else {
        this._showAlert();
      }
    });
  }

  _showAlert(title = "Notifications Not Allowed", includeCancel = false) {
    const navigate = this.props.navigation.navigate;
    const buttons = [
      {
        text: "OK",
        onPress: () => {
          navigate("Setup");
        },
      },
    ];
    if (includeCancel) {
      buttons.unshift({
        text: "Cancel",
        style: "cancel",
      });
    }
    let text =
      "Time to Eat works best with notifications enabled so we can help you stick to your plan. You can turn notifications on and off anytime in the settings menu.";
    if (includeCancel) {
      text =
        text +
        "\n\nTap Cancel to go back and Allow Notifications or OK to continue without them.";
    }
    Alert.alert(title, text, buttons);
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
        <TteButton
          style={{ marginTop: 10 }}
          onPress={this._showAlert.bind(this, "Are you sure?", true)}
          title="No Thanks"
          secondaryStyle={true}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    turnOnNotifications: () => dispatch(toggleNotifications(true)),
  };
};
export default connect(null, mapDispatchToProps)(WelcomeScreen);
