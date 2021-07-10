import {
  Avatar,
  AvatarProps,
  ListItem,
  ListItemProps
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

type ExtendsSimpleList = ListItemProps & AvatarProps;

interface SimpleListProps extends ExtendsSimpleList {
  reverse?: boolean;
  avatarProps?: AvatarProps;
}

function SimpleList({
  title,
  description,
  source,
  reverse,
  avatarProps,
  ...rest
}: SimpleListProps) {
  return (
    <ListItem
      style={styles.list}
      title={title}
      description={description}
      accessoryLeft={() => {
        return !reverse ? (
          <Avatar {...avatarProps} source={source} size="giant" />
        ) : (
          <></>
        );
      }}
      accessoryRight={() => {
        return reverse ? (
          <Avatar {...avatarProps} source={source} size="giant" />
        ) : (
          <></>
        );
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "transparent",
    marginHorizontal: 30,
  },
});

export default SimpleList;
