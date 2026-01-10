import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserType } from '../types';
import { LayoutDashboard, LogOut, User as UserIcon, Wallet, Zap, CloudLightning } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 sky-glass">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-sky-600 shadow-xl shadow-sky-200 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105">
            <CloudLightning className="text-white w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
              NOOR<span className="text-sky-500 italic ml-0.5">OFFCL</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-400 uppercase leading-none mt-1">Verified Node</span>
          </div>
        </Link>

        <nav className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center px-4 py-2 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <Wallet className="w-4 h-4 mr-3 text-sky-500" />
                <span className="text-[11px] font-black text-slate-900">Rs. {user?.balance.toLocaleString()}</span>
              </div>
              
              <Link to="/dashboard" className="p-2.5 rounded-2xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-all active:scale-95">
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              
              <button 
                onClick={onLogout}
                className="p-2.5 rounded-2xl text-slate-400 hover:text-sky-700 hover:bg-sky-50 transition-all active:scale-95"
              >
                <LogOut className="w-5 h-5" />
              </button>

              <div onClick={() => navigate('/profile')} className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl cursor-pointer active:scale-90 transition-all border border-white/10 group">
                <UserIcon className="w-5 h-5 group-hover:text-sky-400 transition-colors" />
              </div>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-[1.2rem] shadow-xl hover:bg-sky-600 active:scale-95 transition-all"
            >
              Initiate Access
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;