
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Gift, 
  Copy, 
  Check, 
  TrendingUp, 
  Share2, 
  ArrowUpRight,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Referrals: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [refData, setRefData] = useState({
    code: "NOOR-" + user?.id?.substring(0,5).toUpperCase(),
    link: "https://noorofficial.com/register?ref=" + user?.id,
    total: 12,
    active: 8,
    earnings: 2450
  });

  const referralList = [
    { id: '1', name: 'Zaid Ali', date: 'Oct 12', earned: 450, status: 'Active' },
    { id: '2', name: 'Sara Khan', date: 'Oct 14', earned: 120, status: 'Active' },
    { id: '3', name: 'Hamza Malik', date: 'Oct 18', earned: 0, status: 'Pending' },
    { id: '4', name: 'Ayesha Bibi', date: 'Oct 20', earned: 850, status: 'Active' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(refData.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Your Network</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Earnings Multiplier</p>
        </div>
        <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center space-x-2">
           <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
           <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">Partner</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Compact Link Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5"><UserPlus className="w-16 h-16" /></div>
          <h3 className="text-lg font-black text-gray-900 mb-4">Invite Friends</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Invite Code</p>
              <p className="text-sm font-black text-gray-900 tracking-tight">{refData.code}</p>
            </div>
            <div className="relative">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Referral Link</p>
              <div className="flex bg-rose-50 border border-rose-100 rounded-xl p-1.5 pl-3 items-center justify-between">
                <span className="text-[10px] font-bold text-rose-600 truncate mr-3">{refData.link}</span>
                <button 
                  onClick={handleCopy}
                  className="p-2.5 bg-rose-600 text-white rounded-lg shadow-md shadow-rose-200 active:scale-90 transition-transform"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-3.5 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center active:scale-95 transition-transform">
             <Share2 className="w-4 h-4 mr-2" /> Share on WhatsApp
          </button>
        </motion.div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="bg-rose-600 p-6 rounded-3xl text-white shadow-xl shadow-rose-200 flex flex-col justify-between">
            <TrendingUp className="w-6 h-6 mb-2 opacity-60" />
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Total Profit</p>
              <p className="text-xl font-black leading-none">Rs. {refData.earnings}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <Users className="w-6 h-6 mb-2 text-rose-600" />
            <div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Team</p>
              <p className="text-xl font-black text-gray-900 leading-none">{refData.active}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team List - Ultra Compact */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
           <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Network Hierarchy</h3>
           <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">
              Live Feed
           </div>
        </div>
        <div className="divide-y divide-gray-50">
          {referralList.map((ref) => (
            <div key={ref.id} className="px-6 py-3.5 flex items-center justify-between group active:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center font-black text-[10px] text-gray-400">
                   {ref.name[0]}
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-900 leading-none">{ref.name}</p>
                  <p className={`text-[8px] font-black uppercase tracking-tight mt-0.5 ${ref.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {ref.status} • {ref.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-gray-900">Rs. {ref.earned}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase">Share</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-gray-50/50 text-center">
           <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Scroll to load more</p>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
