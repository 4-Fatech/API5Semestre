import React from "react";
import { EquipamentosComponente } from "../components/Equipamentos";
import { apiurl } from "../Helpers/ApiUrl";

export const Equipamentos = ({ navigation }: any) => {
    const [form, onChangeForm] = React.useState({
        serial: '',
        latitude: '',
        longitude: '',
        observacoes: '',
        foto: [],
        status: '',
        tipo: "",
        modelo: ""
    })
    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });

    };

    function cadastrar() {
        const url = apiurl + "/equipment/create";
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
                    navigation.navigate("Home", { equipCadastrada: true });

                    console.log(data)

                }
            })

    }


    return (
        <EquipamentosComponente
            form={form}
            onChangeText={onChangeText}
            onPress={cadastrar}
            title={'Cadastrar'}
            color={'steelblue'}

        />

    );
};
