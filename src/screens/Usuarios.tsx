
import React, { useState } from "react";
import { UsuariosComponente } from "../components/Usuarios";
import { Text } from 'react-native';
import { apiurl } from "../Helpers/ApiUrl";


export const Usuarios = () => {
    const [form, onChangeForm] = React.useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone1: "",
        telefone2: "",
        matricula: "",
        cpf: "",
        foto: [],
        senha: "",

    })

    const [valida, setValida] = useState(false)

    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });


    };


    function cadastrarUsuario() {
     
        if (!form.nome) {
            setValida(true)
            return
        }else {
            setValida(false)
            
        }
        const url = apiurl+"/user/create";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(form)

        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data.error) {
                    console.log("Erro");

                } else {
                    console.log("Usuário cadastrado");

                }
            })
    }


    return (
        <>
            {valida ?
                <Text style={{ color: "red" }}>Campos com * são obrigatórios.</Text>
                : ""
            }
            <UsuariosComponente
                form={form}
                onChangeText={onChangeText}
                onPress={cadastrarUsuario}
                title={'Cadastrar'}
                color={'steelblue'}

            />
        </>


    );
};


