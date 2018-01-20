import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight
} from "react-native";
import DateBackButton from "../components/DateBackButton";

class MetricsScreen extends React.Component {
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
        <Text
          style={{
            fontFamily: "FugazOne-Regular",
            fontSize: 24
          }}
        >
          MetricThis!
        </Text>
      </View>
    );
  }
}

export default MetricsScreen;
