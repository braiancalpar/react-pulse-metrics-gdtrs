import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

// Problema: sem useMemo - todo state change causa re-render em toda a árvore
// Ticket #189: "AuthContext causa re-renders desnecessários"
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem('auth_user');
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('auth_token')
  );
  const [loading, setLoading] = useState(false);
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data: any = await api.post('/auth/login', { email, password });
      localStorage.setItem('auth_token', data.token);
      if (data.user != null) {
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }
      setUser(data.user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    return user.permissions?.includes(permission) ?? false;
  };

  // Sem useMemo: novo objeto criado a cada render = todos os consumidores re-renderizam
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

export default AuthContext;
