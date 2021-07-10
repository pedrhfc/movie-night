import { Dimensions, Platform, StatusBar } from "react-native";

const DEFAULT_COLOR = "#06070E";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height - 400;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const container: Object = {
  flex: 1,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};

export { DEFAULT_COLOR, SLIDER_WIDTH, ITEM_HEIGHT, ITEM_WIDTH, container };
