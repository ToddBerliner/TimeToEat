import React, { Component } from "react";
import { connect } from "react-redux";
import TitleDate from "../components/TitleDate";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { selectDay } from "../store/uiState/reducer";
import { getDateKey, getAdjacentDateKey, PREV, NEXT } from "../utils";
import { _getSelectedDayId } from "../store/reducer";

class TitleDateNav extends Component {
  constructor(props) {
    super(props);
  }

  _selectDate(dir) {
    this.props.selectDate(this.props.dayId, dir);
  }

  render() {
    return (
      <View style={styles.titleRowCenter}>
        <View style={styles.titleLeftArrow}>
          <TouchableOpacity onPress={this._selectDate.bind(this, PREV)}>
            <Icon name="ios-arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <TitleDate dayId={this.props.dayId} />
        <View style={styles.titleRightArrow}>
          {!this.props.isToday && (
            <TouchableOpacity onPress={this._selectDate.bind(this, NEXT)}>
              <Icon name="ios-arrow-forward" size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleRowCenter: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleLeftArrow: {
    width: 15,
    alignItems: "flex-end",
  },
  titleRightArrow: {
    width: 15,
  },
});

const mapStateToProps = state => {
  const dayId = _getSelectedDayId(state);
  const isToday = dayId === getDateKey();
  return {
    dayId,
    isToday,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDate: (dayId, dir) => {
      const newDayId = getAdjacentDateKey(dayId, dir);
      dispatch(selectDay(newDayId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleDateNav);
