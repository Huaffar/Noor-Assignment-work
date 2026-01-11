import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<User>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  demoLogin: () => Promise<User>;
  adminDemoLogin: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') return { user: null, isAuthenticated: false, loading: true, token: null };
    const token = localStorage.getItem('noor_token');
    const userStr = localStorage.getItem('noor_user');
    if (token && userStr && userStr !== "undefined" && userStr !== "null") {
      try {
        const parsedUser = JSON.parse(userStr);
        if (parsedUser && parsedUser.id) {
          return { token, user: parsedUser, isAuthenticated: true, loading: false };
        }
      } catch (err) { 
        localStorage.removeItem('noor_token');
        localStorage.removeItem('noor_user');
      }
    }
    return { user: null, isAuthenticated: false, loading: false, token: null };
  });

  const updateAuthState = (user: User, token: string) => {
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(user));
    setState({ token, user, isAuthenticated: true, loading: false });
  };

  const login = async (email: string, pass: string): Promise<User> => {
    setState(prev => ({ ...prev, loading: true }));
    await new Promise(r => setTimeout(r, 800));
    
    const isAdmin = (email === 'admin@noorofficial.com' || email.includes('admin'));
    const user: User = {
      id: isAdmin ? 'admin_root' : 'u_demo_worker',
      name: isAdmin ? 'Admin Manager' : 'Standard Worker',
      email,
      whatsapp: '03001234567',
      balance: isAdmin ? 999999 : 5400,
      currency: 'PKR',
      completedTasks: isAdmin ? 0 : 12,
      referralCount: isAdmin ? 50 : 3,
      role: isAdmin ? 'admin' : 'user',
      status: 'active',
      checkInStreak: isAdmin ? 0 : 4,
      planStatus: 'active',
      currentPlan: isAdmin ? 'System Admin' : 'Gold Package',
      dailyLimit: isAdmin ? 100 : 12,
      kycStatus: 'approved',
      totalEarned: isAdmin ? 0 : 18400,
      totalWithdrawn: isAdmin ? 0 : 13000
    };
    
    const token = 'jwt_' + Date.now();
    updateAuthState(user, token);
    return user;
  };

  const register = async (data: any) => {
    setState(prev => ({ ...prev, loading: true }));
    await new Promise(r => setTimeout(r, 1000));
    
    const newUser: User = { 
      ...data, 
      id: 'u_' + Date.now(), 
      balance: 0, 
      currency: 'PKR', 
      role: 'user', 
      status: 'active', 
      checkInStreak: 0,
      planStatus: 'none', 
      currentPlan: null,
      kycStatus: 'pending', 
      totalEarned: 0, 
      totalWithdrawn: 0,
      dailyLimit: 0,
      referralCount: 0,
      completedTasks: 0
    };

    updateAuthState(newUser, 'jwt_' + Date.now());
  };

  const demoLogin = () => login('worker@noorofficial.com', 'demo');
  const adminDemoLogin = () => login('admin@noorofficial.com', 'admin');

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
  if (!context) throw new Error('useAuth error');
  return context;
};