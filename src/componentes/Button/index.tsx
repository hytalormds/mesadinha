import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, style, activeOpacity = 0.7, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.button, style]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
