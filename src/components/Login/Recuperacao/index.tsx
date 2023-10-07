import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import CheckboxComponent from "../../Common/Checkbox";
import { CustomButton } from "../../Common/Button";
import { Input } from "../../Common/Input/Input";


export const RecuperarSenha = () => {
    const [isCheckedEmail, setIsCheckedEmail] = useState(false);
    const [isCheckedSenha, setIsCheckedSenha] = useState(false);
    const [email, setEmail] = useState('');

    function cancelar() {

    }
    function enviarCod() {

    }
    return (
        <View style={{ backgroundColor: 'white', height: '75%', width: '100%' }}>
            <View style={styles.background} >
                <Image source={require('../../../assets/image/imagem.png')} />
            </View>
            <View style={styles.container}>
                <CheckboxComponent value={isCheckedEmail} setValue={setIsCheckedEmail} label="Email" />
                <CheckboxComponent value={isCheckedSenha} setValue={setIsCheckedSenha} label="SMS" />
            </View>
            <View style={styles.botao}>
                {isCheckedEmail || isCheckedSenha ?
                    <>
                        <View style={{ marginTop: -140 }} >
                            <Input onChangeText={setEmail} value={email} placeholder="Insira seu email/telefone" />
                        </View>
                        <View style={{ height: 50 }}>
                            <CustomButton color='#5f781f' color2="#94C021" corTexto="white" title="Enviar" onPress={enviarCod} />
                        </View>
                    </>
                    :
                    <CustomButton color='#5f781f' color2="#94C021" corTexto="white" title="Cancelar" onPress={cancelar} />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        marginTop: -300,
        marginBottom: 350,
        marginHorizontal: 90,
    },
    background: {
        flex: 1,
        height: '25%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: -350
    },
    botao: {
        height: 50,
        marginTop: -210,
    }
});
