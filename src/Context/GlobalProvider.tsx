import React, {createContext, useState} from 'react';


export const GlobalContext = createContext({});

const GlobalProvider = ({children}:any) => {
  const [isLoggedIn, setLogIn] = useState(false);
 
  return (
    <GlobalContext.Provider
      value={{isLoggedIn, setLogIn}}
      >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;