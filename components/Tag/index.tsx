import { Text, TextProps } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface TagProps {
  color?: string;
  textProps?: TextProps;
  children?: React.ReactChild;
}

function Tag({ color, textProps, children }: TagProps) {
  return (
    <View
      style={[
        styles.viewStyle,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.textStyle} {...textProps}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    borderRadius: 16,
    alignSelf: "center",
  },
  textStyle: {
    paddingHorizontal: 16,
  },
});

export default Tag;
