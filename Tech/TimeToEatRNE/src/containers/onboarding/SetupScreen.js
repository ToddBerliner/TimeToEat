import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Permissions } from "expo";
import MenuScreen from "../MenuScreen";
import { completeOnboarding } from "../../store/uiState/reducer";
import TteButton from "../../components/TteButton";

import { clearSavedState } from "../../store/configureStore";

const welcomeIcon = require("../../../assets/images/welcome_icon.png");
import { obText, obTitle } from "../../styles/styles";

class SetupScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this._handleDone = this._handleDone.bind(this);
  }

  _handleDone() {
    this.props.completeOnboarding();
  }

  render() {
    const setNotifications = this.props.notifications.filter(
      notification => notification !== null,
    );
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
        }}
      >
        <Image source={welcomeIcon} />
        <Text style={obTitle}>Make Your Plan</Text>
        <Text style={[obText, { marginBottom: 12 }]}>
          Now tell us what meals you want to track and when you want to be
          reminded of them. Turn on each meal you want to track and tap the name
          or time to change them.
        </Text>
        <View style={{ width: "100%" }}>
          <MenuScreen mealsOnly={true} />
        </View>
        <TteButton
          style={{ width: "80%", marginTop: 12 }}
          onPress={this._handleDone}
          title="Done"
          disabled={setNotifications.length === 0}
        />
      </View>
    );
  }
}

mapStateToProps = state => {
  const notifications = state.plan.notifications;
  return { notifications };
};

mapDispatchToProps = dispatch => {
  return {
    completeOnboarding: () => {
      dispatch(completeOnboarding());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
