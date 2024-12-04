import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(
    localStorage.getItem('accessToken')
  );

  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setAccessTokenState(token);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

