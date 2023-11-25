import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';
import Logout from '../screens/Logout';
import { StyleSheet } from 'react-native';
import UsuarioStackNavigatorPerfil from './UsuarioStackNavigatorPerfil';
import { MapaComponente } from '../screens/Equipamentos/Mapa';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { GlobalContext } from '../Context/GlobalProvider';

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const { user }: any = useContext(GlobalContext);
  const profile = user.profile;
  
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#9ACD32',
        drawerInactiveTintColor: '#9ACD32',
        drawerActiveBackgroundColor: '#d0f2e7',
        drawerStyle: {
          backgroundColor: '#43586A',
        }
      }}
      initialRouteName='Equipamentos ' >
      <Drawer.Screen
        name='Perfil '
        component={UsuarioStackNavigatorPerfil}
        options={({ route }) => ({
          headerShown: false,
          drawerIcon: ({ color, size }: any) => <Icon name="user-circle-o" size={45} color={"#77AC0C"} />,
          title: user.nome +" " + user.sobrenome,
          headerStyle: {
            backgroundColor: 'lightgreen',
          },
        })}
      />
      <Drawer.Screen
        name='Equipamentos '
        component={StackNavigator}
        options={{
          title: "EQUIPAMENTOS",
          headerShown: false,
          drawerLabelStyle: styles.text2,
          drawerIcon: ({ color, size }: any) => <Icon2 name="tools" size={18} color={"#77AC0C"} />,

        }} />
      {profile === "admin" && (
        <Drawer.Screen
          name='Usuários '
          component={UsuarioStackNavigator}
          options={{
            title: "USUÁRIOS",
            headerShown: false,
            drawerLabelStyle: styles.text2,
            drawerIcon: ({ color, size }: any) => <Icon name="users" size={18} color={"#77AC0C"} />
          }}
        />
      )}

      <Drawer.Screen
        name='Mapa'
        component={MapaComponente}
        options={{
          headerShown: false,
          drawerLabelStyle: styles.text,
          drawerItemStyle: styles.mapa,
          drawerIcon: ({ color, size }: any) => <Icon name="map-marker" size={18} color={"#77AC0C"} />,
          title: "MAPA"
        }} />
      <Drawer.Screen
        name='Sair'
        component={Logout}
        options={{
          headerShown: false,
          drawerItemStyle: styles.box1,
          drawerLabelStyle: styles.text2,
          drawerIcon: ({ color, size }: any) => <Entypo name="log-out" size={18} color={"#77AC0C"} />,
          title: "SAIR"
        }} />


    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({

  box1: {
    marginTop: '135%',
  },
  text: { marginLeft: "-6%" },
  text2: { marginLeft: "-10%", },
  mapa: {
    paddingLeft: "2%"
  },
  bg: {
    backgroundColor: '#1F303E'
  }

})