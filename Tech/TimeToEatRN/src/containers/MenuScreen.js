import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { clearSavedState } from "../store/configureStore";
import DateBackButton from "../components/DateBackButton";

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { dayId } = screenProps;
    return {
      headerTitle: null,
      headerStyle: {
        paddingRight: 12,
        paddingLeft: 12
      },
      headerLeft: (
        <DateBackButton onPress={() => navigation.goBack()} dayId={dayId} />
      )
    };
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(245, 245, 245)"
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
