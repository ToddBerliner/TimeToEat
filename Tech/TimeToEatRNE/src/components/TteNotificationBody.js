import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  Image,
  Vibration,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Ionicons } from "@expo/vector-icons";

const styles = {
  root: {
    flex: 1,
    backgroundColor: "#050505",
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconApp: {
    resizeMode: "contain",
    width: 36,
    height: 36,
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 18,
  },
  icon: {
    resizeMode: "contain",
    width: 36,
    height: 36,
    marginLeft: 12,
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
  },
  closeIcon: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 24,
  },
  message: {
    color: "#FFF",
    marginTop: 5,
  },
  footer: {
    backgroundColor: "#696969",
    borderRadius: 5,
    alignSelf: "center",
    height: 5,
    width: 35,
    margin: 5,
  },
};

class TteNotificationBody extends React.Component {
  constructor() {
    super();

    this.onSwipe = this.onSwipe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      StatusBar.setHidden(nextProps.isOpen);
    }

    if (
      (this.props.vibrate || nextProps.vibrate) &&
      nextProps.isOpen &&
      !this.props.isOpen
    ) {
      Vibration.vibrate();
    }
  }

  onSwipe(direction) {
    const { SWIPE_UP } = swipeDirections;

    if (direction === SWIPE_UP) {
      this.props.onClose();
    }
  }

  renderIcon() {
    const { iconApp, icon } = this.props;

    if (icon) {
      return <Image source={icon} style={styles.icon} />;
    } else if (iconApp) {
      return <Image source={iconApp} style={styles.iconApp} />;
    }

    return null;
  }

  render() {
    const { title, message, onPress, onClose, iconApp, icon } = this.props;
    const textMargin = !iconApp && !icon ? 18 : 0;

    return (
      <View style={styles.root}>
        <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
          <View style={styles.content}>
            {this.renderIcon()}
            <View style={[styles.textContainer, { marginLeft: textMargin }]}>
              <Text numberOfLines={1} style={styles.message}>
                {message}
              </Text>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.3}
              underlayColor="transparent"
              onPress={() => {
                onClose();
              }}
            >
              <Ionicons name="ios-close-circle-outline" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.footer} />
        </GestureRecognizer>
      </View>
    );
  }
}

TteNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
};

TteNotificationBody.defaultProps = {
  title: "Notification",
  message: "This is a test notification",
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
};

export default TteNotificationBody;
