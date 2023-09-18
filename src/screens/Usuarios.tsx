
import React from "react";
import { UsuariosComponente } from "../components/Usuarios";


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
    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });
      
    };

    function cadastrarUsuario() {
        const url = "http://10.0.2.2:3001/user/create";     
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
        <UsuariosComponente
            form={form}
            onChangeText={onChangeText}
            onPress={cadastrarUsuario}
            title={'Cadastrar'}
            color={'steelblue'}

        />

    );
};

