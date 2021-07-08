import { Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { ScrollView } from "react-native";
import { profileScreenStyle } from "styles/jss";

export default function NavigateScreen() {
  const styles = useStyleSheet(profileScreenStyle);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Teste</Text>
    </ScrollView>
  );
}
