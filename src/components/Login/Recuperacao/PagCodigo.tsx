import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { CustomButton } from "../../Common/Button";
import { Input } from "../../Common/Input/Input";

export const PagCodigo = () => {
    const [codigo, setCodigo] = useState('');

    function enviar() {
        // Your enviar function code
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 120 }}>
                <Image source={require('../../../assets/image/imagem.png')} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Insira o código</Text>
                <View>
                    <Input onChangeText={setCodigo} value={codigo} placeholder="" />
                    <View style={{ height: 45 }}>
                        <CustomButton color='#5f781f' color2="#94C021" corTexto="white" title="Confirmar" onPress={enviar} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '#94C021',
        fontSize: 20,
        marginRight: 15,
        marginTop: -160
    }
});
