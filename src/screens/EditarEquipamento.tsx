import React, { useEffect } from "react";
import { EquipamentosComponente } from "../components/Equipamentos";
import { apiurl } from "../Helpers/ApiUrl";

export const EditarEquipamentos = ({ route, navigation }: any) => {
    const { id } = route.params
    const [form, onChangeForm] = React.useState({
        serial: '',
        latitude: '',
        longitude: '',
        observacoes: '',
        foto: [],
        status: '',
        tipo: "",
        modelo: "",
        id:""
    })
    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });

    };

    function update() {
        console.log(form)
        const url = apiurl + "/equipment/update";
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
                    console.log("Erro", data.error);

                } else {
                    console.log("Equipamento atualizado");
                    navigation.navigate("Home", { equipAlterada: true });

                }
            })

    }
    function getEquipamento() {

        const url = apiurl + '/equipment/get/' + id;
        console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                console.log(data)
                if (data !== null) {
                    // Atualize os campos do formulário com os dados obtidos
                    onChangeForm({
                        ...form,
                        serial: data.serial || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        observacoes: data.observacoes || '',
                        foto: data.foto || [],
                        status: data.status || '',
                        tipo: data.tipo || "",
                        modelo: data.modelo || "",
                        id:id
                    });

                }
                console.log(data)
            });


    }


    useEffect(() => {
        getEquipamento();
    }, []);



    return (
        <EquipamentosComponente
            form={form}
            onChangeText={onChangeText}
            onPress={update}
            title={'Atualizar'}
            color={'steelblue'}

        />

    );
};
