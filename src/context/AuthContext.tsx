import { api } from '@/lib/api';
import type { AuthResponse } from '@/types/auth';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  user: AuthResponse | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cc_token')
    if (stored) {
      api.get<AuthResponse>('/auth/me', stored)
        .then(data => {
          setToken(stored)
          setUser(data)
        })
        .catch(() => localStorage.removeItem('cc_token'))
        .finally(() => setIsLoading(false))
      setToken(stored)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = (data: AuthResponse) => {
    localStorage.setItem('cc_token', data.token);
    setToken(data.token);
    setUser(data);
  }

  const logout = () => {
    localStorage.removeItem('cc_token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}