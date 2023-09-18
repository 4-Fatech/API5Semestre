import React, {useEffect} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Common/Card";
interface Props{
    serial:string,
    latitude: string,
    longitude:string,
    observacoes : string,
    foto : any,
    status : string,
    tipo:string,
    modelo:string,
    id:string
}

export const Home = ({ navigation }: any) => {
    const [equipamento, setEquipamento] = React.useState<Props[]>([]);

    
    function getUsuarios() {
       

        const url = "http://10.0.2.2:3001/equipment/list";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {
                console.log(data)
               setEquipamento(data)

            

            });
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleCardPress = (nSerie: string) => {
        navigation.navigate("Detalhes do Equipamento", { nSerie });
      };      

    return (
        <ScrollView>
        <View style={styles.container}>
            {equipamento.map(e=>
                 <Card title={e.tipo} nSerie={e.serial} image={typeof e.foto == 'string'?  e.foto: e.foto[0]} onCardPress={handleCardPress}></Card>
            
           
            )}
         </View>
         </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginLeft: 5
    }
})
