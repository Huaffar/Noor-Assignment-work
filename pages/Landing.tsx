import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Zap,
  Star,
  Users,
  MessageCircle,
  CloudLightning,
  CheckCircle2,
  Target
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';
import { useAuth } from '../context/AuthContext';
import { reviews } from '../utils/mockData';
import { plansData, CORE_RULES } from '../utils/plansData';
import LivePayouts from '../components/LivePayouts';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // If authenticated, sync with workspace instantly
  useEffect(() => {
    if (isAuthenticated && user) {
      const target = user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-theme-bg overflow-x-hidden">
      <LivePayouts />
      
      {/* Public Home View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-10 space-y-10 sm:space-y-24">
        
        {/* Main Home Interface / Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8 themed-card p-5 sm:p-16 relative overflow-hidden flex flex-col justify-center min-h-[350px] lg:min-h-[550px]">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] themed-gradient rounded-full blur-[150px] -mr-48 -mt-48" />
            </div>
            
            <div className="relative z-10 max-w-2xl text-center sm:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="inline-flex items-center space-x-2 bg-theme-secondary px-3 py-1 rounded-full mb-4 sm:mb-8 border border-theme-primary/10 shadow-sm"
              >
                <div className="w-1.5 h-1.5 bg-theme-primary rounded-full animate-pulse" />
                <span className="text-[7px] sm:text-[10px] font-black text-theme-primary uppercase tracking-[0.2em] italic">Official Earning Hub Pakistan</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-3 sm:space-y-6"
                >
                  <h1 className="text-3xl sm:text-7xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                    {currentSlide === 0 ? <>Earn <span className="text-theme-primary">Monthly Salary</span> From Home</> : 
                     currentSlide === 1 ? <>Instant <span className="text-theme-primary">EasyPaisa</span> Payouts</> :
                     <>Join Our <span className="text-theme-primary">Verified</span> Worker Network</>}
                  </h1>
                  <p className="text-[10px] sm:text-xl text-gray-500 font-medium leading-relaxed max-w-lg mx-auto sm:mx-0">
                    Real assignments, real PKR earnings. Noor Official provides a secure platform for students and professionals in Pakistan to earn from home.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-8 sm:mt-14">
                <button 
                  onClick={() => navigate('/register')} 
                  className="flex-1 sm:flex-none px-8 py-4 sm:px-12 sm:py-5 themed-gradient text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center group transition-all active:scale-95"
                >
                  Join Today <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => navigate('/login')} 
                  className="flex-1 sm:flex-none px-8 py-4 sm:px-12 sm:py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-800 active:scale-95 flex items-center justify-center"
                >
                  Worker Login
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            <div className="bg-slate-950 rounded-[2.5rem] p-5 sm:p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/5 group col-span-2 sm:col-span-1">
               <div className="absolute top-0 right-0 w-24 h-24 bg-theme-primary/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                  <TrendingUp className="w-5 h-5 sm:w-8 sm:h-8 text-theme-primary mb-4 sm:mb-8" />
                  <p className="text-[7px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Network Payouts</p>
                  <h4 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">Rs. 8.4M+</h4>
               </div>
            </div>
            <div className="themed-card p-5 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-gray-100 group rounded-[2.5rem]">
               <Users className="w-5 h-5 sm:w-8 sm:h-8 text-theme-primary mb-4 sm:mb-8" />
               <div className="relative z-10">
                  <p className="text-[7px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Active Workers</p>
                  <h4 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">15,000+</h4>
               </div>
            </div>
          </div>
        </section>

        {/* Salary Plans - Home View */}
        <section className="space-y-8 sm:space-y-14">
           <div className="text-center space-y-3">
              <div className="inline-block px-3 py-1 bg-theme-secondary rounded-full text-[7px] sm:text-[9px] font-black text-theme-primary uppercase tracking-[0.2em] border border-theme-primary/10">Salary Tiers</div>
              <h2 className="text-2xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">Choose Your Earning Capacity</h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {plansData.map((plan) => (
                <motion.div 
                  key={plan.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group transition-all hover:shadow-2xl"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`} />
                  <div className="p-6 sm:p-10 flex-1 flex flex-col">
                    <div className="mb-6 sm:mb-8">
                       <h3 className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{plan.name} PACKAGE</h3>
                       <div className="flex items-baseline space-x-1.5">
                          <span className="text-[10px] sm:text-sm font-black text-slate-300">PKR</span>
                          <h4 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">{plan.investment.toLocaleString()}</h4>
                       </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-1">
                       {[
                         { label: "Daily Load", val: `${plan.dailyWork} Pages`, icon: Target },
                         { label: "Monthly Yield", val: `Rs. ${plan.monthlySalary.toLocaleString()}`, icon: TrendingUp },
                         { label: "Duration", val: "Life-Time", icon: ShieldCheck }
                       ].map((feat, i) => (
                         <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <div className="flex items-center space-x-2.5">
                               <feat.icon className="w-3.5 h-3.5 text-slate-300 group-hover:text-theme-primary transition-colors" />
                               <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide">{feat.label}</span>
                            </div>
                            <span className="text-[9px] sm:text-[11px] font-black text-slate-900 uppercase">{feat.val}</span>
                         </div>
                       ))}
                    </div>

                    <button 
                      onClick={() => navigate('/register')}
                      className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all hover:bg-theme-primary active:scale-95 shadow-xl flex items-center justify-center group"
                    >
                      Initialize Plan <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;