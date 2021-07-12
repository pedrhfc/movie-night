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
import { ButtonIcon, SimpleList, Tag } from "components";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Movie from "shared/interfaces/general.interfaces";
import { RootStackParamList } from "shared/interfaces/navigation.interfaces";
import { getFavorites, storeData } from "shared/services/AsyncStorage";
import { useMovies } from "shared/services/Movies";
import { movieScreenStyle } from "styles/jss";

export default function MovieInfoScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "MovieInfo">) {
  const { params } = route;

  const styles = useStyleSheet(movieScreenStyle);

  const { movie, isLoading } = useMovies(
    { movie_id: params?.id, with_cast: true },
    "movie_details"
  );
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const favorites: Movie[] = await getFavorites();

      const index = favorites?.find((favorite) => favorite.id === movie?.id);

      index ? setFavorite(true) : setFavorite(false);
    };
    fetchData();
  }, [movie]);

  const handleFavorite = async () => {
    await storeData({
      id: movie?.id,
      title: movie?.title,
      rating: movie?.rating,
      language: movie?.language,
      year: movie?.year,
      large_cover_image: movie?.large_cover_image,
    });

    setFavorite(!isFavorite);

    ToastAndroid.show(
      isFavorite
        ? `Removed ${movie?.title} from bookmarks`
        : `Added ${movie?.title} to bookmarks`,
      ToastAndroid.SHORT
    );
  };

  const goBackIcon = (props: IconProps) => (
    <ButtonIcon
      onPress={() =>
        navigation.canGoBack()
          ? navigation.goBack()
          : navigation.replace("Root")
      }
      iconProps={{ ...props, name: "arrow-ios-back" }}
    />
  );
  const bookmarkIcon = (props: IconProps) => (
    <ButtonIcon
      onPress={handleFavorite}
      iconProps={{
        ...props,
        name: isFavorite ? "bookmark" : "bookmark-outline",
      }}
    />
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
              uri: movie?.large_cover_image,
            }}
            style={{ width: "100%", height: "25%" }}
          />
          <SafeAreaView style={styles.movieContainer}>
            <ScrollView>
              <Text category="h1">{movie?.title}</Text>
              <View style={styles.rating}>
                <Button
                  appearance="ghost"
                  status="warning"
                  accessoryLeft={(props) => <Icon {...props} name="star" />}
                >
                  {movie?.rating === 0 ? "UNRATED" : movie?.rating}
                </Button>
                <Tag>{movie?.year}</Tag>
                <Tag>{movie?.language}</Tag>
              </View>
              <Text appearance="hint">{movie?.description_intro}</Text>
              <Text category="h3">Genre</Text>
              <View style={styles.genreTag}>
                {movie?.genres?.map((genre: string, key: number) => (
                  <Tag key={key}>{genre}</Tag>
                ))}
              </View>
              <Text category="h3">Cast</Text>
              {movie?.cast?.map(
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
