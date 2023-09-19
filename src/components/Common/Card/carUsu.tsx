import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Image, Text } from 'react-native';

import { EquipamentoVazio } from '../../../Assets/image';
interface CardProps extends TouchableOpacityProps {
    matricula: string;
    id: string;
    image: string;
    nome: string;
    onUsuPress: (id: string) => void; // Renomeie a propriedade onPress
}

const CardUsu: React.FC<CardProps> = ({ id, style, image, nome, onUsuPress, matricula }) => {
    return (
        <TouchableOpacity
            onPress={() => onUsuPress(id)}
            style={[styles.card, style]}
        >
            <View style={styles.inner}>
                <Image
                    style={styles.imagem}
                    source={image ? { uri: image } : EquipamentoVazio}
                />
                <View style={styles.legenda}>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.subtitle}>Matricula: {matricula}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 170,
        height: 200,
        backgroundColor: '#d9d9d9',
        borderRadius: 16,
        margin: 5,
        marginTop: 15,
        paddingTop: 5,
    },
    inner: {
        width: '100%',
        height: '100%',
    },
    legenda: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    imagem: {
        borderRadius: 10,
        width: '100%',
        height: '75%',
    },
    title: {
        color: 'black',
    },
    subtitle: {
        color: 'gray',
    },
});

export default CardUsu;
