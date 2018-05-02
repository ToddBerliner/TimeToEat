import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FormSettings, SectionStyles, SCStyles } from "../../styles/formStyles";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";

class TextRow extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[SCStyles.container, { height: FormSettings.defaultCellHeight }]}
        onPress={this.props.onPress}
      >
        <Text style={[SCStyles.titleStyle, { color: Colors.blue }]}>
          {this.props.title}
        </Text>
        <Icon
          style={[SCStyles.switch, { color: Colors.grey }]}
          name="ios-arrow-forward-outline"
          size={24}
        />
      </TouchableOpacity>
    );
  }
}

export default TextRow;
