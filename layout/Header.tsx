
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
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
            Noor<span className="text-rose-600">Official</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                <Wallet className="w-4 h-4 text-rose-600 mr-2" />
                <span className="text-sm font-semibold text-rose-700">${user?.balance.toFixed(2)}</span>
              </div>
              <Link to="/dashboard" className="p-2 text-gray-600 hover:text-rose-600 transition-colors">
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200">
                <UserIcon className="w-4 h-4 text-rose-600" />
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-rose-600 px-3 py-2 transition-colors">Home</Link>
              <button 
                onClick={() => navigate('/login')}
                className="bg-rose-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-rose-700 transition-all shadow-md shadow-rose-200"
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
