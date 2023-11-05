import React from "react";
import { Text, View } from "react-native";
import { TextComponent } from "./TextComponent";
import { Label } from "../Label/Label";



type Props = {
    estiloTexto: object;
    styleDiv2: object;
    nome: string;
    titulo: string;
};

export const TextTelefone = ({ nome, estiloTexto, styleDiv2, titulo }: Props) => {
    return (
        <View style={styleDiv2}>
            <Text>
                <Label titulo={titulo} />
            </Text>
            <Text style={estiloTexto}> {nome} </Text>
        </View>
    //       <View style={styles.container2}>
    //       <Text>
    //           <Label titulo="Telefone Fixo/recado:" />
    //       </Text>
    //   </View>
    );
}


