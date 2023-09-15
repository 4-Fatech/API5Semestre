import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/Common/Button";
import Card from "../components/Common/Card";

export const Home = ({ navigation }: any) => {
    const goToScreen2 = () => {
        navigation.push("Gestão de Equipamentos");
    };

    return (
        <View style={styles.container}>
            {/* <CustomButton
                color="#0fa36b"
                title="Navigate to screen 2"
                onPress={goToScreen2}/> */}
            <Card title='Transformador' nSerie='123458879' image={""} ></Card>
            <Card title='Transformador' nSerie='123458879' image={""} ></Card>
            <Card title='Transformador' nSerie='123458879' image={""} ></Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginLeft: 5
    }
})
