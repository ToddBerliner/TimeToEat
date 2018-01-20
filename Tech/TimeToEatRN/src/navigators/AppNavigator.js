import React from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import MapScreen from "../containers/MapScreen";
import MenuScreen from "../containers/MenuScreen";
import MetricsScreen from "../containers/MetricsScreen";

export const AppNavigator = StackNavigator(
  {
    Menu: {
      screen: MenuScreen
    },
    Map: {
      screen: MapScreen
    },
    Metrics: {
      screen: MetricsScreen
    }
  },
  {
    initialRouteName: "Map"
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
};

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
