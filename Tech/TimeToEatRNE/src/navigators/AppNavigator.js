import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import MapScreen from "../containers/MapScreen";
import MenuScreen from "../containers/MenuScreen";
import MetricsScreen from "../containers/MetricsScreen";
import { _getSelectedDayId } from "../store/reducer";

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
  },
  {
    initialRouteName: "Menu",
    mode: "modal",
  },
);

const AppWithNavigationState = ({ dispatch, nav, dayId }) => {
  return <AppNavigator screenProps={{ dayId }} />;
};

const mapStateToProps = state => {
  return {
    nav: state.nav,
    dayId: _getSelectedDayId(state),
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
