import { Icon, IconProps } from "@ui-kitten/components";
import React, { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonIconProps extends TouchableOpacityProps {
  iconProps: IconProps;
}

const ButtonIcon = forwardRef(
  (
    { onPress, iconProps, ...rest }: ButtonIconProps,
    ref: React.LegacyRef<TouchableOpacity>
  ) => {
    return (
      <TouchableOpacity onPress={onPress} {...rest} ref={ref}>
        <Icon {...iconProps} />
      </TouchableOpacity>
    );
  }
);

export default ButtonIcon;
