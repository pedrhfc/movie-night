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
import { Tag } from "components";
import React, { useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useLazyMovies } from "services/Movies";
import { movieScreenStyle } from "styles/jss";

export default function MovieInfoScreen({ route, navigation }: any) {
  const { params } = route;

  const { data, isLoading, getData } = useLazyMovies();

  useEffect(() => {
    getData({ query_term: params.imdb_code });
  }, []);

  const styles = useStyleSheet(movieScreenStyle);

  const goBackIcon = (props: IconProps) => (
    <TouchableOpacity onPress={() => navigation.replace("Root")}>
      <Icon {...props} name="arrow-ios-back" />
    </TouchableOpacity>
  );

  const bookmarkIcon = (props: IconProps) => (
    <TouchableOpacity onPress={() => console.log("bookmark")}>
      <Icon {...props} name="bookmark-outline" />
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
            style={{
              width: "100%",
              height: "25%",
            }}
            source={{
              uri: data?.movies[0]?.large_cover_image,
            }}
          ></Image>
          <View style={styles.movieContainer}>
            <Text category="h1">{data?.movies[0]?.title}</Text>
            <View style={styles.rating}>
              <Button
                appearance="ghost"
                status="warning"
                accessoryLeft={(props) => <Icon {...props} name="star" />}
              >
                {data?.movies[0]?.rating === 0
                  ? "UNRATED"
                  : data?.movies[0]?.rating}
              </Button>
              <Tag>{data?.movies[0]?.year}</Tag>
              <Tag>{data?.movies[0]?.language}</Tag>
            </View>
            <Text appearance="hint">{data?.movies[0]?.synopsis}</Text>
            <Text category="h3">Genre</Text>
            <View style={styles.genreTag}>
              {data?.movies[0]?.genres.map((genre: string, key: number) => (
                <Tag key={key}>{genre}</Tag>
              ))}
            </View>
          </View>
        </React.Fragment>
      )}
    </ScrollView>
  );
}
