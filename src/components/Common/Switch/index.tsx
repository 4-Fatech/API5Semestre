import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SwitchProps {
    ativo: number;
}

export const SwitchComponent: React.FC<SwitchProps> = ({ ativo }) => {
    const [isEnabled, setIsEnabled] = useState(ativo > 0);

    useEffect(() => {
        setIsEnabled(ativo > 0);
    }, [ativo]);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#616161', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#42A5F5' : '#424242'}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text style={styles.label}>{isEnabled ? 'Ativo' : 'Inativo'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        height: 20,
        color: 'black',
        marginTop: 4
    },
    container: {
        flex: 1,
        flexDirection: "row"
    }
});
