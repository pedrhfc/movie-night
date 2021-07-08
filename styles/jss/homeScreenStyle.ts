import { StyleService } from "@ui-kitten/components";
import { container, ITEM_HEIGHT } from "styles/variables";

const homeScreenStyle = StyleService.create({
  container,
  carousel: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  text: {
    alignSelf: "flex-start",
    marginBottom: 36,
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
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default homeScreenStyle;
