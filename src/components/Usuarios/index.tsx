import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";

export const UsuariosComponente = ({ onChangeText, form, onPress, onpress2, title, title2, color, color2, color3, color4, corTexto }: any) => {


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
          placeholder="Ex.: 12999999999"
        />
        {/*  */}
        <Label titulo='Telefone de recado' requirido="" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone2', value);
          }}
          value={form.telefone2}
          placeholder="Ex.: 1299999999" />

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
          onChangeText={(value: any) => {
            onChangeText('senha', value);
          }}
          password={true}
          value={form.senha}
          placeholder="Ex.: xxxxxxxx" />

        {/*  */}
        <Label titulo='Foto Usuário' requirido="" />
        <ImageInput
          form={form}
          onChange={onChangeText} />
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <CustomButton title={title2} corTexto={corTexto} onPress={onpress2} color={color3} color2={color4} />
          <CustomButton title={title} corTexto={corTexto} onPress={onPress} color={color} color2={color2} />
        </View>
      </View>
    </ScrollView>
  );
};


