import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../components/Common/Button";
import { apiurl } from "../Helpers/ApiUrl";
import CardUsu from "../components/Common/Card/carUsu";

interface Usuario {
    nome: string;
    matricula: string;
    foto: [];
    id: string;
}

export const ListarUsu = ({ route, navigation }: any) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [searchText, setSearchText] = useState<string>(''); 

    const { userAlterado, userDeletado, userCadastrado } = route.params || {};

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

    const filteredUsuarios = usuarios.filter((usuario) => {
        return usuario.nome.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar usuários"
                placeholderTextColor="black"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            <ScrollView>
                <View style={styles.container}>
                    {filteredUsuarios.map((usuario) => (
                        <CardUsu
                            key={usuario.id} 
                            id={usuario.id}
                            matricula={usuario.matricula}
                            image={typeof usuario.foto}
                            nome={usuario.nome}
                            onUsuPress={handleCardPress}
                        />
                    ))}
                </View>
                <View style={styles.algumacoisa}>
                    <View style={styles.centeredView}> 
                       <CustomButton title={"Cadastrar"} corTexto={'black'} onPress={() => navigation.navigate("Cadastro de Usuários")} color={"#00FF56"} color2={'#5FFD94'} />
                    </View>
                </View>            
                </ScrollView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        overflow: 'scroll',
        justifyContent: 'center'
    },
    searchInput: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        color:'black',
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
});
