import { StyleSheet, Dimensions } from "react-native";
import { isSeSize } from "../utils";
import Colors from "./colors";
import { FormSettings } from "../styles/formStyles";
const isSe = isSeSize();

export const Schemes = {
  board: StyleSheet.create({
    header: {
      backgroundColor: "#F7E6B5",
    },
  }),
  board_lt: StyleSheet.create({
    header: {
      backgroundColor: "#F7E6B5",
    },
  }),
  coffee: StyleSheet.create({
    header: {
      backgroundColor: "#A16C4F",
    },
  }),
  coffee_lt: StyleSheet.create({
    header: {
      backgroundColor: "#A16C4F",
    },
  }),
  herbs: StyleSheet.create({
    header: {
      backgroundColor: "#DFF3C8",
    },
  }),
  herbs_lt: StyleSheet.create({
    header: {
      backgroundColor: "#DFF3C8",
    },
  }),
  nuts: StyleSheet.create({
    header: {
      backgroundColor: "#23A2CE",
    },
  }),
  nuts_lt: StyleSheet.create({
    header: {
      backgroundColor: "#23A2CE",
    },
  }),
  pasta: StyleSheet.create({
    header: {
      backgroundColor: "#EFAE27",
    },
  }),
  pasta_lt: StyleSheet.create({
    header: {
      backgroundColor: "#EFAE27",
    },
  }),
};

export const TextStyles = StyleSheet.create({
  contentWrap: {
    marginLeft: FormSettings.textMarginLeft,
    marginRight: FormSettings.textMarginLeft,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  contentCentered: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  centered: {
    textAlign: "center",
  },
  title: {
    fontFamily: "fugaz-one-regular",
    fontSize: isSe ? 24 : 36,
  },
  subTitle: {
    fontFamily: "fugaz-one-regular",
    fontSize: isSe ? 18 : 22,
    marginBottom: 8,
  },
  link: {
    color: Colors.blue,
  },
});

export const IntroStyles = StyleSheet.create({
  mask: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.45,
  },
  wrap: {
    marginTop: isSe ? 40 : 60,
    marginRight: isSe ? 10 : 20,
    marginLeft: isSe ? 10 : 20,
    marginBottom: isSe ? 10 : 20,
    backgroundColor: "white",
    borderRadius: 40,
    flex: 1,
    paddingTop: isSe ? 15 : 30,
    paddingLeft: isSe ? 15 : 30,
    paddingRight: isSe ? 15 : 30,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentWrap: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    fontSize: isSe ? 14 : 16,
    marginBottom: isSe ? 4 : 8,
    textAlign: "center",
  },
  sectionWrap: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: isSe ? 8 : 16,
  },
  divider: {
    width: 200,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    marginBottom: isSe ? 8 : 16,
  },
});

export const MapScreenStyles = StyleSheet.create({
  appWrap: {
    backgroundColor: Colors.superLtGrey,
    flex: 1,
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  box: {
    backgroundColor: Colors.borderGrey,
    height: 50,
  },
  topBottomBorder: {
    borderColor: Colors.borderGrey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  weightRow: {
    flexDirection: "column",
    marginTop: 12,
  },
  weightTextRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  weightTextButton: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 30,
    paddingRight: 30,
    paddingLeft: 10,
    height: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginRight: 10,
  },
  weightButtonIcon: {
    position: "absolute",
    top: 5,
    right: 7,
  },
  weightText: {
    fontSize: isSe ? 18 : 20,
    letterSpacing: -1,
    marginRight: 6,
  },
  weightTextActive: {
    fontSize: isSe ? 18 : 20,
    letterSpacing: -1,
    marginRight: 6,
    color: Colors.textRed,
  },
  weightTextLabel: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 2,
  },
  weightTextLabelActive: {
    fontSize: 20,
    letterSpacing: -1,
    marginLeft: 2,
    color: Colors.textRed,
  },
  bodyRow: {
    flex: 1,
  },
  titleRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginRight: 14,
  },
  titleRowLeft: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRowRight: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 14,
    marginRight: 14,
  },
  collapsed: {
    height: 0,
    overflow: "hidden",
  },
});

export const HelpScreenStyles = StyleSheet.create({
  helpWrap: {
    flex: 1,
    backgroundColor: Colors.superLtGrey,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: FormSettings.textMarginLeft,
    marginRight: FormSettings.textMarginLeft,
    marginBottom: isSe ? 4 : 8,
  },
  headerText: {
    fontFamily: "fugaz-one-regular",
    fontSize: isSe ? 18 : 22,
    marginLeft: 10,
  },
  helpSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderGrey,
    paddingTop: isSe ? 12 : 24,
    paddingBottom: isSe ? 8 : 12,
    marginBottom: isSe ? 8 : 12,
    paddingLeft: FormSettings.textMarginLeft,
    paddingRight: FormSettings.textMarginLeft,
    backgroundColor: "white",
  },
});

export const MenuScreenStyles = StyleSheet.create({
  settingsWrap: {
    flex: 1,
    backgroundColor: Colors.superLtGrey,
    paddingTop: isSe ? 8 : 20,
  },
  title: {
    fontFamily: "fugaz-one-regular",
    fontSize: isSe ? 24 : 36,
    marginLeft: FormSettings.textMarginLeft,
  },
  notificationsMsgWrap: {
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  helpButtonRow: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 15,
  },
  linkRow: {
    alignSelf: "center",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
});

export const MetricsScreenStyles = StyleSheet.create({
  metricsWrap: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "whitesmoke",
    paddingTop: isSe ? 8 : 20,
  },
  title: {
    alignSelf: "flex-start",
    fontFamily: "fugaz-one-regular",
    fontSize: isSe ? 24 : 36,
    marginLeft: FormSettings.textMarginLeft,
    marginBottom: isSe ? 12 : 20,
  },
  trackingLegendWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 8,
  },
  trackingLegendDot: {
    width: isSe ? 12 : 15,
    height: isSe ? 12 : 15,
    borderRadius: 7,
  },
  trackingLegendText: {
    fontSize: 12,
    color: "#808080",
    marginLeft: 4,
  },
});

export const ButtonStyles = {
  textMarginLeft: 15,
  defaultCellHeight: 44,
};
export const obText = {
  width: "90%",
  fontSize: 16,
  marginBottom: 16,
};
export const obSmallTitle = {
  textAlign: "center",
  fontFamily: "fugaz-one-regular",
  fontSize: 24,
  letterSpacing: -1,
  marginBottom: 20,
};
export const obTitle = {
  textAlign: "center",
  fontFamily: "fugaz-one-regular",
  fontSize: 36,
  letterSpacing: -1,
  marginBottom: 20,
};
export const whiteBlock = {
  width: "100%",
  borderTopWidth: 1,
  borderBottomWidth: 1,
  marginBottom: 10,
  backgroundColor: "white",
  borderColor: "#D3D3D3",
  paddingTop: 8,
  paddingBottom: 8,
};
export const topBottomBorder = {
  borderColor: "#acacac",
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
};
