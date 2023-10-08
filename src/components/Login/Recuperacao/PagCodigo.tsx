import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { CustomButton } from "../../Common/Button";
import { Input } from "../../Common/Input/Input";
import { apiurl } from "../../../Helpers/ApiUrl";
import { LogoImagem } from "../../../Assets/image/LogoImagem";

export const PagCodigo = ({route, navigation}:any) => {
    const [codigo, setCodigo] = useState('');
    const {isEmail, value} = route.params;

    function enviar() {
        console.log('isEmail', isEmail)
        console.log(value)
        var vForm = isEmail?{code: codigo, email: value}:{code: codigo, telefone1: value}
        console.log(vForm)
   
        fetch(apiurl+"/user/valNot", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(vForm)
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if(data.error){
                    console.log(data)
                    
                }else{
                    console.log(data)
                    navigation.navigate("Atualizar Senha",{isEmail:isEmail, value:value})
                }
              
            })
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 120 }}>
                <Image  style={{width:200, height:100}} source={{uri:LogoImagem}} />
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
