import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      const t = await AsyncStorage.getItem('token');
      const u = await AsyncStorage.getItem('usuario');

      if (t && u) {
        setToken(t);
        setUsuario(JSON.parse(u));
      }

      setLoading(false);
    };
    carregar();
  }, []);

  const login = async (usuario, token) => {
    setUsuario(usuario);
    setToken(token);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    await AsyncStorage.setItem('token', token);
  };

  const logout = async () => {
    setUsuario(null);
    setToken(null);
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('token');
  };

  const atualizarUsuario = async (novoUsuario) => {
  setUsuario(novoUsuario);
  await AsyncStorage.setItem('usuario', JSON.stringify(novoUsuario));
};


  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, atualizarUsuario, loading }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);