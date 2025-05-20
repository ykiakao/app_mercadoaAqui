import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const t = await AsyncStorage.getItem('token');
      const u = await AsyncStorage.getItem('usuario');
      if (t && u) {
        setToken(t);
        setUsuario(JSON.parse(u));
        setIsLoggedIn(true);
      }
    };
    carregar();
  }, []);

  const login = async (user, token) => {
    setUsuario(user);
    setToken(token);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('usuario', JSON.stringify(user));
  };

  const logout = async () => {
    setUsuario(null);
    setToken(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
