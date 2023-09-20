import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Image, Text } from 'react-native';

interface CardProps extends TouchableOpacityProps {
    image: string;
    title: string;
    id: string;
    nserie: string
    onCardPress: (id: string) => void; // Renomeie a propriedade onPress
}

const Card: React.FC<CardProps> = ({ title, style, image, id, onCardPress , nserie}) => {
    return (
        <TouchableOpacity
            onPress={() => onCardPress(id)} // Chame onCardPress com o ID do equipamento
            style={[styles.card, style]}
        >
            <View style={styles.inner}>
                <Image
                    style={styles.imagem}
                    source={image ? { uri: image } : {}}
                />
                <View style={styles.legenda}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>N°Serie: {nserie}</Text>
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

export default Card;
