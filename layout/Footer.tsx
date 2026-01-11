import React from 'react';
import { Link } from 'react-router-dom';
import { CloudLightning, Globe, MessageCircle, ArrowUpRight, ShieldCheck, Mail, BookOpen, Info, Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';

const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { settings } = useSystem();
  
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/5 pt-12 sm:pt-16 pb-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-theme-primary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center shadow-2xl">
                <CloudLightning className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                Noor<span className="text-theme-primary italic">Official</span>
              </span>
            </div>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-loose max-w-xs">
              The most reliable task network in Pakistan. Built for workers, powered by integrity. Join Pakistan's verified digital earning hub today.
            </p>
            <div className="flex items-center space-x-3">
              <a href={`https://wa.me/${settings.supportWhatsApp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all border border-white/10 group">
                <MessageCircle className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:support@noorofficial.com" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center hover:bg-theme-primary transition-all border border-white/10 group">
                <Mail className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] flex items-center">
              <Info className="w-3 h-3 mr-2 text-theme-primary" /> Platform Hub
            </h4>
            <div className="flex flex-col space-y-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              <Link to="/" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Home Interface
              </Link>
              <Link to="/about" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> About Platform
              </Link>
              <Link to="/instructions" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> System Rules
              </Link>
              <Link to="/support" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Knowledge Base
              </Link>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] flex items-center">
              <BookOpen className="w-3 h-3 mr-2 text-theme-primary" /> Public Data
            </h4>
            <div className="flex flex-col space-y-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hover:text-theme-primary transition-colors flex items-center">
                    <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Worker Sign In
                  </Link>
                  <Link to="/register" className="hover:text-theme-primary transition-colors flex items-center">
                    <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Open New Node
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="hover:text-theme-primary transition-colors flex items-center">
                    <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Main Dashboard
                  </Link>
                  <Link to="/wallet" className="hover:text-theme-primary transition-colors flex items-center">
                    <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Capital Ledger
                  </Link>
                </>
              )}
              <Link to="/upgrade" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Revenue Plans
              </Link>
            </div>
          </div>

          {/* Column 4: Governance */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] flex items-center">
              <Scale className="w-3 h-3 mr-2 text-theme-primary" /> Governance
            </h4>
            <div className="flex flex-col space-y-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              <Link to="/terms" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-theme-primary transition-colors flex items-center">
                <ArrowUpRight className="w-2 h-2 mr-2 opacity-30" /> Privacy Shield
              </Link>
              <div className="pt-2 flex items-center space-x-2 text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[7px] font-black uppercase">Secure Compliance Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] text-center md:text-left">
              © {new Date().getFullYear()} Noor Digital Network. Pakistan's Verified Earning Hub.
            </p>
            <div className="flex space-x-4 text-[7px] font-black text-slate-700 uppercase tracking-widest">
              <span>LATENCY: 12ms</span>
              <span className="text-emerald-900/40">SYSTEM: OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;