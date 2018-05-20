import React, { Component } from "react";
import { connect } from "react-redux";
import TitleDate from "../components/TitleDate";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { selectDay } from "../store/uiState/reducer";
import { getDateKey, getAdjacentDateKey, isSeSize, PREV, NEXT } from "../utils";
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
    const isSe = isSeSize();
    return (
      <View
        style={[
          styles.titleRowCenter,
          { width: isSeSize ? 220 : 240, height: "100%" },
        ]}
      >
        <View style={styles.arrowWrap}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color={HeaderColors[this.props.scheme]}
            style={styles.arrowIcon}
          />
          <TouchableOpacity
            onPress={this._selectDate.bind(this, PREV)}
            style={styles.arrowButton}
          />
        </View>
        <View style={styles.titleWrap}>
          <TitleDate dayId={this.props.dayId} scheme={this.props.scheme} />
        </View>
        {this.props.isToday ? (
          <View style={styles.arrowWrap} />
        ) : (
          <View style={styles.arrowWrap}>
            <Ionicons
              name="ios-arrow-forward"
              size={24}
              color={HeaderColors[this.props.scheme]}
              style={[styles.arrowIcon]}
            />
            <TouchableOpacity
              onPress={this._selectDate.bind(this, NEXT)}
              style={styles.arrowButton}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleRowCenter: {
    height: 36,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleWrap: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowWrap: {
    width: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    position: "absolute",
  },
  arrowButton: {
    height: "100%",
    width: 30,
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
