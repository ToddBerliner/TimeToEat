import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "../containers/MapScreen";
import MenuScreen from "../containers/MenuScreen";
import MetricsScreen from "../containers/MetricsScreen";
import HelpScreen from "../components/HelpScreen";
import SchemeScreen from "../containers/SchemeScreen";
import { _getSelectedDayId, _getScheme } from "../store/reducer";

export const AppNavigator = StackNavigator(
  {
    Menu: {
      screen: MenuScreen,
    },
    Map: {
      screen: MapScreen,
    },
    Metrics: {
      screen: MetricsScreen,
    },
    Help: {
      screen: HelpScreen,
    },
    Scheme: {
      screen: SchemeScreen,
    },
  },
  {
    initialRouteName: "Metrics",
    mode: "modal",
  },
);

const AppWithNavigationState = ({ dispatch, nav, dayId, scheme }) => {
  return <AppNavigator screenProps={{ dayId, scheme }} />;
};

const mapStateToProps = state => {
  return {
    nav: state.nav,
    dayId: _getSelectedDayId(state),
    scheme: _getScheme(state),
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
