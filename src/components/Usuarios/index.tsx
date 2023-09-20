import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";

export const UsuariosComponente = ({ onChangeText, form, onPress,onpress2, title, title2, color, color2 }: any) => {


  return (
    <ScrollView>
      <View >
        <Label titulo='Nome' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('nome', value);
          }}
          value={form.nome}
          placeholder="Ex.: José"
        />

        {/*  */}
        <Label titulo='Sobrenome' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('sobrenome', value);
          }}
          value={form.sobrenome}
          placeholder="Ex.: Silva"
        />

        {/*  */}
        <Label titulo='E-mail' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('email', value);
          }}
          value={form.email}
          placeholder="Ex.: xxxxx@gmail.com"
        />

        {/*  */}
        <Label titulo='Telefone Celular' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone1', value);
          }}
          value={form.telefone1}
          placeholder="Ex.: 12 99999-9999"
        />
        {/*  */}
        <Label titulo='Telefone de recado' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone2', value);
          }}
          value={form.telefone2}
          placeholder="Ex.: 12 9999-9999" />

        {/*  */}
        <Label titulo='Matrícula' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('matricula', value);
          }}
          value={form.matricula}
          placeholder="Ex.: 1613459" />

        {/*  */}
        <Label titulo='CPF' requirido='*' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('cpf', value);
          }}
          value={form.cpf}
          placeholder="Ex.: xxx.xxx.xxx-xx" />

        {/*  */}
        <Label titulo='Senha' requirido='*' />
        <Input
           secureTextEntry="true"
          onChangeText={(value: any) => {
            onChangeText('senha', value);
          }}
          value={form.senha}
          placeholder="Ex.: xxxxxxxx" />

        {/*  */}
        <Label titulo='Foto Usuário' />
        <ImageInput
          form={form}
          onChange={onChangeText} />
        <View style={{ width: 415, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <CustomButton title={title2} onPress={onpress2} color={color2} />
          <View style={{ width: 15 }} />
          <CustomButton title={title} onPress={onPress} color={color} />
        </View>
      </View>
    </ScrollView>
  );
};


