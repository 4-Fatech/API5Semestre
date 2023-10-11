import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Perfil } from "../screens/Usuarios/Perfil";

export default function UsuarioStackNavigatorPerfil() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Perfil"
        component={Perfil}
      />
    </Stack.Navigator>

  )


}