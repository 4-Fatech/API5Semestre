import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from "../screens/Home";
import { Equipamentos } from "../screens/Equipamentos";
import { EditarEquipamentos } from "../screens/EditarEquipamento";
export default function StackNavigator  () {
    const Stack = createStackNavigator();
    return (
    <Stack.Navigator >
        <Stack.Screen
                name="Home"
                component={Home}
              />
              <Stack.Screen
                name="Atualizar Equipamento"
                component={EditarEquipamentos}
              />
              <Stack.Screen
                name="Cadastro de Equipamento"
                component={Equipamentos}
              />

    </Stack.Navigator>
    
    )

    
}