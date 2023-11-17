import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { apiurl } from "../../Helpers/ApiUrl";
import { Label } from "../../components/Common/Label/Label";
import MostrarImagem from "../../components/Common/ImageInput/MostrarImagem";
import { ScrollView } from "react-native-gesture-handler";
import { SwitchComponent } from "../../components/Common/Switch";
import LoadingComponent from "../../components/Common/Loading/Loading";
import { GlobalContext } from "../../Context/GlobalProvider";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { format, parseISO } from 'date-fns';

export const DetalhesEquipamentos = ({ route, navigation }: any) => {
    const context = useContext(GlobalContext);
    const token = context?.token || "";
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
    const layout = useWindowDimensions();
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'Equipamento', title: 'Equipamento' },
        { key: 'Historico', title: 'Histórico' },
    ]);
    const [logs, setLogs] = React.useState()

    function getEquipamento() {
        const url = apiurl + '/equipment/get/' + id;
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
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
            })
            .finally(() => setLoading(false))
    }

    function getLogs() {
        const url = apiurl + '/equipment/getLogs/' + id;
        console.log(url)
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                if (data !== null) {
                    console.log(data)
                    setLogs(data)
                }
            })
            .finally(() => setLoading(false))
    }

    const HistoryItem = ({ item }: any) => {
        const formattedDate = format(parseISO(item.date), "dd/MM/yyyy HH:mm:ss");
        return (
            <View style={styles.historyItem}>
                <Text>Ação: {item.action}</Text>
                <Text>Data: {formattedDate}</Text>
                <Text>Usuário: {item.userEmail}</Text>
                {item.details ? (
                    <View>
                        <Text>Mudanças:</Text>
                        {item.details.map((detail: string, index: number) => (
                            <Text key={index}>• {detail}</Text>
                        ))}
                    </View>
                ) : (
                    <Text>Mudanças: Sem informações disponíveis</Text>
                )}

            </View>
        );
    }

    const HistoryScreen = () => {
        return (
            <View style={styles.hist}>
                <FlatList
                    data={logs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <HistoryItem item={item} />}
                />
            </View>
        );
    };

    const Detalhes = () => (
        <>
            <ScrollView>
                <View style={styles.alinhamentoCentro}>
                    <ScrollView style={styles.imagens}>
                        <Label titulo='Imagens do equipamento' />
                        <MostrarImagem
                            form={form}
                        />
                    </ScrollView>

                </View>
                <View style={styles.alinhamentoCentro}>
                    <View style={styles.container1}>
                        <View style={styles.campoTipoSerie}>
                            <Text style={{ color: '#000000', textAlign: 'center', lineHeight: 28 }}>{form.tipo}</Text>
                        </View>
                        <View style={styles.campoTipoSerie}>
                            <Text style={{ color: '#000000', textAlign: 'center', lineHeight: 28 }}>{form.modelo}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.alinhamentoCentro}>
                    <View style={styles.container}>
                        <View>
                            <Text style={{ color: '#000000', lineHeight: 28, }}>Nº de série </Text>
                        </View>
                        <View style={styles.campoSerial}>
                            <Text style={{ color: '#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5 }}> {form.serial} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.alinhamentoCentro}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        <View style={styles.containerLatitude}>
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
                    </ScrollView>
                </View>
                <View style={styles.alinhamentoCentro}>

                    <View style={styles.container}>
                        <Text>
                            <Label titulo="Observações" />
                        </Text>
                        <View style={styles.campoObservacao}>
                            <Text style={{ color: '#000000', textAlign: 'left', lineHeight: 28, marginLeft: 5 }}>{form.observacoes}</Text>
                        </View>
                    </View>


                </View>
                <View style={styles.ativarDesativar}>
                    <SwitchComponent ativo={parseInt(form.status)} onChangeText={(): any => ''} disable={true} key={form.status} />
                </View>
            </ScrollView>
        </>
    );

    useEffect(() => {
        getEquipamento();
        getLogs();
    }, []);

    return (
        <>
            {loading ?
                <LoadingComponent />
                :
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={SceneMap({
                        Historico: HistoryScreen,
                        Equipamento: Detalhes,
                    })}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#FFFFFF' }}
                            style={{ backgroundColor: '#333333' }}
                            labelStyle={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}
                        />
                    )}
                />
            }
        </>
    );
};

const styles = StyleSheet.create({
    alinhamentoCentro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagens: {
        width: 250
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    scrollViewContent: {
        flexDirection: 'row',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 5
    },
    containerLatitude: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 296,
        height: 50,
        marginTop: 20,
        padding: 5
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    campoTipoSerie: {
        borderWidth: 1,
        borderRadius: 8,
        width: 140,
        height: 30,
        alignItems: 'center',
        borderColor: 'black',
        marginRight: 10,
    },
    campoSerial: {
        backgroundColor: '#D9D9D9',
        width: 296,
        borderRadius: 8,
        height: 30,
    },
    latitudeLongitude: {
        color: '#5A6BFF',
    },
    campoObservacao: {
        borderColor: "#000000",
        width: 296,
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginTop: 8,
        marginBottom: 15
    },
    ativarDesativar: {
        marginTop: 10,
        marginBottom: 30,
        marginLeft: 50
    },
    historyItem: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    hist: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
