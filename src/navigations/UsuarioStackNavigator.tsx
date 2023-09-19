import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { ListarUsu } from "../screens/ListarUsu";
import { Usuarios } from "../screens/Usuarios";
import { UpdateUsu } from "../screens/UpdateUsu";

export default function UsuarioStackNavigator  () {
    const Stack = createStackNavigator();
    return (
    <Stack.Navigator >       
        < Stack.Screen
                name="Usuários"
                component={ListarUsu}
              />
                <Stack.Screen
                name="Cadastro de Usuários"
                component={Usuarios}
              />
               
              <Stack.Screen
                name="Atualizar Usuário"
                component={UpdateUsu}
              />
    </Stack.Navigator>
    
    )

    
}