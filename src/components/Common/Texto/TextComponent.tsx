import React from "react";
import { Text, View } from "react-native";



type Props = {
    styleTexto: object;
    styleDiv: object;
    nome: string;
};

export const TextComponent = ({nome, styleTexto, styleDiv }: Props) => {
    return (
        <View style={styleDiv}>
            <Text style={styleTexto}>{nome}</Text>
        </View>
    );
}


