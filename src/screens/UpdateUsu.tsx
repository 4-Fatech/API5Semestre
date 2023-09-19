
import React, { useState, useEffect } from 'react';
import { UsuariosComponente } from "../components/Usuarios";
import { apiurl } from '../Helpers/ApiUrl';


export const UpdateUsu = ({ route }: any) => {

    const {id} = route.params
    const [form, onChangeForm] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone1: "",
        telefone2: "",
        matricula: "",
        cpf: "",
        foto: "",
        senha: "",

    })

    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });
    }


    function getUsuario() {
        
        const url = apiurl+'/user/list/'+id;
        console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data !== null) {
                    console.log(data)
                    // Atualize os campos do formulário com os dados obtidos
                    onChangeForm({
                        ...form,
                        nome: data.nome || "",
                        sobrenome: data.sobrenome || "",
                        email: data.email || "",
                        telefone1: data.telefone1 || "",
                        telefone2: data.telefone2 || "",
                        matricula: data.matricula || "",
                        cpf: data.cpf || "",
                        foto: data.foto || [],
                        senha: data.senha || ""
                    });
                }
                console.log(data)
            });


    }


    useEffect(() => {
        getUsuario();
    }, []);



    function updateUsuario() {

        const url = apiurl+"/user/update/"+{id};
        fetch(url, {
            method: 'PATCH',
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
                    console.log("Usuário alterado");

                }
            })
    }


    return (
        <UsuariosComponente
            form={form}
            onChangeText={onChangeText}
            onPress={updateUsuario}
            title={'Alterar'}
            color={'steelblue'}

        />

    );
};

