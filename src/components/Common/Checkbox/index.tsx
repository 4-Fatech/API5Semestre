import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View } from 'react-native';

interface CheckBoxProps {
    value: boolean;
    setValue: (value: boolean) => void;
    label: string
}

const CheckboxComponent = ({ value, setValue, label }: CheckBoxProps) => {
    return (
        <View style={styles.checkbox}>
            <CheckBox
                disabled={false}
                value={value}
                onValueChange={setValue}
            />
            <Text style={{ marginTop: 6}}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        flex: 1,
        flexDirection: 'row'
    }
})

export default CheckboxComponent;
