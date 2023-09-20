import React, { useEffect } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Common/Card";
import { CustomButton } from "../components/Common/Button";
import { apiurl } from "../Helpers/ApiUrl";
interface Props {
    serial: string,
    latitude: string,
    longitude: string,
    observacoes: string,
    foto: any,
    status: string,
    tipo: string,
    modelo: string,
    id: string
}

export const Home = ({ route, navigation }: any) => {
    const [equipamento, setEquipamento] = React.useState<Props[]>([]);
    const { equipAlterada, equipCadastrada } = route.params || {};

    function getEquipamentos() {


        const url = apiurl + "/equipment/list";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                setEquipamento(data)
            });
    }

    useEffect(() => {
        getEquipamentos();
        if (equipAlterada || equipCadastrada) {
            getEquipamentos();
        }
    }, [equipAlterada, equipCadastrada]);

    const handleCardPress = (id: string) => {
        navigation.navigate("Atualizar Equipamento", { id });
    };

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {equipamento.map(e =>
                        <Card
                            key={e.id}
                            title={e.tipo}
                            nserie={e.serial}
                            id={e.id}
                            image={typeof e.foto == 'string' ? e.foto : e.foto[0]}
                            ativo={e.status}
                            onCardPress={handleCardPress}>
                        </Card>
                    )}
                </View>
                <CustomButton title={"Cadastrar"} onPress={() => navigation.navigate("Cadastro de Equipamento")} color={"green"} />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start",
        justifyContent: 'center'
    }
})
