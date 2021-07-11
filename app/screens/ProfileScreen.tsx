import { Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { ScrollView } from "react-native";
import { profileScreenStyle } from "styles/jss";

export default function ProfileScreen() {
  const styles = useStyleSheet(profileScreenStyle);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>WIP</Text>
    </ScrollView>
  );
}
