import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import Card from "../../components/Common/Card";
import { CustomButton } from "../../components/Common/Button";
import { apiurl } from "../../Helpers/ApiUrl";
import LoadingComponent from "../../components/Common/Loading/Loading";
import { GlobalContext } from "../../Context/GlobalProvider";


interface Props {
    serial: string,
    latitude: string,
    longitude: string,
    observacoes: string,
    foto: any,
    status: number,
    tipo: string,
    modelo: string,
    id: string
}

export const Home = ({ route, navigation }: any) => {
    const context = useContext(GlobalContext);
    const token = context?.token || "";
    const [equipamento, setEquipamento] = React.useState<Props[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const { equipAlterada, equipCadastrada } = route.params || {};
    const [isLoading, setLoading] = useState(false)


    function getEquipamentos() {

        const url = apiurl + "/equipment/list";
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })

            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error('Erro na solicitação à API');
                }
                return resposta.json();
            })
            .then((data) => {
                setEquipamento(data)
            })
            .catch((error) => {
                console.error(error);

            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getEquipamentos();
        if (equipAlterada || equipCadastrada) {
            getEquipamentos();
        }
    }, [equipAlterada, equipCadastrada]);


    const showAlert = (id: string) => {
        Alert.alert(
            'Ações',
            'O que deseja fazer?',
            [
                {
                    text: 'Editar',
                    onPress: () => navigation.navigate("Atualizar Equipamento", { id }),
                    style: 'cancel',
                },
                { text: 'Visualizar', onPress: () => navigation.navigate("Detalhes Equipamento", { id }) },
                {
                    text: 'Ver no mapa',
                    //Passo o id e a variavel como true para a tela mapa
                    onPress: () => navigation.navigate("Mapa", { id, equipUnico: true })


                }
            ],
            { cancelable: true }
        );
    };

    const filteredEquipamento = equipamento.filter((equip) => {
        const tipoFiltrado = equip.tipo.toLowerCase();
        const serialFiltrado = equip.serial;
        const modeloFiltrado = equip.modelo.toLowerCase();

        return tipoFiltrado.includes(searchText.toLowerCase()) || serialFiltrado.includes(searchText.toLowerCase()) || modeloFiltrado.includes(searchText.toLowerCase());
    });
    return (
        <>
            {isLoading ? <LoadingComponent />
                :
                <>
                    <ScrollView style={styles.bg}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Pesquisar equipamentos"
                            placeholderTextColor="white"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                        />
                        <ScrollView>
                            <View style={styles.container}>
                                {filteredEquipamento.map(e =>
                                    <Card
                                        key={e.id}
                                        title={e.tipo}
                                        nserie={e.serial}
                                        id={e.id}
                                        image={e.foto}
                                        ativo={e.status}
                                        onCardPress={showAlert}>
                                    </Card>
                                )}
                            </View>
                            <View style={styles.algumacoisa}>
                                <View style={styles.centeredView}>
                                    <CustomButton title={"Cadastrar"} corTexto={'#2D2D2D'} onPress={() => navigation.navigate("Cadastro de Equipamento")} color={'#94C021'} color2={'#C0F458'} />
                                </View>
                            </View>
                        </ScrollView>
                    </ScrollView>
                </>
            }

        </>
    );
};

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#1F303E'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start",
        justifyContent: 'center'
    },
    searchInput: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    algumacoisa: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        width: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
})