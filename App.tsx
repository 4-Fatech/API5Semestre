
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import GlobalProvider from "./src/Context/GlobalProvider";
import AppNavConatiner from "./src/navigations";

export default function DrawerNavigation() {
  return (
    <GlobalProvider>
        <NavigationContainer>
         <AppNavConatiner/>
        </NavigationContainer>
    </GlobalProvider>
  
  );
}
