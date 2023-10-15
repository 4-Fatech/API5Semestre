import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "../components/Login";
import { RecuperarSenha } from "../components/Login/Recuperacao";
import { PagCodigo } from "../components/Login/Recuperacao/PagCodigo";
import { AtualizarSenha } from "../components/Login/Recuperacao/AtualizarSenha";
export default function LoginStackNavigator  () {
    const Stack = createStackNavigator();
    return (
    <Stack.Navigator >
        <Stack.Screen
                name="Login"
                component={Login}
              />
        <Stack.Screen
                name="Recuperar Senha"
                component={RecuperarSenha}
              />
        <Stack.Screen
                name="Enviar Código"
                component={PagCodigo}
              />
        <Stack.Screen
                name="Atualizar Senha"
                component={AtualizarSenha}
              />
      
            

    </Stack.Navigator>
    
    )

    
}