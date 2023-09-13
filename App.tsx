import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./src/screens/Home";
import { Equipamentos } from './src/screens/Equipamentos';
import React from 'react';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastro de Equipamentos" component={Equipamentos} />
        <Drawer.Screen name="Cadastro de usuários" component={Equipamentos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}