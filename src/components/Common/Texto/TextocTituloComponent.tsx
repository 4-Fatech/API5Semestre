import React from "react";
import { Text, View } from "react-native";
import { TextComponent } from "./TextComponent";
import { Label } from "../Label/Label";



type Props = {
    estiloTexto: object;
    styleDiv: object;
    styleDiv2: object;
    nome: string;
    titulo: string;
};

export const TextocTiutloComponent = ({ nome, estiloTexto, styleDiv,styleDiv2, titulo }: Props) => {
    return (
        <View style={styleDiv2}>
            <Text style={{ marginBottom: 10 }}>
                <Label cor="white" titulo={titulo} />
            </Text>
            <TextComponent styleTexto={estiloTexto} nome={nome} styleDiv={styleDiv} />
        </View>
    );
}


