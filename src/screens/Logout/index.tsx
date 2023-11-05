import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../Context/GlobalProvider';
import { apiurl } from '../../Helpers/ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../components/Common/Loading/Loading';

const Logout = () => {
  const { setLogIn } = useContext(GlobalContext);

  useEffect(() => {
    const doLogout = async () => {
      try {
        const response = await fetch(apiurl + '/login/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        });

        if (response.ok) {
          
          await AsyncStorage.removeItem('token');
          setLogIn(false);
        } else {
          console.error('Erro ao fazer logout no servidor');
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

    doLogout();
  }, [setLogIn]);
  
  return <LoadingComponent />;
};

export default Logout;
