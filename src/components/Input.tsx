import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface InputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, onChangeText, value }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor='gray'
        />
    );
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black'
    }
});
