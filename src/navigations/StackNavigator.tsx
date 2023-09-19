import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from "../screens/Home";
import { DetalhesEquipamento } from "../components/Equipamentos/DetalhesEquipamento";
import { Equipamentos } from "../screens/Equipamentos";
export default function StackNavigator  () {
    const Stack = createStackNavigator();
    return (
    <Stack.Navigator >
        <Stack.Screen
                name="Home"
                component={Home}
              />
              <Stack.Screen
                name="Detalhes do Equipamento"
                component={DetalhesEquipamento}
              />
              <Stack.Screen
                name="Cadastro de Equipamento"
                component={Equipamentos}
              />

    </Stack.Navigator>
    
    )

    
}