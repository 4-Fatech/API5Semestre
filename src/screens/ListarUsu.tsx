
import CardUsu from "../components/Common/Card/carUsu";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../components/Common/Button";
import { apiurl } from "../Helpers/ApiUrl";

interface Usuario {
    nome: string;
    matricula: string;
    foto: string;
    id: string;
}

export const ListarUsu = ({ route, navigation }: any) => {


    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const { userAlterado, userDeletado, userCadastrado } = route.params || {};

    // const [userUpdated, setUserUpdated] = useState(false);
    // const [userDeleted, setUserDeleted] = useState(false);




    const handleCardPress = (id: string) => {
        navigation.navigate("Atualizar Usuário", { id: id });

    };

    function getUsuarios() {

        const url = apiurl + "/user/list";
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
        if (userAlterado || userDeletado || userCadastrado) {
            getUsuarios();
        }
       
    }, [userAlterado, userCadastrado, userDeletado]);   

    return (
        <>
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
            </ScrollView>
            <CustomButton title={"Cadastrar"} onPress={() => navigation.navigate("Cadastro de Usuários")} color={"green"} />
        </>

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
