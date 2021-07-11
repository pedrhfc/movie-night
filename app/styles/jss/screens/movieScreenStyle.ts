import { StyleService } from "@ui-kitten/components";
import { container } from "styles/variables";

const movieScreenStyle = StyleService.create({
  container,
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movieContainer: {
    flex: 1,
    margin: 30,
  },
  rating: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  genreTag: {
    flexDirection: "row",
  },
});

export default movieScreenStyle;
