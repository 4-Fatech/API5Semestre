import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";
import { SwitchComponent } from "../Common/Switch";

export const CadastrarEquipamento = ({ onChangeText, form, onPress, onpress2, onPress3, title, title2, title3, color, color2, color3, color4, color5, color6, corTexto }: any) => {


  return (
    <ScrollView>
      <View >
        <Label cor="white" titulo='Tipo do Equipamento' requirido="*" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('tipo', value);
          }}
          value={form.tipo}
          placeholder="Ex.: Transformador"
        />

        {/*  */}
        <Label cor="white" titulo='Modelo do Equipamento' requirido="*" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('modelo', value);
          }}
          value={form.modelo}
          placeholder="Ex.: NBXL-5686G"

        />

        {/*  */}
        <Label cor="white" titulo='N° de Série' requirido="*" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('serial', value);
          }}
          value={form.serial}
          placeholder="Ex.: 74638294875AE"
        />

        {/*  */}
        <Label cor="white" titulo='Latitude' requirido="*" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('latitude', value);
          }}
          value={form.latitude}
          placeholder="Ex.: -123483.988"
        />

        {/*  */}
        <Label cor="white" titulo='Longitude' requirido="*" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('longitude', value);
          }}
          value={form.longitude}
          placeholder="Ex.: 45.22837"
        />
        {/*  */}
        <Label cor="white" titulo='Observações' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('observacoes', value);
          }}
          value={form.observacoes}
          placeholder="Ex.: Equipamento localizado próximo a uma esquina" />

        {/*  */}

        <View style={styles.switch}>
          <SwitchComponent 
          ativo={form.status} 
          onChangeText={(value: any) => { onChangeText('status', value) } }  
         
          />
        </View>

        {/*  */}
        <Label cor="white" titulo='Imagens do equipamento' />
        <ImageInput
          form={form}
          onChange={onChangeText}
        />
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <CustomButton title={title2} corTexto={corTexto} onPress={onpress2} color={color3} color2={color4} />
          <CustomButton title={title} corTexto={corTexto} onPress={onPress} color={color} color2={color2} />
        </View>
        <CustomButton title={title3} corTexto={corTexto} onPress={onPress3} color={color5} color2={color6} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  switch: {
    flex: 1,
    alignContent: 'flex-start',
    alignItems: "flex-start",
    marginVertical: 15 ,
   
    
  }
})