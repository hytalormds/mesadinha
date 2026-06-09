import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = TouchableOpacityProps & {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
};

export function ButtonIcon({
  name,
  size = 32,
  color = "#0A66C2",
  ...rest
}: Props) {
  return (
    <TouchableOpacity {...rest}>
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
