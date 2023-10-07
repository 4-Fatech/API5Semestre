import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import { Label } from "../../components/Common/Label/Label";
import MostrarImagem from "../../components/Common/ImageInput/MostrarImagem";
import SelectOpcao from "../../components/Common/Select/SelectOpcao";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../../components/Common/Button";

export const DetalhesEquipamentos = ({ route, navigation }: any) => {
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

    function desativar() {
        console.log('desativou viu');

    }
    function ativar() {
        console.log('ativou viu');

    }

    return (
        <>
            <ScrollView>
                <ScrollView>
                    <Label titulo='Imagens do equipamento' />
                    <MostrarImagem
                        form={form}
                    />
                </ScrollView>
                <View style={styles.container1}>
                    <View style={styles.campoTipoSerie}>
                    <Text style={{ color: '#000000', textAlign: 'center', lineHeight: 28 }}>{form.tipo}</Text>
                    </View>
                    <View style={styles.campoTipoSerie}>
                    <Text style={{ color: '#000000', textAlign: 'center', lineHeight: 28 }}>{form.modelo}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={{color:'#000000'}}>Nº de série </Text>
                    </View>
                    <View style={styles.campoSerial}>
                        <Text style={{color:'#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5}}> {form.serial} </Text>
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <Text>
                            <Label titulo="Latitude" />
                        </Text>
                        <Text style={styles.latitudeLongitude}> {form.latitude} </Text>
                    </View>
                    <View style={styles.container2}>
                        <Text>
                            <Label titulo="Longitude" />
                        </Text>
                        <Text style={styles.latitudeLongitude}> {form.longitude} </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.container}>
                        <Text>
                            <Label titulo="Observações" />
                        </Text>
                        <View style={styles.campoObservacao}>
                            <Text>{form.observacoes}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.ativarDesativar}>
                    <CustomButton title="Desativar" corTexto="#000000" onPress={desativar} color='#FE2A2A' color2="#D90F0F" />
                    <CustomButton title="Ativar" corTexto="#000000" onPress={ativar} color="#43FD82" color2="#2DCD63" />
                </View>

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 10
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    campoTipoSerie: {
        borderWidth: 1,
        borderRadius: 8,
        width: 150,
        height: 30,
        alignItems:'center',
        borderColor: 'black',
        marginRight: 10,
    },
    campoSerial: {
        backgroundColor: '#D9D9D9',
        width: 310,
        borderRadius: 8,
        height: 30,
    },
    latitudeLongitude: {
        color: '#5A6BFF',
    },
    campoObservacao: {
        borderColor: "#000000",
        width: 310,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
    },
    ativarDesativar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});
