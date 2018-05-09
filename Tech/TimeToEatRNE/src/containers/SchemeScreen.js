import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import HeaderShadow from "../components/HeaderShadow";
import Line from "../components/forms/Line";
import { Schemes } from "../styles/styles";
import { FormSettings } from "../styles/formStyles";
import { BackgroundColors } from "../styles/colors";
import { isSeSize } from "../utils";
import Icon from "react-native-vector-icons/Ionicons";
import {
  setScheme,
  getScheme,
  BOARD_LT,
  HERBS_LT,
  NUTS,
} from "../store/uiState/reducer";
import Colors, { HeaderColors } from "../styles/colors";
const backgrounds = {
  board_lt: require("../../assets/scheme_board.png"),
  herbs_lt: require("../../assets/scheme_herbs.png"),
  nuts: require("../../assets/scheme_nuts.png"),
};
const labels = {
  board_lt: "The Board",
  herbs_lt: "Green Herbs",
  nuts: "Nuts & Leaves",
};

class SchemeBlock extends React.PureComponent {
  render() {
    const { height } = Dimensions.get("window");
    const itemHeight = 150;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(this.props.scheme);
        }}
      >
        <View
          style={{
            height: itemHeight,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: FormSettings.textMarginLeft,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {labels[this.props.scheme]}
            </Text>
            {this.props.selected && (
              <Icon
                name="ios-checkmark-circle-outline"
                size={48}
                style={{ marginRight: 12 }}
              />
            )}
          </View>

          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={backgrounds[this.props.scheme]}
            resizeMode="cover"
          />
          <View
            style={{
              width: 150,
              height: 50,
              overflow: "hidden",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <View
              style={{
                height: 20,
                width: 200,
                position: "absolute",
                bottom: -20,
                right: -20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1.0,
                shadowRadius: 12,
              }}
            />
          </View>
        </View>
        {this.props.idx < 4 && (
          <Line marginLeft={FormSettings.textMarginLeft} />
        )}
      </TouchableOpacity>
    );
  }
}

class SchemeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { dayId, scheme } = screenProps;
    return {
      headerTitle: null,
      headerStyle: [
        {
          paddingRight: 12,
          paddingLeft: 12,
        },
        Schemes[scheme].header,
      ],
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()} dayId={dayId}>
          <Text
            style={{
              fontFamily: "fugaz-one-regular",
              color: HeaderColors[scheme],
              fontSize: 16,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  render() {
    const isSe = isSeSize();
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BackgroundColors[this.props.scheme],
          paddingTop: isSe ? 8 : 20,
        }}
      >
        <Text
          style={{
            fontFamily: "fugaz-one-regular",
            fontSize: isSe ? 24 : 36,
            marginLeft: FormSettings.textMarginLeft,
            color: Colors[this.props.scheme],
          }}
        >
          Select a Theme
        </Text>
        <View
          style={{
            backgroundColor: "white",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.borderGrey,
          }}
        >
          {["board_lt", "herbs_lt", "nuts"].map((scheme, idx) => (
            <SchemeBlock
              scheme={scheme}
              key={scheme}
              idx={idx}
              selected={scheme === this.props.scheme}
              onPress={scheme => {
                this.props.setScheme(scheme);
              }}
            />
          ))}
        </View>
        <HeaderShadow />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const scheme = getScheme(state.uiState);
  return { scheme };
};

const mapDispatchToProps = dispatch => {
  return {
    setScheme: scheme => {
      dispatch(setScheme(scheme));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemeScreen);
