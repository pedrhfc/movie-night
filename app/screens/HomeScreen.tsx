import { StackScreenProps } from "@react-navigation/stack";
import {
  IconProps,
  Input,
  Spinner,
  Text,
  useStyleSheet
} from "@ui-kitten/components";
import { ButtonIcon, CarouselItem, SimpleList } from "components";
import * as React from "react";
import { useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { RootStackParamList } from "shared/interfaces/navigation.interfaces";
import { useMovies } from "shared/services/Movies";
import { homeScreenStyle } from "styles/jss";
import { ITEM_WIDTH, SLIDER_WIDTH } from "styles/variables";
import { isBlank } from "util/mixins";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const styles = useStyleSheet(homeScreenStyle);

  const [value, setValue] = useState<string>("");

  const [refreshing, setRefreshing] = React.useState(false);

  const { data, isLoading, refresh, urlParams } = useMovies();
  const isCarousel = useRef(null);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    refresh().then(() => setRefreshing(false));
  }, [refreshing]);

  const searchIcon = (props: IconProps) => (
    <ButtonIcon
      onPress={() => handleSearch()}
      disabled={isBlank(value)}
      iconProps={{ ...props, name: "search-outline" }}
    />
  );

  const closeIcon = (props: IconProps) =>
    !isBlank(value) ? (
      <ButtonIcon
        onPress={() => handleClose()}
        iconProps={{ ...props, name: "close-outline" }}
      />
    ) : (
      <></>
    );

  const handleSearch = () => urlParams({ query_term: value });

  const handleClose = () => {
    setValue("");
    urlParams({});
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, styles.homeContainer]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SimpleList
        reverse
        title="Hello, John Doe!"
        description="Search for your favorite movies"
        source={{ uri: "https://thispersondoesnotexist.com/image" }}
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
            renderItem={({ item }) => (
              <CarouselItem
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.replace("MovieInfo", {
                    id: item.id,
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
