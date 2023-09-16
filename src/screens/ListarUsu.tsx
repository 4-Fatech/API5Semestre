
import CardUsu from "../components/Common/Card/carUsu";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';


interface Usuario {
    nome: string;
    matricula: string;
    foto: string;
    id: string;
}

export const ListarUsu = ({ navigation }: any) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const handleCardPress = (matricula: string) => {
        navigation.navigate("Atualizar Usuario", { matricula });
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
                console.log(data);

                const usuariosFormatados: Usuario[] = data.map((element: any) => ({
                    nome: element.nome,
                    matricula: element.matricula,
                    foto: element.foto,
                    id:element.id
                }));
                setUsuarios(usuariosFormatados);
                
            });
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <View style={styles.container}>
            {usuarios.map((usuario) => (
                <CardUsu
                    matricula={usuario.matricula}
                    image={usuario.foto}
                    nome={usuario.nome}
                    onUsuPress={handleCardPress}
                    title={""}
                />
            ))}
        </View>
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
