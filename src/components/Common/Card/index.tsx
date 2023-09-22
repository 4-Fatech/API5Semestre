import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps, Image, Text } from 'react-native';

interface CardProps extends TouchableOpacityProps {
    image: string;
    title: string;
    id: string;
    nserie: string;
    ativo: number;
    onCardPress: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ title, style, image, id, onCardPress, nserie, ativo }) => {
    const imagem_vazio = 'data:image/png;base64,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'
    return (
        <TouchableOpacity
            onPress={() => onCardPress(id)}
            style={ativo ? [styles.card, style] : [styles.card, style, { opacity: 0.5 }]}
        >
            <View>
                <View style={styles.inner}>
                    <Image
                        style={styles.imagem}
                        source={image ? { uri: image } : { uri: imagem_vazio }}
                    />
                    <View style={ativo ? styles.legenda :
                        [styles.legenda, styles.legendaInativo]}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>N°Serie: {nserie}</Text>
                    </View>
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
    legendaInativo: {
        opacity: 0.5, 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10, 
        height: 8
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
