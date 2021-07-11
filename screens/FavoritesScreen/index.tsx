import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  Card,
  Icon,
  List,
  Text,
  useStyleSheet
} from "@ui-kitten/components";
import { SimpleList } from "components";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { getFavorites } from "services/AsyncStorage";
import { favoritesScreenStyle } from "styles/jss";
import { Movie, RootStackParamList } from "types";

interface RenderItemProps {
  item: Movie;
  index: number;
}

export default function FavoritesScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const styles = useStyleSheet(favoritesScreenStyle);

  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    fetchData();
  }, []);

  const renderItemFooter = (item: Movie) => (
    <View style={styles.footerView}>
      <Button appearance="ghost">
        {() => <Text>{`lang: ${item.language}`}</Text>}
      </Button>
      <Button
        appearance="ghost"
        status="warning"
        accessoryLeft={(props) => <Icon {...props} name="star" />}
      >
        {item.rating}
      </Button>
    </View>
  );

  const renderItem = ({ item }: RenderItemProps) => (
    <Card
      style={styles.card}
      footer={(_: any) => renderItemFooter(item)}
      onPress={() =>
        navigation.replace("MovieInfo", {
          id: item.id,
        })
      }
    >
      <SimpleList
        title={item.title}
        description={item.year}
        source={{ uri: item.large_cover_image }}
      />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text category="h5" style={styles.text}>
        Favorites
      </Text>
      {favorites && favorites?.length !== 0 ? (
        <List data={favorites} renderItem={renderItem} style={styles.list} />
      ) : (
        <Text style={{ textAlign: "center" }}>
          Oops! No favorites found yet.
        </Text>
      )}
    </SafeAreaView>
  );
}
