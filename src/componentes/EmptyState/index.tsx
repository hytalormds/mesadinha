import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";

type Props = {
    icon?: keyof typeof MaterialIcons.glyphMap;
    title: string;
    description?: string;
};

export function EmptyState({
    icon = "info-outline",
    title,
    description,
}: Props) {
    return (
        <View style={styles.container}>
            <MaterialIcons
                name={icon}
                size={42}
                color="#999999"
            />

            <Text style={styles.title}>
                {title}
            </Text>

            {!!description && (
                <Text style={styles.description}>
                    {description}
                </Text>
            )}
        </View>
    );
}