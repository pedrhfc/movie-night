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
import { Movie } from "shared/interfaces/general.interfaces";
import { RootStackParamList } from "shared/interfaces/navigation.interfaces";
import { getFavorites } from "shared/services/AsyncStorage";
import { favoritesScreenStyle } from "styles/jss";

export default function FavoritesScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const styles = useStyleSheet(favoritesScreenStyle);

  const [favorites, setFavorites] = useState([]);

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

  const renderItem = ({ item }: { item: Movie }) => (
    <Card
      style={styles.card}
      footer={() => renderItemFooter(item)}
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
