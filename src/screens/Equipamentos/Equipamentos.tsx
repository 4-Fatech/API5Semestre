import React, { useEffect, useState } from "react";
import { CadastrarEquipamento } from "../../components/Equipamentos/CadastrarEquipamento";
import { Text } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import Local from '@react-native-community/geolocation'

export const Equipamentos = ({ navigation }: any) => {
    const [form, onChangeForm] = React.useState({
        serial: '',
        latitude: '',
        longitude: '',
        observacoes: '',
        foto: [],
        status: 1,
        tipo: '',
        modelo: ''
    })

    const [validaVazio, setValidaVazio] = useState(false)
    const [validaTipo, setValidaTipo] = useState(false) //sem nmr
    const [validaLatLong, setValidaLatLong] = useState(false) //sem letra
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')


    const onChangeText = (name: any, value: any) => {
        onChangeForm({ ...form, [name]: value });

    };

    function getLocalizacaoAtual() {

        Local.getCurrentPosition(

            (posicao) => {
                setLatitude(posicao.coords.latitude.toString())
                setLongitude(posicao.coords.longitude.toString())
            },
            (erro) => {
                console.log(erro.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 1000
            }

        )
        onChangeForm({
            ...form,
            latitude: latitude,
            longitude: longitude
        });
        console.log(latitude, longitude);

    }


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
            return true;
        }
        setValidaLatLong(false);
        return false;
    }


    function cadastrar() {
        if (validarVazio(form.serial, form.latitude, form.longitude, form.observacoes, form.tipo, form.modelo)) {
            return
        }
        if (validaTipoSemNmr(form.tipo)) {
            return
        }
        if (validaLatLongSemLetra(form.latitude, form.longitude)) {
            return
        }

        const url = apiurl + "/equipment/create";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(form)

        })
            .then((resposta) => resposta.json())
            .then((data: any) => {
                if (data.error) {
                    console.log("Erro");

                } else {
                    console.log("Equipamento cadastrado");
                    navigation.navigate("Equipamentos", { equipCadastrada: true });
                }
            })

    }

    function cancelar() {
        navigation.navigate("Equipamentos");

    }



    useEffect(() => {
        getLocalizacaoAtual()
    }, [longitude, latitude])




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
                <Text style={{ color: "red", paddingLeft: 12 }}>Latitude e Longitude devem conter apenas números e no mínimo cinco números.</Text>
                : ""
            }
            <CadastrarEquipamento
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
        </>
    );
};
