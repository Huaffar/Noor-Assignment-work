import React from 'react';
import { Link } from 'react-router-dom';
import { CloudLightning, Globe, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/5 py-12 md:py-16">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-theme-primary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-theme-primary rounded-2xl flex items-center justify-center shadow-2xl">
                <CloudLightning className="w-7 h-7 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                Noor<span className="text-theme-primary">Official</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest leading-loose max-w-sm">
              The most reliable task network in Pakistan. Built for workers, powered by integrity. Turn your free time into monthly PKR salary.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Quick Links</h4>
              <div className="flex flex-col space-y-3 text-[10px] font-bold text-slate-500 uppercase">
                <Link to="/register" className="hover:text-theme-primary transition-colors">Get Started</Link>
                <Link to="/login" className="hover:text-theme-primary transition-colors">Worker Portal</Link>
                <Link to="/support" className="hover:text-theme-primary transition-colors">Support Hub</Link>
                <Link to="/upgrade" className="hover:text-theme-primary transition-colors">Revenue Plans</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Resources</h4>
              <div className="flex flex-col space-y-3 text-[10px] font-bold text-slate-500 uppercase">
                <a href="#" className="hover:text-theme-primary transition-colors">WhatsApp Community</a>
                <a href="#" className="hover:text-theme-primary transition-colors">System Rules</a>
                <Link to="/profile" className="hover:text-theme-primary transition-colors">My Identity</Link>
              </div>
            </div>
          </div>

          {/* Social / Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Connect With Us</h4>
            <div className="flex items-center space-x-3">
              <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-theme-primary transition-all border border-white/10 group">
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all border border-white/10 group">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="pt-2">
               <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Verified Pakistani Earning Hub</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-white/5 text-center">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} Noor Digital Network. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;