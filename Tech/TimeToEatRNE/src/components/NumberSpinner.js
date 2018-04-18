import React, { Component } from "react";
import { View, PickerIOS, StyleSheet, Text } from "react-native";
import Colors from "../styles/colors";
import PropTypes from "prop-types";

// TODO: add configurability for number of places, separators, etc.
/*
  props: {
    selectedValue: number value with decimal point
    label: text label
    onValueChange: handler funciton for value change
    places: number
    decimalPlaces: number
  }

  state: {
    places,
    decimals
  }

  _onChange(place, value) {
    setState
    call props.onValueChange
  }
*/
export default class NumberSpinner extends Component {
  constructor(props) {
    super(props);
    this._getStateFromValue = this._getStateFromValue.bind(this);
    this._getValueFromState = this._getValueFromState.bind(this);
    this._getSpinner = this._getSpinner.bind(this);
    this._handleValueChange = this._handleValueChange.bind(this);
    this.state = this._getStateFromValue(props.value);
  }

  _getStateFromValue(value) {
    // TODO: currently assuming 3 places and 1 decimal place
    const parts = value.toString().split(".");
    let places = parts[0];
    let decimals = parts[1] ? parts[1] : "0";
    while (places.length < this.props.places) {
      places = "0" + places;
    }
    while (decimals.length < this.props.decimalPlaces) {
      decimals = decimals + "0";
    }
    return { places: places.split(""), decimals: decimals.split("") };
  }

  _getValueFromState() {
    const numString =
      this.state.places.join("") + "." + this.state.decimals.join("");
    return parseFloat(numString);
  }

  _handleValueChange(numType, idx, val) {
    this.setState(prevState => {
      const newState = prevState[numType];
      newState.splice(idx, 1, val);
      return { [numType]: newState };
    });
  }

  _getSpinner(numType, value, idx) {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <PickerIOS
        key={`spinner${numType}${idx}`}
        style={styles.numberSpinner}
        selectedValue={value}
        onValueChange={val => {
          this._handleValueChange(numType, idx, val);
        }}
      >
        {digits.map(digit => (
          <PickerIOS.Item
            key={digit.toString()}
            value={digit.toString()}
            label={digit.toString()}
          />
        ))}
      </PickerIOS>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromValue(nextProps.value));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.props.onValueChange(this._getValueFromState());
    }
  }

  render() {
    return (
      <View style={styles.numberSpinnerWrap}>
        {this.state.places.map((value, idx) =>
          this._getSpinner("places", value, idx),
        )}
        <PickerIOS style={{ width: 10 }} disabled={true} value={"."}>
          <PickerIOS.Item value="." label="." />
        </PickerIOS>
        {this.state.decimals.map((value, idx) =>
          this._getSpinner("decimals", value, idx),
        )}
        <PickerIOS
          style={{ width: 55 }}
          itemStyle={{ color: Colors.grey }}
          disabled={true}
          value={"text"}
        >
          <PickerIOS.Item value="text" label={this.props.label} />
        </PickerIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  numberSpinnerWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  numberSpinner: {
    width: 55,
  },
});

NumberSpinner.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  places: PropTypes.number,
  decimalPlaces: PropTypes.number,
  onValueChange: PropTypes.func,
};

NumberSpinner.defaultProps = {
  value: 0,
  label: "LBS.",
  places: 3,
  decimalPlaces: 1,
  onValueChange: () => {},
};
