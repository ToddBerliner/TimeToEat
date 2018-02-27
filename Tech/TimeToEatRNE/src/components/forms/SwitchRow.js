import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { FormSettings, SectionStyles, SCStyles } from "../../styles/formStyles";

class SwitchRow extends React.Component {
  render() {
    return (
      <View
        style={[SCStyles.container, { height: FormSettings.defaultCellHeight }]}
      >
        <Text style={SCStyles.titleStyle}>{this.props.switchTitle}</Text>
        <Switch style={SCStyles.switch} {...this.props} />
      </View>
    );
  }
}

export default SwitchRow;
