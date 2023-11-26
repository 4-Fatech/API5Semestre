import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SwitchProps {
    ativo: number;
    onChangeText: (ativo: number) => void;
    disable?:boolean
}

export const SwitchComponent: React.FC<SwitchProps> = ({ ativo, onChangeText, disable = false }) => {
    const [isEnabled, setIsEnabled] = useState(ativo > 0);

    useEffect(() => {
        setIsEnabled(ativo > 0);
    }, [ativo]);

    const toggleSwitch = () => {
        const newAtivo = isEnabled ? 0 : 1;
        setIsEnabled(previousState => !previousState);
        onChangeText(newAtivo);
    };

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#616161', true: '#3c9bff' }}
                thumbColor={isEnabled ? '#53a5ff' : '#424242'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                disabled={disable}
            />
            <Text style={styles.label}>{isEnabled ? 'Ativo' : 'Inativo'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        height: 20,
        color: 'white',
        marginTop: 4
    },
    container: {
        flex: 1,
        flexDirection: "row"
    }
});
