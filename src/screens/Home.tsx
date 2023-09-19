import React, {useEffect} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Common/Card";
import { CustomButton } from "../components/Common/Button";
import { apiurl } from "../Helpers/ApiUrl";
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
       

        const url = apiurl+"/equipment/list";
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

    const handleCardPress = (id: string) => {
        navigation.navigate("Atualizar Equipamento", { id });
      };      

    return (
        <>
        <ScrollView>
        <View style={styles.container}>
            {equipamento.map(e=>
                 <Card title={e.tipo} id={e.id} image={typeof e.foto == 'string'?  e.foto: e.foto[0]} onCardPress={handleCardPress}></Card>
            
           
            )}
         </View>
         </ScrollView>
         <CustomButton title={"Cadastrar"} onPress={()=> navigation.navigate("Cadastro de Equipamento")} color={"green"}/>
        </>
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
