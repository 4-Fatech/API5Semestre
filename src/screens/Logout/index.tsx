import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../Context/GlobalProvider';
import { apiurl } from '../../Helpers/ApiUrl';
import LoadingComponent from '../../components/Common/Loading/Loading';

const Logout = () => {
  const { setLogIn } = useContext(GlobalContext)
  function Logout() {
    fetch(apiurl + "/login/logout", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },

    })
      .then((resposta) => resposta.json())
      .then((data) => {
        if (data.error) {
          console.log(data)

        } else {
          setLogIn(false)
        }

      })

  }

  useEffect(() => {
    Logout()
  }, []);

  return <LoadingComponent />;
};

export default Logout;