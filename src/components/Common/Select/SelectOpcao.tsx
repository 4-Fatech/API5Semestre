import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function SelectOpcao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const options = ['Opção 1', 'Opção 2', 'Opção 3'];

  const handleOptionPress = (option: string) => {
    setSelectedValue(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selectButton}
      >
        <Text style={styles.textoSelect}>{selectedValue || 'Selecione uma opção'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={styles.option}
            >
              <Text style={styles.textoSelect} >{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.textoSelect}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSelect: {
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'black',
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
    padding: 20,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedValue: {
    fontSize: 18,
    marginTop: 20,
  },
});
