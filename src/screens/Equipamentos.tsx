import React from "react";
import { View, ScrollView } from "react-native";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import  ImageInput from "../components/ImageInput/ImageInput";

export const Equipamentos = () => {
    const [tipoEquipamento, onChangeTipoEquipamento] = React.useState('');
    const [modeloEquipamento, onChangeModeloEquipamento] = React.useState('');
    const [nSerie, onChangeNSerie] = React.useState('');
    const [latitude, onChangeLatitude] = React.useState('');
    const [longitude, onChangeLongitude] = React.useState('');
    const [obs, onChangeObs] = React.useState('');

    return (
        <ScrollView>
            <View >
                <Label titulo='Tipo do Equipamento' />
                <Input
                    onChangeText={onChangeTipoEquipamento}
                    value={tipoEquipamento}
                    placeholder="Ex.: Transformador"
                />
                <Label titulo='Modelo do Equipamento' />
                <Input
                    onChangeText={onChangeModeloEquipamento}
                    value={modeloEquipamento}
                    placeholder="Ex.: NBXL-5686G"
                />
                <Label titulo='N° de Série' />
                <Input
                    onChangeText={onChangeNSerie}
                    value={nSerie}
                    placeholder="Ex.: 74638294875AE"
                />
                <Label titulo='Latitude' />
                <Input
                    onChangeText={onChangeLatitude}
                    value={latitude}
                    placeholder="Ex.: -123483.988"
                />
                <Label titulo='Longitude' />
                <Input
                    onChangeText={onChangeLongitude}
                    value={longitude}
                    placeholder="Ex.: 45.22837"
                />
                <Label titulo='Observações' />
                <Input
                    onChangeText={onChangeObs}
                    value={obs}
                    placeholder="Ex.: Equipamento localizado próximo a uma esquina" />

                <Label titulo='Imagens do equipamento' />
                <ImageInput />
            </View>
        </ScrollView>
    );
};
