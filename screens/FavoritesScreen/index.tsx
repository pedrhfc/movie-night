import { Divider, List, ListItem, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { ScrollView } from "react-native";
import { favoritesScreenStyle } from "styles/jss";

const data = new Array(8).fill({
  title: "Item",
  description: "Description for Item",
});

export default function FavoritesScreen() {
  const styles = useStyleSheet(favoritesScreenStyle);

  const renderItem = () => <ListItem title="title" description="description" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List
        style={{ maxHeight: 200, width: "100%" }}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}
