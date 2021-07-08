import {
  Icon,
  IconProps, Text, TopNavigation,
  TopNavigationAction,
  useStyleSheet
} from "@ui-kitten/components";
import React, { useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import useMovies from "services/Movies";
import { movieScreenStyle } from "styles/jss";

export default function MovieInfoScreen({ route, navigation }: any) {
  const { params } = route;

  const { data, isLoading, refresh, urlParams } = useMovies();

  useEffect(() => {
    urlParams({ query_term: 'tt11468316' });
  });

  const styles = useStyleSheet(movieScreenStyle);

  const goBackIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={() => navigation.replace("Root")}>
      <Icon {...props} name="arrow-ios-back" />
    </TouchableWithoutFeedback>
  );

  const bookmarkIcon = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={() => console.log("bookmark")}>
      <Icon {...props} name="bookmark-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopNavigation
        appearance="control"
        accessoryLeft={(props) => (
          <TopNavigationAction icon={goBackIcon} {...props} />
        )}
        accessoryRight={(props) => (
          <TopNavigationAction icon={bookmarkIcon} {...props} />
        )}
      />
      <Text>{data.movies[0]?.title}</Text>
    </ScrollView>
  );
}
