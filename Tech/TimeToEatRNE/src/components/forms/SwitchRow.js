import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { FormSettings, SectionStyles, SCStyles } from "../../styles/formStyles";

class SwitchRow extends React.Component {
  render() {
    return (
      <View>
        <Text style={SectionStyles.sectionTitle}>WATER TRACKING</Text>
        <View style={SectionStyles.sectionWrapper}>
          <View
            style={[
              SCStyles.container,
              { height: FormSettings.defaultCellHeight },
            ]}
          >
            <Text style={SCStyles.titleStyle}>Track Water</Text>
            <Switch style={SCStyles.switch} {...this.props} />
          </View>
        </View>
      </View>
    );
  }
}

export default SwitchRow;
