import React from "react";
import { View, ScrollView } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";

export const UsuariosComponente = ({ onChangeText, form, onPress, title, color }: any) => {


  return (
    <ScrollView>
      <View >
        <Label titulo='Nome' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('nome', value);
          }}
          value={form.nome}
          placeholder="Ex.: José"
        />

        {/*  */}
        <Label titulo='Sobrenome' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('sobrenome', value);
          }}
          value={form.sobrenome}
          placeholder="Ex.: Silva"
        />

        {/*  */}
        <Label titulo='E-mail' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('email', value);
          }}
          value={form.email}
          placeholder="Ex.: xxxxx@gmail.com"
        />

        {/*  */}
        <Label titulo='Telefone 1' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone1', value);
          }}
          value={form.telefone1}
          placeholder="Ex.: 12999999999"
        />
        {/*  */}
        <Label titulo='Telefone 2' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone2', value);
          }}
          value={form.telefone2}
          placeholder="Ex.: 12999999999" />

        {/*  */}
        <Label titulo='Matricula' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('matricula', value);
          }}
          value={form.matricula}
          placeholder="Ex.: 1613459" />

        {/*  */}
        <Label titulo='Cpf' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('cpf', value);
          }}
          value={form.cpf}
          placeholder="Ex.: xxx.xxx.xxx-xx" />

        {/*  */}
        <Label titulo='Senha' />
        <Input
          onChangeText={(value: any) => {
            onChangeText('senha', value);
          }}
          value={form.senha}
          placeholder="Ex.: xxxxxxxx" />

        {/*  */}
        <Label titulo='Foto Usuário' />
        <ImageInput />
        <CustomButton  title={title} onPress={onPress} color={color} />
      </View>
    </ScrollView>
  );
};
