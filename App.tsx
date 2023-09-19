
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { LogBox } from 'react-native';
import DrawerNavigator from './src/navigations/DrawerNavigator';



export default function DrawerNavigation() {
  LogBox.ignoreLogs(['Found screens with the same name nested inside one another.']);
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}
