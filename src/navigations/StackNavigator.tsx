import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from "../screens/Equipamentos/ListarEquipamentos";
import { Equipamentos } from "../screens/Equipamentos/Equipamentos";
import { EditarEquipamentos } from "../screens/Equipamentos/EditarEquipamento";
export default function StackNavigator  () {
    const Stack = createStackNavigator();
    return (
    <Stack.Navigator >
        <Stack.Screen
                name="Equipamentos"
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