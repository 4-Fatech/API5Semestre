import React, { useContext, useEffect, useState } from "react";
import { CadastrarEquipamento } from "../../components/Equipamentos/CadastrarEquipamento";
import { Text, Alert, ActivityIndicator } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import Local from '@react-native-community/geolocation'
import { GlobalContext } from "../../Context/GlobalProvider";


export const Equipamentos = ({ navigation }: any) => {
    const context = useContext(GlobalContext);
    const token = context?.token || "";
    
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
    const [loading, setLoading] = useState(false)


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
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)

        })
            .then((resposta) => resposta.json())
            .then((data: any) => {
                if (data.error) {
                    Alert.alert(
                        'Cadastrar equipamento',
                        'Erro ao cadastrar equipamento.',
                        [

                            {
                                text: 'OK', onPress: () => console.log(data.error)
                            },
                        ],
                        { cancelable: false }
                    );

                } else {
                    Alert.alert(
                        'Cadastrar equipamento',
                        'Equipamento cadastrado com sucesso.',
                        [

                            {
                                text: 'OK', onPress: () => ''
                            },
                        ],
                        { cancelable: false }
                    );
                    navigation.navigate("Equipamentos", { equipCadastrada: true });
                }
                
            })
            .finally(() => {
                setLoading(true)
            })

    }

    function cancelar() {
        navigation.navigate("Equipamentos");
    }

    const showAlertCadastrar = () => {
        Alert.alert(
            'Cadastrar equipamento',
            'Deseja cadastrar este equipamento?',
            [
                {
                    text: 'NÃO',
                    onPress: () => '',
                    style: 'cancel',
                },
                { text: 'SIM', onPress: () => cadastrar() },
            ],
            { cancelable: false }
        );
    };


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
                onPress={loading ? null : showAlertCadastrar}
                onpress2={cancelar}
                title2={'Cancelar'}
                title={loading ? <ActivityIndicator color={'white'} /> : 'Cadastrar'}
                corTexto={'black'}
                color={'#9ACD32'}
                color2={'#94C021'}
                color4={'#ff2d15'}
                color3={'#ff4627'}

            />
        </>
    );
};
