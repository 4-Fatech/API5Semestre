import React, { useEffect, useState } from "react";
import { CadastrarEquipamento } from "../../components/Equipamentos/CadastrarEquipamento";
import { Text, Alert, ActivityIndicator } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import LoadingComponent from "../../components/Common/Loading/Loading";

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
    const [loadingButton, setLoadingButton] = useState(false)


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


        setLoadingButton(true)

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
                    Alert.alert(
                        'Alterar equipamento',
                        'Erro ao alterar equipamento.',
                        [

                            {
                                text: 'OK', onPress: () => console.log(data.error)
                            },
                        ],
                        { cancelable: false }
                    );

                } else {
                    Alert.alert(
                        'Alterar equipamento',
                        'Equipamento alterado com sucesso.',
                        [

                            {
                                text: 'OK', onPress: () => ''
                            },
                        ],
                        { cancelable: false }
                    );
                    navigation.navigate("Equipamentos", { equipAlterada: true });

                }
            })
            .finally(() => {
                setLoadingButton(false)
            })

    }
    function getEquipamento() {
        const url = apiurl + '/equipment/get/' + id;


        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                console.log(data);
                if (data !== null) {
                    onChangeForm({
                        ...form,
                        serial: data.serial || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        observacoes: data.observacoes || '',
                        status: data.status || '',
                        tipo: data.tipo || "",
                        modelo: data.modelo || "",
                        foto: data.foto || [],
                        id: id
                    })
                }
            })
            .finally(() => {
                setLoading(false)
                setLoadingButton(false)
            })
    }


    const showAlertEditar = () => {
        Alert.alert(
            'Editar equipamento',
            'Deseja editar este equipamento?',
            [
                {
                    text: 'NÃO',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'SIM', onPress: () => update() },
            ],
            {
                cancelable: false,

            }



        );
    };
    useEffect(() => {
        getEquipamento();
    }, []);



    return (
        <>
            {loading ?
                <LoadingComponent />
                :
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
                        onPress3={loading ? null : showAlertEditar}
                        title3={loadingButton ? <ActivityIndicator color={'white'} /> : 'Alterar'}
                        corTexto={'black'}
                        color5={'#4682B4'}
                        color6={'#87CEFA'}
                    />
                </>
            }
        </>
    );
};
