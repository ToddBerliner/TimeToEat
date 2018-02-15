import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  DatePickerIOS,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  SCStyles,
  FormSettings,
  TIStyles,
  DPStyles,
  TATStyles,
} from "../../styles/formStyles";
import Line from "./Line";

class TextAndTimeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShowing: false,
    };
  }
  getPicker(date, onDateChange) {
    if (this.state.isPickerShowing) {
      return (
        <View>
          <Line marginLeft={FormSettings.textMarginLeft} />
          <DatePickerIOS
            mode="time"
            date={date}
            onDateChange={onDateChange}
            minuteInterval={15}
          />
        </View>
      );
    } else {
      return null;
    }
  }
  handlePress(event) {
    this.setState({ isPickerShowing: !this.state.isPickerShowing });
  }
  render() {
    const { idx, value, cuteDate, onChange, date, onDateChange } = this.props;
    const wrapStyle = !this.state.isPickerShowing
      ? { height: FormSettings.defaultCellHeight }
      : null;
    return (
      <View key={`ttrwrap${idx}`} style={wrapStyle}>
        <View
          key={`mealrow${idx}`}
          style={[
            SCStyles.container,
            { height: FormSettings.defaultCellHeight },
          ]}
        >
          <TextInput
            key={`mealinput${idx}`}
            value={value}
            style={TIStyles.defaultInputStyle}
            onChange={onChange}
          />
          <TouchableOpacity
            onPress={this.handlePress.bind(this)}
            style={TATStyles.container}
          >
            <Text key={`timevalue${idx}`} style={TATStyles.defaultValueStyle}>
              {cuteDate}
            </Text>
          </TouchableOpacity>
        </View>
        {this.getPicker(date, onDateChange)}
      </View>
    );
  }
}

export default TextAndTimeRow;
