import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';

import Logout from '../screens/Logout';



export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Equipamentos ' component={StackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Usuários ' component={UsuarioStackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name='Sair' component={Logout} options={{ headerShown: false }} />


    </Drawer.Navigator>
  );
}
