import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';

import Logout from '../screens/Logout';
import { StyleSheet, Text, View } from 'react-native';
import UsuarioStackNavigatorPerfil from './UsuarioStackNavigatorPerfil';
import { MapaComponente } from '../screens/Equipamentos/Mapa';



export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Equipamentos ' component={StackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Usuários ' component={UsuarioStackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Perfil ' component={UsuarioStackNavigatorPerfil} options={{ headerShown: false }} />
      <Drawer.Screen name='Sair' component={Logout} options={{ headerShown: false }} />
      <Drawer.Screen name='Mapa' component={MapaComponente} options={{ headerShown: false }} />

    </Drawer.Navigator>
  );
}
