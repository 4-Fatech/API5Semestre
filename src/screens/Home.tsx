import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-reanimated/lib/typescript/Animated";

export const Home = () => {
    return (

        <Card children={<Text>brbrbr</Text>} />

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#565656',
    },
});
