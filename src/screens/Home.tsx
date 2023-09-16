import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../components/Common/Card";

export const Home = ({ navigation }: any) => {

    const handleCardPress = (nSerie: string) => {
        navigation.navigate("Detalhes do Equipamento", { nSerie });
      };      

    return (
        <View style={styles.container}>
            <Card title='Transformador' nSerie='123' image={""} onCardPress={handleCardPress}></Card>
            <Card title='Transformador' nSerie='456' image={""} onCardPress={handleCardPress}></Card>
            <Card title='Transformador' nSerie='789' image={""} onCardPress={handleCardPress}></Card>
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
