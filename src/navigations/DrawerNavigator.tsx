import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';
import { Login } from '../components/Login';
import { RecuperarSenha } from '../components/Login/Recuperacao';
import { PagCodigo } from '../components/Login/Recuperacao/PagCodigo';
import { AtualizarSenha } from '../components/Login/Recuperacao/AtualizarSenha';



export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Equipamentos ' component={StackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Usuários ' component={UsuarioStackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Login' component={Login} />
      <Drawer.Screen name='RecuperarSenha' component={RecuperarSenha} />
      <Drawer.Screen name='PagCodigo' component={PagCodigo} />
      <Drawer.Screen name='AtualizarSenha' component={AtualizarSenha} />
    </Drawer.Navigator>
  );
}
