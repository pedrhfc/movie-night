import { StyleService } from "@ui-kitten/components";
import { container } from "styles/variables";

const favoritesScreenStyle = StyleService.create({
  container,
  list: {
    backgroundColor: "transparent",
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 16,
    marginVertical: 16,
    marginHorizontal: 30,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    alignSelf: "flex-start",
    margin: 30,
  },
});

export default favoritesScreenStyle;
