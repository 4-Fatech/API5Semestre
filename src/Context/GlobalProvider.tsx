import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalContextType {
  isLoggedIn: boolean;
  setLogIn: (value: boolean) => void;
  user: Object;
  setUser: (user: Object) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState<Object>({});
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setLogIn(true);
        }
      } catch (error) {
        console.error('Erro ao recuperar o token do AsyncStorage:', error);
      }
    };
    retrieveToken();
  }, []);

  useEffect(() => {
    const storeToken = async () => {
      try {
        if (token) {
          await AsyncStorage.setItem('token', token);
        } else {
          await AsyncStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Erro ao salvar o token no AsyncStorage:', error);
      }
    };
    storeToken();
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setLogIn, user, setUser, token, setToken }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
