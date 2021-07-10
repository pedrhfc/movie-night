import {
  Button,
  Card,
  Icon,
  List, Text,
  useStyleSheet
} from "@ui-kitten/components";
import { SimpleList } from "components";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { favoritesScreenStyle } from "styles/jss";

type Data = {
  title: string;
  description: string;
};

interface RenderItemProps {
  item: Data;
  index: number;
}

const data: Data[] = new Array(4).fill({
  title: "Title for Item",
  description: "Description for Item",
});

export default function FavoritesScreen() {
  const styles = useStyleSheet(favoritesScreenStyle);

  const renderItemFooter = () => (
    <View style={styles.footerView}>
      <Button appearance="ghost">Movie</Button>
      <Button
        appearance="ghost"
        status="warning"
        accessoryLeft={(props) => <Icon {...props} name="star" />}
      >
        8.5
      </Button>
    </View>
  );

  const renderItem = ({ item, index }: RenderItemProps) => (
    <Card style={styles.card} footer={renderItemFooter}>
      <SimpleList
        title={item.title}
        description={`${item.description} ${index + 1}`}
        source={{ uri: "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217" }}
      />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text category="h5" style={styles.text}>
        Favorites
      </Text>
      <List data={data} renderItem={renderItem} style={styles.list} />
    </SafeAreaView>
  );
}
