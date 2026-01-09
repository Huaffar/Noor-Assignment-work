
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-50 border-t border-pink-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-pink-400 flex items-center justify-center text-white font-black text-[10px]">N</div>
            <span className="text-sm font-black tracking-tighter text-slate-900">
              Noor<span className="text-pink-500">Official</span>
            </span>
          </div>
          <p className="text-[10px] font-black text-pink-300 uppercase tracking-widest">
            © {new Date().getFullYear()} Pakistan verified network
          </p>
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/support" className="hover:text-pink-500">Support</Link>
            <Link to="/upgrade" className="hover:text-pink-500">Plans</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
