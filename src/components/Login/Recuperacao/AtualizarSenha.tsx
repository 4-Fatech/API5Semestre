import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CustomButton } from "../../Common/Button";
import { Input } from "../../Common/Input/Input";

export const AtualizarSenha = () => {
    const [senha, setSenha] = useState('');
    const [senhaconfirma, setSenhaConfirma] = useState('');

    function atualizar() {
        // Your atualizar function code
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Atualize sua senha</Text>
                <View style={styles.inputContainer}>
                    <Input onChangeText={setSenha} value={senha} placeholder="Insira sua senha" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirme sua senha</Text>
                    <Input onChangeText={setSenhaConfirma} value={senhaconfirma} placeholder="Confirme sua senha" />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        color='#5f781f'
                        color2="#94C021"
                        corTexto="white"
                        title="Atualizar"
                        onPress={atualizar}
                    />
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
        backgroundColor: 'white'
    },
    content: {
        alignItems: 'center',
    },
    text: {
        color: '#94C021',
        fontSize: 20,
        marginRight: 15,
        marginTop: -160
    },
    inputContainer: {
        alignSelf: 'stretch',
        marginBottom: 20,
    },
    label: {
        color: '#94C021',
        fontSize: 20,
        marginLeft: 15,
    },
    buttonContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 20,
        height: 50
    },
});
