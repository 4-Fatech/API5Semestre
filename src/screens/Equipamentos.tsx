import React from "react";
import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import { Label } from "../components/Label";

export const Equipamentos = () => {
    const [tipoEquipamento, onChangeTipoEquipamento] = React.useState('');
    const [modeloEquipamento, onChangeModeloEquipamento] = React.useState('');
    const [nSerie, onChangeNSerie] = React.useState('');
    const [latitude, onChangeLatitude] = React.useState('');
    const [longitude, onChangeLongitude] = React.useState('');

    return (
        <ScrollView>
            <View >
                <Label titulo='Tipo do Equipamento' />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTipoEquipamento}
                    value={tipoEquipamento}
                    placeholder="Ex.: Transformador"
                    placeholderTextColor= 'gray'
                />
                <Label titulo='Modelo do Equipamento'/>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeModeloEquipamento}
                    value={modeloEquipamento}
                    placeholder="Ex.: NBXL-5686G"
                />
                <Label titulo='N° de Série' />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNSerie}
                    value={nSerie}
                    placeholder="Ex.: 74638294875AE"
                />
                <Label titulo='Latitude' />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLatitude}
                    value={latitude}
                    placeholder="Ex.: -123483.988"
                />
                 <Label titulo='Longitude' />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLongitude}
                    value={longitude}
                    placeholder="Ex.: 45.22837"
                />
                 <Label titulo='Observações' />
                <TextInput
                    style={styles.input}


                />
                 <Label titulo='Imagens do equipamento' />
                {/* <Image source={require('../imgs/btn-enviar.png')} /> */}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    label: {
        height: 20,
        color: 'black',
        marginLeft: 12,
        marginTop: 5,
        marginBottom: -10
    },
    
});