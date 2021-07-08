import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_HEIGHT = Dimensions.get("window").height - 400;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

function CarouselCardItem({ item, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: item.large_cover_image }}
        imageStyle={styles.image}
        style={styles.imageBackground}
      >
        <View style={styles.innerText}>
          <Text>{item.year}</Text>
          <Text>{item.rating}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
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

export default CarouselCardItem;
