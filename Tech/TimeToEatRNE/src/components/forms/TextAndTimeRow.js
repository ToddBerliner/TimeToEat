import React from "react";
import {
  StyleSheet,
  View,
  Animated,
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
      pickerHeight,
      pickerWrapHeight,
      tracking,
    } = this.props;
    const wrapStyle = !this.props.isPickerShowing
      ? { height: FormSettings.defaultCellHeight }
      : null;
    return (
      <Animated.View key={`ttrwrap${idx}`} style={{ height: pickerWrapHeight }}>
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
            returnKeyType="done"
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
        <Animated.View
          style={{
            overflow: "hidden",
            height: pickerHeight,
          }}
        >
          <Line marginLeft={FormSettings.textMarginLeft} />
          <DatePickerIOS
            mode="time"
            date={date}
            onDateChange={onDateChange}
            minuteInterval={15}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default TextAndTimeRow;
