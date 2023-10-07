import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelProps {
    titulo: string;
    requirido?: string;
    cor?: string;
}

export const Label: React.FC<LabelProps> = ({ titulo, requirido, cor = "black" }) => {
    return (
        <Text style={[styles.label, { color: cor }]}>{titulo} <Text style={{ color: "red" }} >{requirido}</Text></Text>
    );
}

const styles = StyleSheet.create({
    label: {
        height: 20,
        marginLeft: 12,
        marginTop: 5,
        marginBottom: -10,
        fontSize: 15,
        fontWeight: 'bold',
    }
});
