
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Sparkles, 
  Target, 
  Users, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  Zap,
  UserPlus,
  Rocket
} from 'lucide-react';

const UserSurvey: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const next = () => step < totalSteps ? setStep(s => s + 1) : onComplete();

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-600 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[340px] flex flex-col h-full relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <div className="flex space-x-1.5 flex-1 mr-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-white/10'}`} />
            ))}
          </div>
          <button 
            onClick={onComplete} 
            className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-rose-400 transition-colors flex items-center"
          >
            Skip <X className="w-2.5 h-2.5 ml-1" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-rose-500 border border-white/10 shadow-2xl">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">Welcome</h2>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Quick Setup</p>
                </div>
                
                <div className="grid gap-3">
                  {['WhatsApp Group', 'Friend Referral', 'Social Media', 'YouTube'].map(opt => (
                    <button 
                      key={opt} onClick={next}
                      className="w-full py-4 px-5 bg-white/5 border border-white/5 rounded-2xl font-black text-[10px] text-white/60 hover:bg-rose-600 hover:text-white transition-all text-left flex items-center justify-between group"
                    >
                      <span className="uppercase tracking-widest">{opt}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-rose-500 border border-white/10">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">Daily Goal</h2>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">How much do you want to earn?</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Pocket Money', val: 'Rs. 200/D', icon: Wallet },
                    { label: 'Steady Wage', val: 'Rs. 500/D', icon: TrendingUp },
                    { label: 'Extra Income', val: 'Rs. 1000/D', icon: Rocket },
                    { label: 'Passive Hub', val: 'Referrals', icon: Users }
                  ].map(opt => (
                    <button 
                      key={opt.label} onClick={next}
                      className="flex flex-col items-center p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-rose-600/20 hover:border-rose-500/50 transition-all group"
                    >
                      <opt.icon className="w-5 h-5 text-white/20 group-hover:text-rose-500 mb-3" />
                      <span className="font-black text-white text-[9px] uppercase tracking-widest">{opt.label}</span>
                      <span className="text-[7px] font-black text-rose-500 mt-1 uppercase opacity-60 tracking-tighter">{opt.val}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-rose-500 border border-white/10">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">Safety First</h2>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Our Rules</p>
                </div>
                
                <div className="bg-rose-600/10 border border-rose-500/20 p-5 rounded-3xl space-y-3">
                   <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase tracking-tight">
                     Assignments require <span className="text-rose-500 font-black">Clear Photos</span>. Duplicate work will result in account ban.
                   </p>
                </div>

                <button 
                  onClick={next}
                  className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all flex items-center justify-center group"
                >
                  I Understand <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="s4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-rose-600 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-[0_20px_50px_rgba(225,29,72,0.4)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-white leading-none tracking-tighter uppercase">Success</h2>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Account initialized successfully</p>
                </div>

                <button 
                  onClick={onComplete}
                  className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all flex items-center justify-center group"
                >
                  Go to Dashboard <ChevronRight className="w-4 h-4 ml-2 text-rose-600" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="pb-6 text-center">
           <p className="text-[6px] font-black text-white/20 uppercase tracking-[0.4em]">Noor Official verified setup</p>
        </div>
      </div>
    </div>
  );
};

export default UserSurvey;
