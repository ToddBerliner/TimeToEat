import React, { Component } from "react";
import { connect } from "react-redux";

import AppWithNavigationState from "../navigators/AppNavigator";
import AppWithOnboarding from "../navigators/OnboardingNavigator";

class NavSwitch extends Component {
  render() {
    return this.props.onboardingComplete ? (
      <AppWithNavigationState />
    ) : (
      <AppWithOnboarding />
    );
  }
}

mapStateToProps = state => {
  return {
    onboardingComplete: state.uiState.onboardingComplete,
  };
};

export default connect(mapStateToProps)(NavSwitch);
