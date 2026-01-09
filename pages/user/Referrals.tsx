
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  ChevronDown, 
  User,
  Award,
  ArrowRight,
  Layers,
  Network,
  Info,
  Gift,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';
import { getReferralData } from '../../api/controllers/userController';

const AffiliateHub: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSystem();
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({ l1: true, l2: false, l3: false });

  useEffect(() => {
    getReferralData(user?.id || 'demo').then(setData);
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLevel = (lvl: string) => setExpandedLevels(prev => ({ ...prev, [lvl]: !prev[lvl] }));

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
       <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin" />
       <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Loading Team Data...</p>
    </div>
  );

  const stats = settings.referralStrategy;
  const levelConfig = [
    { id: 'l1', label: 'Direct Friends (L1)', count: data.levels.l1, rate: stats.l1, color: 'text-rose-600', bg: 'bg-rose-50', icon: User },
    { id: 'l2', label: 'Indirect Team (L2)', count: data.levels.l2, rate: stats.l2, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Network },
    { id: 'l3', label: 'Sub Team (L3)', count: data.levels.l3, rate: stats.l3, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Layers }
  ];

  return (
    <div className="max-w-xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] origin-top">
      {/* Header Info */}
      <div className="flex items-center justify-between px-3 pt-2">
        <div className="flex items-center space-x-2.5">
           <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-lg">
              <Share2 className="w-4 h-4 text-rose-500" />
           </div>
           <div>
              <p className="text-[6px] font-black uppercase tracking-[0.3em] leading-none mb-1 text-rose-600">Your Network</p>
              <h1 className="text-[13px] font-black text-gray-900 leading-none uppercase">Affiliate Dashboard</h1>
           </div>
        </div>
      </div>

      {/* Invite Area */}
      <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mx-2 space-y-4">
        <div className="flex items-center space-x-2 mb-1 px-1">
           <Gift className="w-4 h-4 text-rose-600" />
           <p className="text-[9px] font-black text-slate-900 uppercase">Share Your Link</p>
        </div>
        <div className="flex bg-gray-50 border border-gray-100 rounded-2xl p-1.5 items-center justify-between shadow-inner">
          <span className="text-[9px] font-bold text-gray-400 truncate px-3 flex-1">{data.referralLink}</span>
          <button onClick={handleCopy} className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all flex items-center space-x-1.5 ${copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-950 text-white active:scale-95'}`}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Join Noor Official and earn money daily: ' + data.referralLink)}`, '_blank')} className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center shadow-lg active:scale-95 transition-all group">
           <MessageCircle className="w-4.5 h-4.5 mr-2 group-hover:rotate-12 transition-transform" /> Share on WhatsApp
        </button>
      </div>

      {/* Earning Summary */}
      <div className="bg-slate-950 rounded-[2.2rem] p-6 text-white relative overflow-hidden shadow-2xl mx-2">
        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-600/15 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6 px-1">
            <div>
              <p className="text-[7px] font-black text-rose-500 uppercase tracking-[0.3em] mb-1">Total Team Commission</p>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-[10px] font-bold opacity-30">Rs.</span>
                <h2 className="text-3xl font-black tracking-tighter">{data.referralEarnings.toLocaleString()}</h2>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-rose-500 shadow-xl"><TrendingUp className="w-5 h-5" /></div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {levelConfig.map((lvl) => (
              <div key={lvl.id} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center group hover:bg-white/10 transition-colors">
                <p className="text-lg font-black text-white leading-none mb-1">{lvl.count}</p>
                <p className="text-[6px] font-black uppercase text-slate-500 leading-none mb-2 tracking-tighter">{lvl.label.split(' ')[0]} Members</p>
                <div className="h-px bg-white/5 w-full mb-2" />
                <p className={`text-[8px] font-black ${lvl.color.replace('text-', 'text-opacity-80 text-')}`}>+{lvl.rate}% Bonus</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Levels List */}
      <div className="px-2 space-y-2">
        <div className="flex items-center justify-between px-3 mb-1">
           <div className="flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">My Team Members</p>
           </div>
        </div>

        {levelConfig.map((lvl) => (
          <div key={lvl.id} className="bg-white rounded-[1.8rem] border border-gray-100 overflow-hidden shadow-sm">
            <button onClick={() => toggleLevel(lvl.id)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className={`w-9 h-9 rounded-xl ${lvl.bg} ${lvl.color} flex items-center justify-center shadow-inner group-hover:scale-95 transition-transform`}>
                   <lvl.icon className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{lvl.label}</p>
                  <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{lvl.count} People Joined</p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-500 ${expandedLevels[lvl.id] ? 'rotate-180 text-rose-500' : ''}`} />
            </button>
            
            <AnimatePresence>
              {expandedLevels[lvl.id] && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/30 border-t border-gray-50">
                  <div className="p-3.5 space-y-1.5">
                    {data.referralList.filter((r: any) => r.level === parseInt(lvl.id[1])).map((member: any) => (
                      <div key={member.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm group hover:border-rose-100 transition-all">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-black text-gray-300 text-[10px] uppercase shadow-inner shrink-0 group-hover:text-rose-500 transition-colors">{member.name[0]}</div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-900 uppercase leading-none mb-1 truncate max-w-[100px]">{member.name}</p>
                            <p className="text-[7px] font-bold text-gray-400 uppercase truncate">{member.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-emerald-600 leading-none">Rs. {member.earnings}</p>
                           <p className={`text-[6px] font-black uppercase mt-1 ${member.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>{member.status}</p>
                        </div>
                      </div>
                    ))}
                    {data.referralList.filter((r: any) => r.level === parseInt(lvl.id[1])).length === 0 && (
                      <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                         <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none">No team members yet</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Info Badge */}
      <div className="bg-rose-50 border border-rose-100 p-4 rounded-[1.8rem] flex items-start space-x-3 mx-2">
        <div className="p-2 bg-white rounded-xl shadow-sm"><Info className="w-4 h-4 text-rose-600" /></div>
        <div className="space-y-1">
           <p className="text-[10px] font-black text-rose-900 uppercase">Earning Rules</p>
           <p className="text-[8px] font-bold text-rose-600 leading-relaxed uppercase tracking-tight">
             You earn a bonus whenever your team members activate an earning plan. <span className="text-rose-900 font-black">Level 1</span> gives the most bonus, while <span className="text-rose-900 font-black">L2 & L3</span> provide extra passive income.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateHub;
