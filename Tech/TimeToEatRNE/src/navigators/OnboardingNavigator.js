import React from "react";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import WelcomeScreen from "../containers/onboarding/WelcomeScreen";
import SetupScreen from "../containers/onboarding/SetupScreen";
import AppWithNavigationState from "./AppNavigator";

export const OnboardingNavigator = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Setup: { screen: SetupScreen },
    MapScreen: { screen: AppWithNavigationState },
  },
  {
    initialRouteName: "Welcome",
  },
);

const AppWithOnboarding = ({ dispatch, nav, onOnboardingComplete }) => {
  return <OnboardingNavigator />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    nav: state.nav,
  };
};

export default connect(mapStateToProps)(AppWithOnboarding);
