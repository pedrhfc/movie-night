import { Button, Icon } from "@ui-kitten/components";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Movie } from "shared/interfaces/general.interfaces";
import { ITEM_HEIGHT, ITEM_WIDTH } from "styles/variables";

interface CarouselItemProps {
  item: Movie;
  onPress: () => void;
}

function CarouselItem({ item, onPress }: CarouselItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: item.large_cover_image }}
        imageStyle={styles.image}
        style={styles.imageBackground}
      >
        <View style={styles.innerText}>
          <Button
            appearance="filled"
            status="basic"
            size="small"
            accessoryLeft={(props) => <Icon {...props} name="calendar" />}
          >
            {item.year}
          </Button>
          <Button
            appearance="filled"
            status="warning"
            size="small"
            accessoryLeft={(props) => <Icon {...props} name="star" />}
          >
            {item.rating === 0 ? "UNRATED" : item.rating}
          </Button>
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
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default CarouselItem;
