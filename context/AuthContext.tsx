import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<User>;
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
    // Zero-latency boot sync
    const token = localStorage.getItem('noor_token');
    const userStr = localStorage.getItem('noor_user');
    
    if (token && userStr && userStr !== "undefined") {
      try {
        setState({
          token,
          user: JSON.parse(userStr),
          isAuthenticated: true,
          loading: false,
        });
        return;
      } catch (err) {
        localStorage.clear();
      }
    }
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    const role = (email === 'admin@noorofficial.com' || email.includes('admin')) ? 'admin' : 'user';
    const user: User = {
      id: role === 'admin' ? 'admin_root' : 'u_demo_worker',
      name: email.split('@')[0],
      email,
      whatsapp: '03001234567',
      balance: role === 'admin' ? 999999 : 5400,
      currency: 'PKR',
      completedTasks: role === 'admin' ? 0 : 12,
      referralCount: role === 'admin' ? 50 : 3,
      role: role as 'admin' | 'user',
      status: 'active' as const,
      checkInStreak: role === 'admin' ? 0 : 4,
      planStatus: role === 'admin' ? 'active' : 'active',
      currentPlan: role === 'admin' ? 'System Admin' : 'Gold Package',
      dailyLimit: role === 'admin' ? 100 : 12,
      kycStatus: 'approved' as const,
      totalEarned: role === 'admin' ? 0 : 18400,
      totalWithdrawn: role === 'admin' ? 0 : 13000
    };
    
    localStorage.setItem('noor_token', 'jwt_' + Date.now());
    localStorage.setItem('noor_user', JSON.stringify(user));
    setState({ token: 'jwt_' + Date.now(), user, isAuthenticated: true, loading: false });
    return user;
  };

  const register = async (data: any) => {
    const user = { ...data, id: 'u_' + Date.now(), balance: 0, currency: 'PKR', role: 'user', status: 'active', checkInStreak: 0, planStatus: 'none', kycStatus: 'pending', totalEarned: 0, totalWithdrawn: 0 };
    localStorage.setItem('noor_token', 'jwt_' + Date.now());
    localStorage.setItem('noor_user', JSON.stringify(user));
    setState({ token: 'jwt_' + Date.now(), user: user as User, isAuthenticated: true, loading: false });
  };

  const demoLogin = () => login('worker@noor.com', 'demo');
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
