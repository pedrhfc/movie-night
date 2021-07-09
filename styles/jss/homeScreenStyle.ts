import { StyleService } from "@ui-kitten/components";
import { container, ITEM_HEIGHT } from "styles/variables";

const homeScreenStyle = StyleService.create({
  container,
  carousel: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  list: {
    backgroundColor: "transparent",
    marginHorizontal: 30,
  },
  text: {
    alignSelf: "flex-start",
    margin: 30,
  },
  inputText: {
    paddingVertical: 10,
  },
  input: {
    borderRadius: 16,
    fontWeight: "400",
    backgroundColor: "transparent",
    color: "#282828",
    marginVertical: 36,
    marginHorizontal: 30,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default homeScreenStyle;
