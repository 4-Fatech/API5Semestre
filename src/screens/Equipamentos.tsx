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
        tipo: '',
        modelo: ''
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

    function cancelar(){
        navigation.navigate("Home");
    
    }
    
    return (
        <EquipamentosComponente
            form={form}
            onChangeText={onChangeText}
            onPress={cadastrar}
            onpress2={cancelar}
            title2={'Cancelar'}
            title={'Cadastrar'}
            corTexto={'black'}
            color={'#00FF56'}
            color2={'#5FFD94'}
            color4={'#E4E3E3'}
            color3={'#D9D9D9'}

        />

    );
};
