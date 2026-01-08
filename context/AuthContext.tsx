import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  demoLogin: () => void;
  adminDemoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    token: null,
  });

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('noor_token');
        const userStr = localStorage.getItem('noor_user');
        
        if (token && userStr && userStr !== "undefined") {
          const userData = JSON.parse(userStr);
          setState({
            token,
            user: userData,
            isAuthenticated: true,
            loading: false,
          });
        } else {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.error("Auth initialization failed, clearing storage", err);
        localStorage.removeItem('noor_token');
        localStorage.removeItem('noor_user');
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    const response = {
      token: 'jwt_' + Math.random(),
      user: {
        id: 'u_123',
        name: email.split('@')[0],
        email,
        whatsapp: '03001234567',
        balance: 500,
        currency: 'PKR',
        completedTasks: 2,
        referralCount: 0,
        role: email.includes('admin') ? ('admin' as const) : ('user' as const),
        status: 'active' as const
      }
    };
    
    localStorage.setItem('noor_token', response.token);
    localStorage.setItem('noor_user', JSON.stringify(response.user));
    
    setState({
      token: response.token,
      user: response.user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const register = async (data: any) => {
    const response = {
      token: 'jwt_' + Math.random(),
      user: {
        ...data,
        id: 'u_' + Math.random(),
        balance: 0,
        currency: 'PKR',
        completedTasks: 0,
        referralCount: 0,
        role: 'user' as const,
        status: 'active' as const
      }
    };
    
    localStorage.setItem('noor_token', response.token);
    localStorage.setItem('noor_user', JSON.stringify(response.user));
    
    setState({
      token: response.token,
      user: response.user,
      isAuthenticated: true,
      loading: false,
    });
  };

  const demoLogin = () => {
    const demoUser: User = {
      id: 'demo_user',
      name: 'Demo Worker',
      email: 'demo@noorofficial.com',
      whatsapp: '03001234567',
      balance: 2450,
      currency: 'PKR',
      completedTasks: 12,
      referralCount: 0,
      role: 'user',
      status: 'active'
    };
    const token = 'demo_token';
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(demoUser));
    setState({ token, user: demoUser, isAuthenticated: true, loading: false });
  };

  const adminDemoLogin = () => {
    const adminUser: User = {
      id: 'admin_root',
      name: 'Admin Controller',
      email: 'admin@noorofficial.com',
      whatsapp: '03112233445',
      balance: 999999,
      currency: 'PKR',
      completedTasks: 0,
      referralCount: 50,
      role: 'admin',
      status: 'active'
    };
    const token = 'admin_token';
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(adminUser));
    setState({ token, user: adminUser, isAuthenticated: true, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('noor_token');
    localStorage.removeItem('noor_user');
    setState({ token: null, user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, demoLogin, adminDemoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};