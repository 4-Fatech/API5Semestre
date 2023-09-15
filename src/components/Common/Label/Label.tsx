import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelProps {
    titulo: string;
}

export const Label: React.FC<LabelProps> = ({ titulo }) => {
    return (
        <Text style={styles.label}>{titulo}</Text>
    );
}

const styles = StyleSheet.create({
    label: {
        height: 20,
        color: 'black',
        marginLeft: 12,
        marginTop: 5,
        marginBottom: -10
    },
});
