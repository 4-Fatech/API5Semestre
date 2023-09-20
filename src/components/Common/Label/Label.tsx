import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelProps {
    titulo: string;
}

export const Label: React.FC<LabelProps> = ({ titulo, requirido }) => {
    return (
        <Text style={styles.label}>{titulo} <Text style={{ color: "red"}} >{requirido}</Text></Text> 
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
