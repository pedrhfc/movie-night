import { StyleSheet } from "react-native";
import { ITEM_HEIGHT, ITEM_WIDTH } from "styles/variables";

const carouselRenderItemStyle = StyleSheet.create({
  imageBackground: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 32,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  innerText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default carouselRenderItemStyle;
