import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DetalhesEquipamento = ({ route }: any) => {
  const { nSerie } = route.params;
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do Equipamento</Text>
      <Text style={styles.text}>Número de Série: {nSerie}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: 'black'
  }
});
