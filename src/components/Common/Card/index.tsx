import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CardProps extends TouchableOpacityProps {
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
    return (
        <>
            <TouchableOpacity
                //   onPress={onPress}
                style={[styles.card, style]}
            >
                <View style={styles.inner}>{children}</View>
            </TouchableOpacity>

            <View style={styles.inner}>{children}</View></>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 200,
        backgroundColor: '#d5d5d5',
        borderRadius: 16,
        margin: 5,
        marginTop: 15
    },
    inner: {
        width: '100%',
        height: '100%',
    },
});

export default Card;
