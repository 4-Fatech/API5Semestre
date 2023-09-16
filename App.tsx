import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { Equipamentos } from './src/screens/Equipamentos';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DetalhesEquipamento } from './src/components/Equipamentos/DetalhesEquipamento';
import { Home } from './src/screens/Home';
import { LogBox } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawerNavigation() {
  LogBox.ignoreLogs(['Found screens with the same name nested inside one another.']);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" options={{headerTitle: undefined, drawerLabel: () => null, drawerActiveBackgroundColor: 'none'}}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Detalhes do Equipamento"
                component={DetalhesEquipamento}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Home2" options={{ drawerLabel: 'Home', headerTitle: 'Home' }} component={Home}/>
        <Drawer.Screen name="Cadastro de Equipamentos" component={Equipamentos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
