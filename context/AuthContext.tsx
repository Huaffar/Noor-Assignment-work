
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
    // Fast boot synchronization
    const initAuth = () => {
      const token = localStorage.getItem('noor_token');
      const userStr = localStorage.getItem('noor_user');
      
      if (token && userStr && userStr !== "undefined") {
        try {
          const userData = JSON.parse(userStr);
          setState({
            token,
            user: userData,
            isAuthenticated: true,
            loading: false,
          });
          return;
        } catch (err) {
          localStorage.removeItem('noor_token');
          localStorage.removeItem('noor_user');
        }
      }
      setState(prev => ({ ...prev, loading: false }));
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    // High-speed auth simulation
    const role = (email === 'admin@noorofficial.com' || email.includes('admin')) ? 'admin' : 'user';
    
    const user: User = {
      id: role === 'admin' ? 'admin_root' : 'u_123',
      name: email.split('@')[0],
      email,
      whatsapp: '03001234567',
      balance: role === 'admin' ? 999999 : 500,
      currency: 'PKR',
      completedTasks: role === 'admin' ? 0 : 2,
      referralCount: role === 'admin' ? 50 : 0,
      role: role as 'admin' | 'user',
      status: 'active' as const,
      checkInStreak: 0,
      planStatus: role === 'admin' ? 'active' : 'none',
      currentPlan: role === 'admin' ? 'System Admin' : 'None',
      dailyLimit: role === 'admin' ? 100 : 0,
      kycStatus: 'pending' as const,
      totalEarned: role === 'admin' ? 0 : 500,
      totalWithdrawn: 0
    };
    
    const token = 'jwt_' + Math.random();
    localStorage.setItem('noor_token', token);
    localStorage.setItem('noor_user', JSON.stringify(user));
    
    setState({
      token,
      user,
      isAuthenticated: true,
      loading: false,
    });

    return user;
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
        status: 'active' as const,
        checkInStreak: 0,
        planStatus: 'none' as const,
        dailyLimit: 0,
        kycStatus: 'pending' as const,
        totalEarned: 0,
        totalWithdrawn: 0
      }
    };
    
    localStorage.setItem('noor_token', response.token);
    localStorage.setItem('noor_user', JSON.stringify(response.user));
    
    setState({
      token: response.token,
      user: response.user as User,
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
      status: 'active',
      checkInStreak: 3,
      planStatus: 'active',
      currentPlan: 'Gold Package',
      dailyLimit: 8,
      kycStatus: 'approved' as const,
      totalEarned: 8450,
      totalWithdrawn: 5700
    };
    localStorage.setItem('noor_token', 'demo_token');
    localStorage.setItem('noor_user', JSON.stringify(demoUser));
    setState({ token: 'demo_token', user: demoUser, isAuthenticated: true, loading: false });
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
      status: 'active',
      checkInStreak: 0,
      planStatus: 'active',
      currentPlan: 'System Root',
      dailyLimit: 100,
      kycStatus: 'approved' as const,
      totalEarned: 0,
      totalWithdrawn: 0
    };
    localStorage.setItem('noor_token', 'admin_token');
    localStorage.setItem('noor_user', JSON.stringify(adminUser));
    setState({ token: 'admin_token', user: adminUser, isAuthenticated: true, loading: false });
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
