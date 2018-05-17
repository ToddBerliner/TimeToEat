import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Permissions } from "expo";
import MenuScreen from "../MenuScreen";
import { completeOnboarding } from "../../store/uiState/reducer";
import TteButton from "../../components/TteButton";
import { isSeSize } from "../../utils";

import { clearSavedState } from "../../store/configureStore";

const welcomeIcon = require("../../../assets/welcome_icon.png");
import { obText, obTitle } from "../../styles/styles";
import { BackgroundColors } from "../../styles/colors";

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
    const isSe = isSeSize();
    const logoStyle = {
      width: isSe ? 50 : 96,
      height: isSe ? 50 : 96,
      marginBottom: isSe ? 18 : 35,
    };
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          backgroundColor: BackgroundColors.herbs,
        }}
        behavior="padding"
        keyboardVerticalOffset={25}
      >
        <Image source={welcomeIcon} style={logoStyle} />
        <Text style={obTitle}>Make Your Plan</Text>
        <Text style={[obText, { marginBottom: 12 }]}>
          Now tell us what meals you want to track, what you want to call them,
          and when you want to be eat them.
        </Text>
        <View style={{ width: "100%" }}>
          <MenuScreen mealsOnly={true} />
        </View>
        <TteButton
          style={{ width: "80%", marginTop: 12 }}
          onPress={this._handleDone}
          title="Done"
        />
      </KeyboardAvoidingView>
    );
  }
}

mapDispatchToProps = dispatch => {
  return {
    completeOnboarding: () => {
      dispatch(completeOnboarding());
    },
  };
};

export default connect(null, mapDispatchToProps)(SetupScreen);
