
import CardUsu from "../components/Common/Card/carUsu";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../components/Common/Button";


interface Usuario {
    nome: string;
    matricula: string;
    foto: string;
    id: string;
}

export const ListarUsu = ({ navigation }: any) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const handleCardPress = (id: string)=> {        
        navigation.navigate("AtualizarUsuario", { id:id });
        
    };

    function getUsuarios() {

        const url = "http://10.0.2.2:3001/user/list";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((resposta) => resposta.json())
            .then((data) => {

                const usuariosFormatados: Usuario[] = data.map((element: any) => ({
                    nome: element.nome,
                    matricula: element.matricula,
                    foto: element.foto,
                    id: element.id
                }));
                setUsuarios(usuariosFormatados);

            });
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    return (

        <ScrollView>
            <View style={styles.container}>
                {usuarios.map((usuario) => (
                    <CardUsu
                        id={usuario.id}
                        matricula={usuario.matricula}
                        image={usuario.foto?.[0]}
                        nome={usuario.nome}
                        onUsuPress={handleCardPress}
                    />
                ))}
            </View>
            {/* <CustomButton title={"Cad"} onPress={undefined} color={""} ></CustomButton> */}
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginLeft: 5,
        overflow: 'scroll'
    }
})
