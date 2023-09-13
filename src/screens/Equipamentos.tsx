import React from "react";
import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from "react-native";

export const Equipamentos = () => {
    const [tipoEquipamento, onChangeTipoEquipamento] = React.useState('');
    const [modeloEquipamento, onChangeModeloEquipamento] = React.useState('');
    const [nSerie, onChangeNSerie] = React.useState('');
    const [latitude, onChangeLatitude] = React.useState('');
    const [longitude, onChangeLongitude] = React.useState('');

    return (
        <ScrollView>
            <View >
                <Text>Tipo do Equipamento</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTipoEquipamento}
                    value={tipoEquipamento}
                    placeholder="Ex.: Transformador"
                />
                <Text> Modelo do Equipamento</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeModeloEquipamento}
                    value={modeloEquipamento}
                    placeholder="Ex.: NBXL-5686G"
                />
                <Text>N° de Série</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNSerie}
                    value={nSerie}
                    placeholder="Ex.: 74638294875AE"
                />
                <Text>Latitude</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLatitude}
                    value={latitude}
                    placeholder="Ex.: -123483.988"
                />
                <Text>Longitude</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLongitude}
                    value={longitude}
                    placeholder="Ex.: 45.22837"
                />
                <Text>Observações</Text>
                <TextInput
                    style={styles.input}


                />
                <Text>Imagens do equipamento</Text>
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
    }
});