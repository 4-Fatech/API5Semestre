import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { Equipamentos } from './src/screens/Equipamentos';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DetalhesEquipamento } from './src/components/Equipamentos/DetalhesEquipamento';
import { Home } from './src/screens/Home';
import { LogBox } from 'react-native';
import { Usuarios } from './src/screens/Usuarios';
import { ListarUsu } from './src/screens/ListarUsu';
import { UpdateUsu } from './src/screens/UpdateUsu';

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
        <Drawer.Screen name="AtualizarUsuario" options={{headerTitle: undefined, drawerLabel: () => null, drawerActiveBackgroundColor: 'none'}}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Atualizar usuário"
                component={UpdateUsu}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Home2" options={{ drawerLabel: 'Home', headerTitle: 'Home' }} component={Home}/>
        <Drawer.Screen name="Cadastro de Equipamentos" component={Equipamentos} />
        <Drawer.Screen name="Cadastro de Usuários" component={Usuarios} />
        <Drawer.Screen name="Listar Usuários" component={ListarUsu} />
        {/* <Drawer.Screen name="AtualizarUsuario" options={{ drawerLabel: 'Atualizar Usuario', headerTitle: 'Atualizar Usuario' }} component={UpdateUsu} /> */}

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
