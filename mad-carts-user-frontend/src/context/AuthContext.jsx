import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, decodeToken, removeToken, saveToken } from '../utils/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const user = decodeToken(token);
      setAuth({ user, token });
    }
  }, []);

  const login = (token) => {
    const user = decodeToken(token);
    saveToken(token);
    setAuth({ user, token });
  };

  const logout = () => {
    removeToken();
    setAuth({ user: null, token: null });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
