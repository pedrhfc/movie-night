import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height - 400;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  SLIDER_WIDTH,
  ITEM_HEIGHT,
  ITEM_WIDTH,
};
