
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const MyPlan: React.FC = () => {
  const navigate = useNavigate();
  const currentPlan = {
    name: 'Student Bundle',
    level: 1,
    status: 'Active',
    expiry: 'Dec 12, 2023',
    daysLeft: 22,
    totalDays: 30,
    dailyLimit: 5,
    commission: 5
  };

  const progress = (currentPlan.daysLeft / currentPlan.totalDays) * 100;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900">Membership</h1>
        <p className="text-gray-500 font-medium">Verify your current earning power and validity.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Main Plan Card */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden h-full flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8">
              <Sparkles className="w-8 h-8 text-rose-100" />
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{currentPlan.name}</h2>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    {currentPlan.status}
                  </span>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-gray-400 uppercase tracking-widest">Daily Operations</span>
                  <span className="text-gray-900">{currentPlan.dailyLimit} Tasks / Day</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-gray-400 uppercase tracking-widest">Referral Bonus</span>
                  <span className="text-emerald-600">+{currentPlan.commission}% Earnings</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-3 text-xs font-black uppercase tracking-widest">
                <span className="text-gray-400 flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" /> Plan Validity</span>
                <span className="text-rose-600">{currentPlan.daysLeft} Days Remaining</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-rose-600 rounded-full"
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-center mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expires on {currentPlan.expiry}</p>
            </div>
          </motion.div>
        </div>

        {/* Upgrade Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-rose-600/20 transition-colors" />
            <TrendingUp className="text-rose-500 w-10 h-10 mb-6" />
            <h3 className="text-2xl font-black mb-2">Boost Earnings</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
              Upgrade to the Gold Package today and increase your daily task limit by <span className="text-white font-black">300%</span>.
            </p>
            <button 
              onClick={() => navigate('/dashboard')} // Link to upgrade marketplace in real app
              className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center group/btn"
            >
              Check Upgrades <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="font-black text-gray-900 mb-4 flex items-center">
              <Zap className="w-4 h-4 text-rose-600 mr-2" /> Recent Perks
            </h4>
            <div className="space-y-4">
              {[
                'Instant Withdrawals Enabled',
                'Priority Task Review',
                'Referral Commission (5%)'
              ].map((p, i) => (
                <div key={i} className="flex items-center text-xs font-bold text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
