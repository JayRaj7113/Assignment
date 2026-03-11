import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Effect to check token expiration periodically or on mount
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // exp is in seconds, Date.now() is ms
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    // Save everything to localStorage so it persists on refresh
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
