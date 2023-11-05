import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import ImageInput from "../Common/ImageInput/ImageInput";
import { CustomButton } from "../Common/Button";
import Select from "../Common/Select/SelectOpcao";




export const UsuariosComponente = ({ onChangeText, form, onPress, onpress2, title, title2, color, color2, color3, color4, corTexto, corTexto2 = '', perfil = 0 }: any) => {


  const verifiraPrfil = () => {
    if(perfil === 1 ) return true
    if(perfil === 2 || perfil === 3) return true
  }
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
          placeholder="Ex.: +551298648785142"
        />
        {/*  */}
        <Label titulo='Telefone de recado' requirido="" />
        <Input
          onChangeText={(value: any) => {
            onChangeText('telefone2', value);
          }}
          value={form.telefone2}
          placeholder="Ex.: 1287654321" />

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
        {perfil === 2 || perfil === 0 ?
          <>
            <Label titulo="Tipo do usuário" requirido="*" />

            <Select
              selectedTipo={form.profile}
              onTipoChange={(value: any) => {
                onChangeText('profile', value)
              }}

            />
          </>  : null
      }



        {/*  */}
        {
        perfil === 1 || perfil === 0 ? <>
          <Label titulo='Senha' requirido='*' />
          <Input
            onChangeText={(value: any) => {
              onChangeText('senha', value);
            }}
            password={true}
            value={form.senha}
            placeholder="Ex.: xxxxxxxx" />
        </> : <></>}

        {/*  */}
        <Label titulo='Foto Usuário' requirido="" />
        <ImageInput
          form={form}
          onChange={onChangeText} />
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <CustomButton title={title2} corTexto={corTexto2} onPress={onpress2} color={color3} color2={color4} />
          <CustomButton title={title} corTexto={corTexto} onPress={onPress} color={color} color2={color2} />
        </View>
      </View>
    </ScrollView>
  );
};


