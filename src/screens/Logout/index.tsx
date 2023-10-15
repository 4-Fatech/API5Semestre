import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {GlobalContext} from '../../Context/GlobalProvider';
import { apiurl } from '../../Helpers/ApiUrl';

const Logout = () => {
  const {setLogIn} = useContext(GlobalContext)
  function Logout(){
    fetch(apiurl+"/login/logout", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
     
  })
      .then((resposta) => resposta.json())
      .then((data) => {
          if(data.error){
              console.log(data)
              
          }else{
              setLogIn(false)
          }
        
      })

  }

  useEffect(() => {
    Logout()
  }, []);

  return <ActivityIndicator />;
};

export default Logout;