import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  DatePickerIOS,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
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
  getPicker(date, onDateChange) {
    if (this.props.isPickerShowing) {
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
  render() {
    const {
      idx,
      value,
      cuteDate,
      onChange,
      date,
      onDateChange,
      onTrackingchange,
      onShowPicker,
      tracking,
    } = this.props;
    const wrapStyle = !this.props.isPickerShowing
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
          <TouchableOpacity onPress={onShowPicker} style={TATStyles.container}>
            <Text
              key={`timevalue${idx}`}
              style={
                this.props.isPickerShowing
                  ? TATStyles.defaultValueStyleActive
                  : TATStyles.defaultValueStyle
              }
            >
              {cuteDate}
            </Text>
          </TouchableOpacity>
          <Switch
            style={SCStyles.switch}
            value={tracking}
            onValueChange={onTrackingchange}
          />
        </View>
        {this.getPicker(date, onDateChange)}
      </View>
    );
  }
}

export default TextAndTimeRow;
