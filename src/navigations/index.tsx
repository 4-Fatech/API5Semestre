
import React, { useContext } from 'react';
import DrawerNavigation from './DrawerNavigator';
import LoginStackNavigator from './LoginStackNavigator';
import { GlobalContext } from '../Context/GlobalProvider';
export default function AppNavConatiner(){
const {isLoggedIn} = useContext(GlobalContext)
    return (
        <>
     
    {isLoggedIn?<DrawerNavigation />: <LoginStackNavigator/>
    }
       </>
    
    
    )
}