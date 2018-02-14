import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Switch,
  TextInput,
  DatePickerIOS,
  ScrollView,
} from "react-native";
import { clearSavedState } from "../store/configureStore";
import DateBackButton from "../components/DateBackButton";
import { _getWaterTrackingState } from "../store/reducer";
import { toggleWaterTracking } from "../store/uiState/reducer";
import { editMeal } from "../store/plan/reducer";
import { getFriendlyTime, getTimestampFromTimeObj, getDateKey } from "../utils";
import Line from "../components/forms/Line";
import SwitchRow from "../components/forms/SwitchRow";
import TextAndTimeRow from "../components/forms/TextAndTimeRow";
import {
  FormSettings,
  SectionStyles,
  SCStyles,
  DPStyles,
  TIStyles,
} from "../styles/formStyles";

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { dayId } = screenProps;
    return {
      headerTitle: null,
      headerStyle: {
        paddingRight: 12,
        paddingLeft: 12,
      },
      headerLeft: (
        <DateBackButton
          onPress={() => navigation.navigate("Map")}
          dayId={dayId}
        />
      ),
    };
  };

  handleToggleWater(waterToggleState) {
    this.props.toggleWater(waterToggleState);
  }

  handleChange(mealIdx, field, event) {
    if (field === "time") {
      console.log("time change");
      console.log(event);
      return;
    }
    const { text } = event.nativeEvent;
    this.props.editMeal(mealIdx, field, text);
  }

  render() {
    const { waterTracking, plan } = this.props;
    const { nodes } = plan.days.Monday;

    const meals = [];
    nodes.forEach((node, idx, nodesArr) => {
      const { name, time } = node;
      const ts = getTimestampFromTimeObj(getDateKey(), time);
      const cuteDate = getFriendlyTime(ts);
      const date = new Date(ts);
      const mealRow = (
        <TextAndTimeRow
          key={`timeAndTextRow${idx}`}
          idx={idx}
          value={name}
          date={date}
          cuteDate={cuteDate}
          onChange={this.handleChange.bind(this, idx, "name")}
          onDateChange={this.handleChange.bind(this, idx, "time")}
        />
      );
      if (idx < nodesArr.length - 1) {
        meals.push(
          <View key={`wrap${idx}`}>
            {mealRow}
            <Line key={`line${idx}`} marginLeft={FormSettings.textMarginLeft} />
          </View>,
        );
      } else {
        meals.push(mealRow);
      }
    });

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "rgb(245,245,245)",
          paddingTop: 20,
        }}
      >
        <TouchableHighlight onPress={clearSavedState}>
          <Text
            style={{
              fontFamily: "fugaz-one-regular",
              fontSize: 36,
              marginLeft: FormSettings.textMarginLeft,
            }}
          >
            MenuThis!
          </Text>
        </TouchableHighlight>
        <View style={{ flex: 1 }}>
          <View style={SectionStyles.container}>
            <View>
              <Text style={SectionStyles.sectionTitle}>MEALS TO TRACK</Text>
              <View style={SectionStyles.sectionWrapper}>{meals}</View>
              <Text
                key={"mealsToTrackHelpText"}
                style={SectionStyles.sectionHelpText}
              >
                Rename, add or remove meals, and set the time for each.
              </Text>
            </View>
          </View>
          <View style={SectionStyles.container}>
            <SwitchRow
              title="Track Water"
              onValueChange={this.handleToggleWater.bind(this)}
              value={waterTracking}
            />
            <View style={{ height: 15 }} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const waterTracking = _getWaterTrackingState(state);
  const { plan } = state;
  return { waterTracking, plan };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleWater: waterToggleState => {
      dispatch(toggleWaterTracking(waterToggleState));
    },
    editMeal: (mealIdx, field, value) => {
      dispatch(editMeal(mealIdx, field, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
