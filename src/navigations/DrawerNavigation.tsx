import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { Home } from '../screens/Home';
import { Equipamentos } from '../screens/Equipamentos';
import React from 'react';
import { Usuarios } from '../screens/Usuarios';
import { ListarUsu } from '../screens/ListarUsu';
import { UpdateUsu } from '../screens/UpdateUsu';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastro de Equipamentos" component={Equipamentos} />
        <Drawer.Screen name="Cadastro de usuários" component={Usuarios} />
        <Drawer.Screen name="Listagem de usuários" component={ListarUsu} />
        <Drawer.Screen name="Atualizar usuário" component={UpdateUsu} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}