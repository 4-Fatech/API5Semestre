import React from "react";
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    title: string,
    onPress: any,
    color: string,
    color2: string,
    corTexto: string
}

export const CustomButton: React.FC<ButtonProps> = ({ title, onPress, color, color2, corTexto }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? color : color2,
                },
                styles.container,
            ]}>

            <Text style={{color:corTexto}}>{title}</Text>
        </Pressable >
    );
}

interface Styles {
    container: ViewStyle;
    text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        minWidth: '45%',
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 8,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});


