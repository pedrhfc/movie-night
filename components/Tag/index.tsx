import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

function Tag({ color, textProps, children }: any) {
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 16,
        alignSelf: "center",
      }}
    >
      <Text style={{ paddingHorizontal: 16 }} {...textProps}>
        {children}
      </Text>
    </View>
  );
}

export default Tag;
