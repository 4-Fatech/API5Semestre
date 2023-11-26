import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { Label } from "../Common/Label/Label";
import { Input } from "../Common/Input/Input";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CustomButton } from "../Common/Button";
import { apiurl } from "../../Helpers/ApiUrl";
import { GlobalContext } from "../../Context/GlobalProvider";

export const Login = ({ navigation }: any) => {
    const LogoImagem = 'data:image/png;base64,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'
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState(false)
    const { isLoggedIn, setLogIn, setUser,  setToken }: any = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const context = useContext(GlobalContext);
    const token = context?.token || "";

    const keepUserLoggedIn = async () => {
        const keepLoggedInUrl = apiurl + "/login/keepUserLoggedIn";
        try {
          const response = await fetch(keepLoggedInUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: `Bearer ${token}`
            }
          });
    
          const data = await response.json();
    
          if (!data.error) {
            // Atualize o token e outras informações do usuário, se necessário
            setToken(data.token);
            setUser(data.user);
          }
        } catch (error) {
          console.error('Erro ao manter o usuário logado:', error);
        }
      };

    function logar() {
        const url = apiurl + "/login/login";

        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ email: login, senha: senha })

        }).then((resposta) => resposta.json())
            .then((data) => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError(false)
                    setToken(data.token)
                    setUser(data.user)
                    setLogIn(true)
                    keepUserLoggedIn();
                }
            })
            .finally(() => setLoading(false))

    }
    return (
        <ScrollView style={{ backgroundColor: '#1F303E' }}>
            <View style={styles.background}>
                <Image style={{ width: 200, height: 100 }} source={{ uri: LogoImagem }} />
            </View>
            <View>
                <Label titulo="Email" cor="#C0F458" />
                <Input
                    onChangeText={setLogin}
                    value={login}
                    placeholder="Ex.: fatech@gmail.com"
                />
                <Label titulo="Senha" cor="#C0F458" />
                <Input
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="●●●●●●●●"
                    password={true}
                />
                <View style={styles.recuperacaoContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Recuperar Senha")}
                    >
                        <Text style={styles.recuperacao}>Esqueci a senha</Text>
                    </TouchableOpacity>


                </View>
                {error ?
                    <View style={styles.errorMessageContainer} >
                        <Text style={styles.errorMessage}>Email ou Senha incorretos</Text>
                    </View> : <></>
                }
                <View style={styles.button}>
                    <CustomButton
                        color='#94C021'
                        color2="#C0F458"
                        corTexto="#2D2D2D"
                        title={loading ? <ActivityIndicator color={'white'} /> : "Entrar"}
                        onPress={loading ? null : logar} />
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
        color: '#C0F458',
        textAlign: 'right',
        marginRight: 15,
    },
    button: {
        marginTop: 15
    },
    errorMessageContainer: {
        borderColor: '#C0F458',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: "center",
        padding: 5
    },
    errorMessage: {
        color: "red"
    }
})
