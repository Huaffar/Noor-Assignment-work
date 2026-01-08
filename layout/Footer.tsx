
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Noor<span className="text-rose-600">Official</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Pakistan's premium micro-task platform. Empowering thousands to earn daily through digital assignments and handwriting tasks.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li><Link to="/about" className="hover:text-rose-600 transition-colors">About Us</Link></li>
              <li><Link to="/upgrade" className="hover:text-rose-600 transition-colors">Pricing Plans</Link></li>
              <li><Link to="/support" className="hover:text-rose-600 transition-colors">How it Works</Link></li>
              <li><Link to="/support" className="hover:text-rose-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li><Link to="/terms" className="hover:text-rose-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-rose-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-rose-600 transition-colors">Payout Rules</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} Noor Official Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Designed for Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
