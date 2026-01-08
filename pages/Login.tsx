
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login, demoLogin, adminDemoLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full"
      >
        <div className="text-center mb-6">
          <motion.div 
            initial={{ y: -5 }}
            animate={{ y: 0 }}
            className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200"
          >
            <span className="text-white text-2xl font-black">N</span>
          </motion.div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-widest">Login to your account</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all text-sm font-medium"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-rose-600 text-white font-black py-3 rounded-xl hover:bg-rose-700 transition-all flex items-center justify-center group shadow-lg shadow-rose-200 active:scale-95 disabled:opacity-50 text-sm"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
              {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-3 text-[9px] font-black text-gray-300 uppercase tracking-widest">Quick Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => demoLogin()}
              className="w-full bg-rose-50 text-rose-600 font-black py-2.5 rounded-xl hover:bg-rose-100 transition-all flex items-center justify-center border border-rose-100 text-[10px] uppercase tracking-widest"
            >
              <Zap className="mr-1.5 w-3 h-3 fill-rose-600" /> User
            </button>
            <button
              onClick={() => adminDemoLogin()}
              className="w-full bg-slate-900 text-white font-black py-2.5 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center border border-slate-800 text-[10px] uppercase tracking-widest"
            >
              <ShieldCheck className="mr-1.5 w-3 h-3 text-rose-500" /> Admin
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
          New? <Link to="/register" className="text-rose-600 font-black hover:underline ml-1">Join Noor Official</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
