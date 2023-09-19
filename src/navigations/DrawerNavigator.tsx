import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';
import { TouchableOpacity , Text, View, StyleSheet} from 'react-native';






export default function DrawerNavigator({navigation}:any) {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home ' component={StackNavigator}   options={{ headerShown: false }}/>  
        <Drawer.Screen name='Usuários ' component={UsuarioStackNavigator}   options={{ headerShown: false }}/>       

      </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
 

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 17,
    paddingVertical: 7,
    paddingLeft: 20,
  },
});