import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { clearSavedState } from "../store/configureStore";

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    console.log(event);
    if (event.type == "NavBarButtonPress") {
      if (event.id == "menu-done") {
        this.props.navigator.dismissModal();
      }
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableHighlight onPress={clearSavedState}>
          <Text
            style={{
              fontFamily: "FugazOne-Regular",
              fontSize: 24
            }}
          >
            MenuThis!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default MenuScreen;
