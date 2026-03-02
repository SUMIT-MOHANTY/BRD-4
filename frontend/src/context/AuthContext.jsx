import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/apiClient.js';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const isAuthenticated = !!accessToken;
  const login = async (username, password) => {
    const resp = await api.post('/api/v1/auth/login/', { username, password });
    localStorage.setItem('accessToken', resp.data.access);
    localStorage.setItem('refreshToken', resp.data.refresh);
    setAccessToken(resp.data.access);
    setUser(resp.data.user);
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
    setUser(null);
  };
  const register = async (data) => { await api.post('/api/v1/auth/register/', data); };
  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    const resp = await api.post('/api/v1/auth/refresh/', { refresh });
    localStorage.setItem('accessToken', resp.data.access);
    setAccessToken(resp.data.access);
  };
  useEffect(() => {
    if (accessToken) {
      api.get('/api/v1/users/me/').then(r => setUser(r.data)).catch(() => {});
    }
  }, [accessToken]);
  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout, register, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
