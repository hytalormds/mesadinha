import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./styles";

type Props = TextProps & {
  children: React.ReactNode;
};

export function Title({ children, style, ...rest }: Props) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}
