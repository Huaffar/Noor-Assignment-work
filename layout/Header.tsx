
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserType } from '../types';
import { LayoutDashboard, LogOut, User as UserIcon, Wallet, Zap } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pink-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-400 shadow-md transition-transform duration-500 group-hover:rotate-12">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tighter text-slate-900 leading-none">
              Noor<span className="text-pink-500">Official</span>
            </span>
          </div>
        </Link>

        <nav className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center px-3 py-1 rounded-lg bg-white border border-pink-100 shadow-sm">
                <Wallet className="w-3 h-3 mr-2 text-pink-400" />
                <span className="text-[10px] font-black text-slate-900">Rs. {user?.balance.toLocaleString()}</span>
              </div>
              
              <Link to="/dashboard" className="p-2 rounded-lg text-slate-400 hover:text-pink-500 hover:bg-white transition-all">
                <LayoutDashboard className="w-4.5 h-4.5" />
              </Link>
              
              <button 
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-white transition-all"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>

              <div onClick={() => navigate('/profile')} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-lg cursor-pointer active:scale-95 transition-transform">
                <UserIcon className="w-4 h-4" />
              </div>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-lg hover:bg-pink-500 active:scale-95 transition-all"
            >
              Launch App
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
