import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";

export const EquipamentosComponente = ({ onChangeText, form, onPress,onpress2, title, title2, color, color2, color3,color4,corTexto }: any) => {
  useEffect(() => {

    onChangeText('latitude', '');
    onChangeText('longitude', '');
    onChangeText('observacoes', '');
    onChangeText('foto', []);
    onChangeText('status', '');
    onChangeText('tipo', '');
    onChangeText('modelo', '');

  }, []);

  return (
    <ScrollView>
      <View >
        <Label titulo='Tipo do Equipamento' requirido="" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('tipo', value);
          }}
          value={form.tipo}
          placeholder="Ex.: Transformador"
        />

        {/*  */}
        <Label titulo='Modelo do Equipamento' requirido=""/>
        <Input
          onChangeText={(value: any) => {
            onChangeText('modelo', value);
          }}
          value={form.modelo}
          placeholder="Ex.: NBXL-5686G"
        />

        {/*  */}
        <Label titulo='N° de Série' requirido="" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('serial', value);
          }}
          value={form.serial}
          placeholder="Ex.: 74638294875AE"
        />

        {/*  */}
        <Label titulo='Latitude' requirido=""/>
        <Input
          onChangeText={(value: any) => {
            onChangeText('latitude', value);
          }}
          value={form.latitude}
          placeholder="Ex.: -123483.988"
        />

        {/*  */}
        <Label titulo='Longitude' requirido=""/>
        <Input
          onChangeText={(value: any) => {
            onChangeText('longitude', value);
          }}
          value={form.longitude}
          placeholder="Ex.: 45.22837"
        />
        {/*  */}
        <Label titulo='Observações' requirido="" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('observacoes', value);
          }}
          value={form.observacoes}
          placeholder="Ex.: Equipamento localizado próximo a uma esquina" />

        {/*  */}
        <Label titulo='Imagens do equipamento' requirido="" />
        <ImageInput
          form={form}
          onChange={onChangeText}
        />
        <CustomButton title={title2} corTexto={corTexto} onPress={onpress2} color={color3} color2={color4} />
        <CustomButton title={title} corTexto={corTexto} onPress={onPress} color={color} color2={color2} />      </View>
    </ScrollView>
  );
};
