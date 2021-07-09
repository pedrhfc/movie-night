import { StackScreenProps } from "@react-navigation/stack";
import {
  Avatar,
  Icon,
  IconProps,
  Input,
  ListItem,
  Spinner,
  Text,
  useStyleSheet
} from "@ui-kitten/components";
import { CarouselRenderItem } from "components";
import * as React from "react";
import { useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useMovies } from "services/Movies";
import { homeScreenStyle } from "styles/jss";
import { ITEM_WIDTH, SLIDER_WIDTH } from "styles/variables";
import { RootStackParamList } from "types";
import { isBlank } from "utils/mixins";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const styles = useStyleSheet(homeScreenStyle);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const [value, setValue] = useState<string>("");

  const [refreshing, setRefreshing] = React.useState(false);

  const { data, isLoading, refresh, urlParams } = useMovies();
  const isCarousel = useRef(null);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    refresh().then(() => setRefreshing(false));
  }, [refreshing]);

  const searchIcon = (props: IconProps) => (
    <TouchableOpacity disabled={isBlank(value)} onPress={() => handleSearch()}>
      <Icon {...props} name="search-outline" />
    </TouchableOpacity>
  );

  const closeIcon = (props: IconProps) =>
    isPressed ? (
      <TouchableOpacity onPress={() => handleClose()}>
        <Icon {...props} name="close-outline" />
      </TouchableOpacity>
    ) : (
      <></>
    );

  const handleSearch = () => {
    setIsPressed(true);
    urlParams({ query_term: value });
    console.log(value);
  };

  const handleClose = () => {
    setIsPressed(false);
    setValue("");
    urlParams({});
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ListItem
        style={styles.list}
        title="Hello, John Doe!"
        description="Search for your favorite movies"
        accessoryRight={() => (
          <Avatar
            source={{ uri: "https://thispersondoesnotexist.com/image" }}
            size="giant"
          />
        )}
      />
      <Input
        style={styles.input}
        textStyle={styles.inputText}
        value={value}
        placeholder="Search"
        accessoryLeft={searchIcon}
        accessoryRight={closeIcon}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Text category="h5" style={styles.text}>
        Last Added
      </Text>

      <View style={styles.carousel}>
        {isLoading ? (
          <Spinner style={{ alignContent: "center" }} />
        ) : data.movies ? (
          <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={data.movies}
            renderItem={({ item }: any) => (
              <CarouselRenderItem
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.replace("MovieInfo", {
                    imdb_code: item.imdb_code,
                  })
                }
              />
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        ) : (
          <Text>Oops! Movie not found</Text>
        )}
      </View>
    </ScrollView>
  );
}
