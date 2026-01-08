
import React from 'react';
import { Link } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';

const Footer: React.FC = () => {
  const { settings } = useSystem();
  return (
    <footer className="border-t transition-colors" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--theme-text)' }}>
                Noor<span style={{ color: 'var(--theme-primary)' }}>Official</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 max-w-sm leading-relaxed" style={{ color: 'var(--theme-text)' }}>
              {settings.siteName} - Pakistan's premium micro-task platform. Empowering thousands to earn daily through digital assignments and handwriting tasks.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50" style={{ color: 'var(--theme-text)' }}>Platform</h4>
            <ul className="space-y-2 text-sm font-bold opacity-80" style={{ color: 'var(--theme-text)' }}>
              <li><Link to="/about" className="hover:opacity-60 transition-colors">About Us</Link></li>
              <li><Link to="/upgrade" className="hover:opacity-60 transition-colors">Earning Plans</Link></li>
              <li><Link to="/support" className="hover:opacity-60 transition-colors">How it Works</Link></li>
              <li><Link to="/support" className="hover:opacity-60 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50" style={{ color: 'var(--theme-text)' }}>Legal</h4>
            <ul className="space-y-2 text-sm font-bold opacity-80" style={{ color: 'var(--theme-text)' }}>
              <li><Link to="/terms" className="hover:opacity-60 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:opacity-60 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:opacity-60 transition-colors">Payout Rules</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 border-black/5">
          <p className="text-xs font-medium opacity-40" style={{ color: 'var(--theme-text)' }}>
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--theme-text)' }}>Designed for Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
