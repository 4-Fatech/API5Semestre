import React from "react";
import { View, ScrollView } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";

export const EquipamentosComponente = ({ onChangeText, form, onPress, title, color }: any) => {


  return (
    <ScrollView>
      <View >
        <Label titulo='Tipo do Equipamento' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('tipoEquipamento', value);
          }}
          value={form.tipoEquipamento}
          placeholder="Ex.: Transformador"
        />

        {/*  */}
        <Label titulo='Modelo do Equipamento' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('modeloEquipamento', value);
          }}
          value={form.modeloEquipamento}
          placeholder="Ex.: NBXL-5686G"
        />

        {/*  */}
        <Label titulo='N° de Série' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('nSerie', value);
          }}
          value={form.nSerie}
          placeholder="Ex.: 74638294875AE"
        />

        {/*  */}
        <Label titulo='Latitude' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('latitude', value);
          }}
          value={form.latitude}
          placeholder="Ex.: -123483.988"
        />

        {/*  */}
        <Label titulo='Longitude' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('longitude', value);
          }}
          value={form.longitude}
          placeholder="Ex.: 45.22837"
        />
        {/*  */}
        <Label titulo='Observações' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('obs', value);
          }}
          value={form.obs}
          placeholder="Ex.: Equipamento localizado próximo a uma esquina" />

        {/*  */}
        <Label titulo='Imagens do equipamento' />
        <ImageInput />
        <CustomButton  title={title} onPress={onPress} color={color} />
      </View>
    </ScrollView>
  );
};
