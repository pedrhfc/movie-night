import { StackScreenProps } from "@react-navigation/stack";
import { useStyleSheet } from "@ui-kitten/components";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "shared/interfaces/navigation.interfaces";
import { notFoundScreenStyle } from "styles/jss";

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const styles = useStyleSheet(notFoundScreenStyle);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
