import React from "react";
import { Button, Text, View } from "react-native";

export const Home = ({ navigation }:any) => {
    const goToScreen2 = () => {
        navigation.push("Gestão de Equipamentos");
    };

    return (
        <View >
            <Text>Home</Text>
            <Button
                color="#0fa36b"
                title="Navigate to screen 2"
                onPress={goToScreen2}
            ></Button>
        </View>
    );
};