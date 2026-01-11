import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Zap, Eye, EyeOff, Loader2, ChevronLeft, User, CloudLightning, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';

const Login: React.FC = () => {
  const { user, login, demoLogin, adminDemoLogin, isAuthenticated, loading: authLoading } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !authLoading) {
      const target = user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (localLoading || authLoading) return;
    setLocalLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      alert("Invalid Security Node Credentials.");
      setLocalLoading(false);
    }
  };

  const handleQuickAccess = async (type: 'user' | 'admin') => {
    if (localLoading || authLoading) return;
    setLocalLoading(true);
    try {
      if (type === 'user') await demoLogin();
      else await adminDemoLogin();
    } catch (err) {
      setLocalLoading(false);
    }
  };

  const isLoading = localLoading || authLoading;

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] themed-gradient rounded-full blur-[120px]" />
      </div>
      
      <motion.button 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/')}
        className="mb-8 flex items-center space-x-2 text-theme-primary font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all z-10"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Return To Home</span>
      </motion.button>

      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[320px] bg-white p-8 rounded-[2.5rem] shadow-2xl relative z-10 border border-gray-100"
      >
        <div className="absolute top-0 left-0 w-full h-1 themed-gradient rounded-t-full" />
        <div className="text-center mb-8">
          <div className="w-16 h-16 themed-gradient rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl">
            <CloudLightning className="text-white w-8 h-8 fill-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tighter uppercase leading-none">Worker Login</h2>
          <p className="text-[9px] text-gray-400 mt-2.5 font-bold uppercase tracking-widest">System Node Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Node</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-3 text-xs font-bold outline-none focus:border-theme-primary shadow-inner transition-all" placeholder="Enter ID..." />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Pass</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-11 text-xs font-bold outline-none focus:border-theme-primary shadow-inner transition-all" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-theme-primary">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button disabled={isLoading} className="w-full py-4 themed-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Enter Portal <ArrowRight className="ml-2 w-4 h-4" /></>}
          </button>
        </form>

        {settings?.modules?.demoLogin && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center mb-4">Express Entry Nodes</p>
            <div className="grid grid-cols-2 gap-3">
               <button onClick={() => handleQuickAccess('user')} disabled={isLoading} className="py-3.5 bg-gray-50 text-slate-900 font-black rounded-xl text-[9px] uppercase tracking-widest border border-gray-100 flex flex-col items-center justify-center active:scale-95 transition-all">
                 <Zap className="w-4 h-4 mb-1 text-theme-primary" /> Worker Node
               </button>
               <button onClick={() => handleQuickAccess('admin')} disabled={isLoading} className="py-3.5 bg-slate-950 text-white font-black rounded-xl text-[9px] uppercase tracking-widest border border-white/5 flex flex-col items-center justify-center active:scale-95 transition-all">
                 <Shield className="w-4 h-4 mb-1 text-theme-primary" /> Admin Node
               </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;