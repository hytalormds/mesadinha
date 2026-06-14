import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outlineDanger";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};

export function Button({
  title,
  variant = "primary",
  style,
  textStyle,
  disabled,
  activeOpacity = 0.7,
  iconName,
  iconSize = 20,
  iconColor,
  ...rest
}: Props) {
  const buttonVariantStyle = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    outlineDanger: styles.outlineDanger,
  };

  const titleVariantStyle = {
    primary: styles.primaryTitle,
    secondary: styles.secondaryTitle,
    danger: styles.dangerTitle,
    outlineDanger: styles.outlineDangerTitle,
  };

  const resolvedIconColor =
    iconColor ??
    (variant === "outlineDanger"
      ? "#dc3545"
      : variant === "secondary"
        ? "#555555"
        : "#ffffff");

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : activeOpacity}
      disabled={disabled}
      style={[
        styles.button,
        buttonVariantStyle[variant],
        disabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={iconSize}
          color={disabled ? "#999999" : resolvedIconColor}
          style={styles.icon}
        />
      )}

      <Text
        style={[
          styles.title,
          titleVariantStyle[variant],
          disabled && styles.disabledTitle,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}