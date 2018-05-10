import React, { Component } from "react";
import { connect } from "react-redux";
import TitleDate from "../components/TitleDate";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { selectDay } from "../store/uiState/reducer";
import { getDateKey, getAdjacentDateKey, PREV, NEXT } from "../utils";
import { _getSelectedDayId } from "../store/reducer";
import Colors, { HeaderColors } from "../styles/colors";

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
        <TitleDate dayId={this.props.dayId} scheme={this.props.scheme} />
        <TouchableOpacity
          onPress={this._selectDate.bind(this, PREV)}
          style={styles.titleLeftArrow}
        >
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color={HeaderColors[this.props.scheme]}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        {this.props.isToday ? (
          <View style={styles.titleRightArrow} />
        ) : (
          <TouchableOpacity
            onPress={this._selectDate.bind(this, NEXT)}
            style={styles.titleRightArrow}
            hitSlop={{ left: 10, right: 10 }}
          >
            <Ionicons
              name="ios-arrow-forward"
              size={24}
              color={HeaderColors[this.props.scheme]}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        )}
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
    width: 60,
    height: 36,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  titleRightArrow: {
    width: 60,
    height: 36,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
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
