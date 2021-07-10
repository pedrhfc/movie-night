import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  Icon,
  IconProps,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet
} from "@ui-kitten/components";
import { SimpleList, Tag } from "components";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLazyMovies } from "services/Movies";
import { movieScreenStyle } from "styles/jss";
import { RootStackParamList } from "types";

export default function MovieInfoScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "MovieInfo">) {
  const { params } = route;

  const { data, isLoading, getData } = useLazyMovies();

  //temporary: just checking button behavior
  const [isFavorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!isFavorite);
    ToastAndroid.show(
      isFavorite
        ? "Removed from bookmarks - not actually lol (yet)"
        : "Added to bookmarks - not really (todo)",
      ToastAndroid.SHORT
    );
  };

  useEffect(() => {
    getData({ movie_id: params?.id, with_cast: true }, "movie_details");
  }, []);

  const styles = useStyleSheet(movieScreenStyle);

  const goBackIcon = (props: IconProps) => (
    <TouchableOpacity onPress={() => navigation.replace("Root")}>
      <Icon {...props} name="arrow-ios-back" />
    </TouchableOpacity>
  );
  const bookmarkIcon = (props: IconProps) => (
    <TouchableOpacity onPress={handleFavorite}>
      <Icon {...props} name={isFavorite ? "bookmark" : "bookmark-outline"} />
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <View style={styles.spinnerStyle}>
          <Spinner />
        </View>
      ) : (
        <React.Fragment>
          <TopNavigation
            appearance="control"
            accessoryLeft={(props) => (
              <TopNavigationAction icon={goBackIcon} {...props} />
            )}
            accessoryRight={(props) => (
              <TopNavigationAction icon={bookmarkIcon} {...props} />
            )}
          />
          <Image
            blurRadius={1}
            source={{
              uri: data?.movie?.large_cover_image,
            }}
            style={{ width: "100%", height: "25%" }}
          />
          <SafeAreaView style={styles.movieContainer}>
            <ScrollView>
              <Text category="h1">{data?.movie?.title}</Text>
              <View style={styles.rating}>
                <Button
                  appearance="ghost"
                  status="warning"
                  accessoryLeft={(props) => <Icon {...props} name="star" />}
                >
                  {data?.movie?.rating === 0 ? "UNRATED" : data?.movie?.rating}
                </Button>
                <Tag>{data?.movie?.year}</Tag>
                <Tag>{data?.movie?.language}</Tag>
              </View>
              <Text appearance="hint">{data?.movie?.description_intro}</Text>
              <Text category="h3">Genre</Text>
              <View style={styles.genreTag}>
                {data?.movie?.genres?.map((genre: string, key: number) => (
                  <Tag key={key}>{genre}</Tag>
                ))}
              </View>
              <Text category="h3">Cast</Text>
              {data?.movie?.cast?.map(
                ({ name, character_name, url_small_image }, key) => (
                  <SimpleList
                    reverse
                    key={key}
                    title={name}
                    description={`as ${character_name}`}
                    source={{
                      uri: url_small_image,
                    }}
                  />
                )
              ) ?? <Text>No cast was found.</Text>}
            </ScrollView>
          </SafeAreaView>
        </React.Fragment>
      )}
    </ScrollView>
  );
}
