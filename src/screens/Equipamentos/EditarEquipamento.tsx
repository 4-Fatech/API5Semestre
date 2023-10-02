import React, { useEffect, useState } from "react";
import { CadastrarEquipamento } from "../../components/Equipamentos/CadastrarEquipamento";
import { Text } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";

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
        id: ""
    })
    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });

    };

    const [validaVazio, setValidaVazio] = useState(false)
    const [validaTipo, setValidaTipo] = useState(false) //sem nmr
    const [validaLatLong, setValidaLatLong] = useState(false) //sem letra
    const [loading, setLoading] = useState(false)

    function validarVazio(serial: string, latitude: string, longitude: string, observacoes: string, tipo: string, modelo: string) {
        if (!serial || !latitude || !longitude || !tipo || !modelo) {
            setValidaVazio(true)
            return true
        }
        setValidaVazio(false)
        return false
    }
    function validaTipoSemNmr(tipo: string) {
        const textoRegex = /^[a-zA-Z]+$/;
        if (!textoRegex.test(tipo)) {
            setValidaTipo(true)
            return true
        }
        setValidaTipo(false)
        return false
    }

    function validaLatLongSemLetra(latitude: string, longitude: string) {
        const llRegex = /^[-\d.]+$/
        if (!llRegex.test(latitude) || !llRegex.test(longitude)) {
            setValidaLatLong(true);
            return true
        }
        setValidaLatLong(false);
        return false
    }


    function update() {
        if (validarVazio(form.serial, form.latitude, form.longitude, form.observacoes, form.tipo, form.modelo)) {
            return
        }
        if (validaTipoSemNmr(form.tipo)) {
            return
        }
        if (validaLatLongSemLetra(form.latitude, form.longitude)) {
            return
        }

        const url = apiurl + "/equipment/update";
        setLoading(true)
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
                    navigation.navigate("Equipamentos", { equipAlterada: true });

                }
            })
            .finally(() => {
                setLoading(false)
            })

    }
    function getEquipamento() {
        const url = apiurl + '/equipment/get/' + id;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data !== null) {
                    onChangeForm({
                        ...form,
                        ...data,
                        id: id
                    });
                }
            });
    }



    useEffect(() => {
        getEquipamento();
    }, []);



    return (
        <>
            {validaVazio ?
                <Text style={{ color: "red", paddingLeft: 12 }}>Campos com * são obrigatórios.</Text>
                : ""
            }
            {validaTipo ?
                <Text style={{ color: "red", paddingLeft: 12 }}>O tipo de equipamento deve conter apenas letras.</Text>
                : ""
            }
            {validaLatLong ?
                <Text style={{ color: "red", paddingLeft: 12 }}>Latitude e Longitude devem conter apenas números.</Text>
                : ""
            }
            <CadastrarEquipamento
                form={form}
                onChangeText={onChangeText}
                onPress3={loading ? null : update}
                title3={'Alterar'}
                corTexto={'black'}
                color5={'#00FF56'}
                color6={'#5FFD94'}
            />
        </>
    );
};
