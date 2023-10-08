import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CustomButton } from "../Common/Button";
import { apiurl } from "../../Helpers/ApiUrl";
import { Equipamentos } from "../../screens/Equipamentos/Equipamentos";
import { GlobalContext } from "../../Context/GlobalProvider";
import { LogoImagem } from "../../Assets/image/LogoImagem";
export const Login = ({navigation}:any) => {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState(false)
    const {isLoggedIn,setLogIn} = useContext(GlobalContext)
    function logar() {
        const url = apiurl + "/login/login";

       
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({email:login, senha:senha})

        }).then((resposta) => resposta.json())
        .then((data) => {
            if(data.error){
                setError(true)
            }
            else{
                setLogIn(true)
            }
            console.log(data)
        })

    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.background}>
                <Image  style={{width:200, height:100}} source={{uri:LogoImagem}} />
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
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("Recuperar Senha")}
                    >
                        <Text style={styles.recuperacao}>Esqueci a senha</Text>
                    </TouchableOpacity>
                    
                </View>
                {error?
                <View style={styles.errorMessageContainer} >
                    <Text style={styles.errorMessage}>Email ou Senha incorretos</Text>
                </View>:<></>
                }
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
    },
    errorMessageContainer: {
        borderColor:'#94C021',
        borderStyle:'solid',
        display:'flex',
        alignItems:"center",
        padding:5
    },
    errorMessage: {
      color:"red"
    }
})
