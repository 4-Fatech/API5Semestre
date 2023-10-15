import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View } from 'react-native';

interface CheckBoxProps {
    value: boolean;
    setValue: (value: boolean) => void;
    label: string
    onChange: () => void;
}

const CheckboxComponent = ({ value, setValue, label, onChange }: CheckBoxProps) => {
    const handleValueChange = (newValue: boolean) => {
        setValue(newValue);
        if (onChange) {
            onChange();
        }
    };
    return (
        <View style={styles.checkbox}>
            <CheckBox
                disabled={false}
                value={value}
                onValueChange={handleValueChange}
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
