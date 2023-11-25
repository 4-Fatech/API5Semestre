import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';


const { width, height } = Dimensions.get("window");

interface InputProps {
  placeholder: string;
  onChangeText: (text: string) => void;

}
const Select = ({ onTipoChange, selectedTipo }: any) => {
  const data = [
    { key: 'admin', label: 'Administrador' },
    { key: 'user', label: 'Usuário' },
  ];

  const selectedItem = data.find((item) => item.key === selectedTipo) || data[0];

  const handleTipoChange = (tipo: string) => {
    onTipoChange(tipo);
  };
  
  return (
    <View style={styles.container}>

      <ModalSelector
        data={data}
        initValue={selectedItem.label}
        onChange={(option) => {
          handleTipoChange(option.key); // Chame a função de atualização do tipo
        }}

        initValueTextStyle={styles.modalSelector}
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        optionTextStyle={styles.optionTextStyle}
      />

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    marginTop: 10
  },

  modalSelector: {
    // Estilo do componente ModalSelector
    color: 'white',
  },
  selectStyle: {
    // Estilo do botão seletor
    borderColor: '#A9A9A9',
    width: width - 20,

  },
  selectTextStyle: {
    // Estilo do texto do botão seletor
    color: 'white'
  },
  optionTextStyle: {
    // Estilo do texto dos itens na lista suspensa
    color: 'black',
    fontWeight: '500',
    fontSize: 18
  },
});

export default Select;




