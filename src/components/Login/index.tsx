import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../Common/Button";

export const Login = () => {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    function logar() {

    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.background}>
                <Image source={require('../../assets/image/imagem.png')} />
            </View>
            <View>
                <Label titulo="Email" cor="#94C021" />
                <Input
                    onChangeText={setLogin}
                    value={login}
                    placeholder="Ex.: fatech@gmail.com"
                />
                <Label titulo="Senha" cor="#94C021" />
                <Input
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="●●●●●●●●"
                    password={true}
                />
                <View style={styles.recuperacaoContainer}>
                    <Text style={styles.recuperacao}>Esqueci a senha</Text>
                </View>
                <View style={styles.button}>
                <CustomButton color='#5f781f' color2="#94C021" corTexto="white" title="Entrar" onPress={logar} />
            </View>
        </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 150,
        marginBottom: 30

    },
    recuperacaoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 2
    },
    recuperacao: {
        color: '#94C021',
        textAlign: 'right',
        marginRight: 15,
    },
    button: {
        marginTop: 15
    }
})
