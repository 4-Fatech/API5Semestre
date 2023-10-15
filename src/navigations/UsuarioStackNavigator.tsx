import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { ListarUsu } from "../screens/Usuarios/ListarUsu";
import { Usuarios } from "../screens/Usuarios/Usuarios";
import { UpdateUsu } from "../screens/Usuarios/UpdateUsu";
import { Perfil } from "../screens/Usuarios/Perfil";

export default function UsuarioStackNavigator() {
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