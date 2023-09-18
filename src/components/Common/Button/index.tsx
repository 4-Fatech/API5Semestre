import React from "react";
import { Button, StyleSheet } from "react-native";

interface ButtonProps {
    title: string,
    onPress: any,
    color: string
}

export const CustomButton: React.FC<ButtonProps> = ({ title, onPress, color }) => {
    return (
        <Button

            color={color}
            title={title}
            onPress={onPress}

        ></Button>
    );
}




