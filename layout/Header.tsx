
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserType } from '../types';
import { LayoutDashboard, LogOut, User as UserIcon, Wallet } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors" style={{ backgroundColor: 'var(--theme-bg)', borderBottom: '1px solid var(--theme-primary)', opacity: 0.98 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block" style={{ color: 'var(--theme-text)' }}>
            Noor<span style={{ color: 'var(--theme-primary)' }}>Official</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center px-3 py-1 rounded-full border" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
                <Wallet className="w-4 h-4 mr-2" style={{ color: 'var(--theme-primary)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>Rs. {user?.balance.toFixed(2)}</span>
              </div>
              <Link to="/dashboard" className="p-2 transition-colors hover:opacity-70" style={{ color: 'var(--theme-text)' }}>
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <button 
                onClick={onLogout}
                className="p-2 transition-colors hover:opacity-70"
                style={{ color: 'var(--theme-text)' }}
              >
                <LogOut className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
                <UserIcon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm font-medium hover:opacity-70 px-3 py-2 transition-colors" style={{ color: 'var(--theme-text)' }}>Home</Link>
              <button 
                onClick={() => navigate('/login')}
                className="text-white text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-md active:scale-95"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                Sign In
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
