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
import { Ionicons } from "@expo/vector-icons";
import { Permissions } from "expo";
import TteButton from "../../components/TteButton";

import { clearSavedState } from "../../store/configureStore";
import { toggleNotifications } from "../../store/uiState/reducer";

const welcomeIcon = require("../../../assets/welcome_icon.png");
import { obText, obTitle } from "../../styles/styles";
import { BackgroundColors } from "../../styles/colors";
import { isSeSize } from "../../utils";

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
    const isSe = isSeSize();
    const logoStyle = {
      width: isSe ? 50 : 96,
      height: isSe ? 50 : 96,
      marginBottom: isSe ? 18 : 35,
    };
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BackgroundColors.herbs,
        }}
      >
        <TouchableOpacity onPress={clearSavedState}>
          <Image source={welcomeIcon} style={logoStyle} />
        </TouchableOpacity>
        <Text style={obTitle}>Welcome!</Text>
        <Text style={obText}>
          Time to Eat is the simple meal tracker that will help you to{" "}
          <Text style={{ fontWeight: "bold" }}>
            make a plan and stick to it
          </Text>. We believe in habbits and that tracking is the best way to
          make or break them.
        </Text>
        <Text style={[obText, { marginBottom: 36 }]}>
          Let’s get you started by turning on Notifications so that we can let
          you know when{" "}
          <Text style={{ fontWeight: "bold" }}>it’s Time to Eat!</Text>
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
