import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Image, Text } from 'react-native';

interface CardProps extends TouchableOpacityProps {
    matricula: string;
    id: string;
    image?: Array<string>;
    nome: string;
    onUsuPress: (id: string) => void;
}

const CardUsu: React.FC<CardProps> = ({ id, style, image, nome, onUsuPress, matricula }) => {
    const imagem_vazio = 'data:image/png;base64,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'
    return (
        <TouchableOpacity
            onPress={() => onUsuPress(id)}
            style={[styles.card, style]}
        >
            <View style={styles.inner}>
                <Image
                    style={styles.imagem}
                    source={image?.length === 0 ? { uri: imagem_vazio } : { uri: image?.[0] }}
                />
                <View style={styles.legenda}>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.subtitle}>Matrícula: {matricula}</Text>
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
