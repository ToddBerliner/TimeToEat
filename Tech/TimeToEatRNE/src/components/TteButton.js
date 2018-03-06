import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

class TteButton extends Component {
  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      hasTVPreferredFocus,
      disabled,
      testID,
      style,
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    // TODO: color control

    const accessibilityTraits = ["button"];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityTraits.push("disabled");
    }
    const formattedTitle =
      Platform.OS === "android" ? title.toUpperCase() : title;
    const Touchable =
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        hasTVPreferredFocus={hasTVPreferredFocus}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        style={style}
      >
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>
            {formattedTitle}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      borderWidth: 2,
      borderRadius: 30,
    },
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: "#2196F3",
      borderRadius: 2,
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      // color: "#007AFF",
      textAlign: "center",
      padding: 8,
      fontSize: 16,
      fontWeight: "700",
    },
    android: {
      color: "white",
      textAlign: "center",
      padding: 8,
      fontWeight: "500",
    },
  }),
  buttonDisabled: Platform.select({
    ios: {
      borderColor: "#cdcdcd",
    },
    android: {
      elevation: 0,
      backgroundColor: "#dfdfdf",
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: "#cdcdcd",
    },
    android: {
      color: "#a1a1a1",
    },
  }),
});

export default TteButton;
