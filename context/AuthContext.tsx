
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  // Sync Hydration: Immediate check of localStorage to prevent flicker
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') return { user: null, isAuthenticated: false, loading: true, token: null };
    
    const token = localStorage.getItem('noor_token');
    const userStr = localStorage.getItem('noor_user');
    
    if (token && userStr && userStr !== "undefined") {
      try {
        const parsedUser = JSON.parse(userStr);
        return {
          token,
          user: parsedUser,
          isAuthenticated: true,
          loading: false,
        };
      } catch (err) {
        localStorage.clear();
      }
    }
    return { user: null, isAuthenticated: false, loading: false, token: null };
  });

  const login = async (email: string, pass: string): Promise<User> => {
    setState(prev => ({ ...prev, loading: true }));
    await new Promise(r => setTimeout(r, 600));
    
    const isAdmin = (email === 'admin@noorofficial.com' || email.includes('admin'));
    const role = isAdmin ? 'admin' : 'user';
    
    const user: User = {
      id: role === 'admin' ? 'admin_root' : 'u_demo_worker',
      name: isAdmin ? 'Admin Manager' : 'Standard Worker',
      email,
      whatsapp: '03001234567',
      balance: role === 'admin' ? 999999 : 5400,
      currency: 'PKR',
      completedTasks: role === 'admin' ? 0 : 12,
      referralCount: role === 'admin' ? 50 : 3,
      role: role as 'admin' | 'user',
      status: 'active' as const,
      checkInStreak: role === 'admin' ? 0 : 4,
      planStatus: 'active',
      currentPlan: role === 'admin' ? 'System Admin' : 'Gold Package',
      dailyLimit: role === 'admin' ? 100 : 12,
      kycStatus: 'approved' as const,
      totalEarned: role === 'admin' ? 0 : 18400,
      totalWithdrawn: role === 'admin' ? 0 : 13000,
    };
    
    const token = 'jwt_' + Date.now();
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(user));
    
    setState({ token, user, isAuthenticated: true, loading: false });
    return user;
  };

  const register = async (data: any) => {
    setState(prev => ({ ...prev, loading: true }));
    await new Promise(r => setTimeout(r, 800));
    const user = { 
      ...data, 
      id: 'u_' + Date.now(), 
      balance: 0, 
      currency: 'PKR', 
      role: 'user', 
      status: 'active', 
      checkInStreak: 0, 
      planStatus: 'none', 
      kycStatus: 'pending', 
      totalEarned: 0, 
      totalWithdrawn: 0,
      dailyLimit: 0
    };
    const token = 'jwt_' + Date.now();
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(user));
    setState({ token, user: user as User, isAuthenticated: true, loading: false });
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
