import { StyleSheet, Dimensions } from "react-native";
import { isSeSize } from "../utils";
import Colors from "./colors";
import { FormSettings } from "../styles/formStyles";
const isSe = isSeSize();

export const MapScreenStyles = StyleSheet.create({
  appWrap: {
    backgroundColor: "rgb(245, 245, 245)",
    flex: 1,
  },
  box: {
    backgroundColor: "rgb(102, 102, 102)",
    height: 50,
  },
  topBottomBorder: {
    borderColor: "#acacac",
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
    marginRight: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  weightText: {
    fontSize: isSe ? 18 : 20,
    letterSpacing: -1,
    marginRight: 6,
  },
  weightTextActive: {
    fontSize: 20,
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
    marginRight: isSe ? 8 : 14,
    marginLeft: isSe ? 0 : 8,
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
