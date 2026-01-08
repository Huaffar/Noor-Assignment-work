
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Copy, 
  Check, 
  MessageCircle, 
  Share2, 
  QrCode, 
  ArrowRight,
  ShieldCheck,
  UserPlus,
  Info,
  ChevronRight,
  UserCheck,
  UserX,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getTeamStats } from '../../api/controllers/userController';

const Invite: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const referralLink = `${window.location.origin}/#/register?ref=${user?.id}`;

  useEffect(() => {
    if (user?.id) {
      getTeamStats(user.id).then(data => setStats(data));
    }
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Assalam-o-Alaikum! Join Noor Official and start earning daily by completing simple assignments. Use my link to register: ${referralLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!stats) return <div className="p-20 text-center font-black text-[9px] text-gray-400 uppercase tracking-[0.3em]">Syncing Network Stats...</div>;

  return (
    <div className="max-w-xl mx-auto pb-24 space-y-6 px-1">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-3 px-1">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-50 rounded-full blur-xl" />
          <Users className="w-4 h-4 text-rose-600 mb-3" />
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Team</h3>
          <p className="text-2xl font-black text-gray-900">{stats.totalDirects}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 p-5 rounded-[2rem] text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-600/20 rounded-full blur-xl" />
          <TrendingUp className="w-4 h-4 text-rose-500 mb-3" />
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Earnings</h3>
          <p className="text-2xl font-black text-white">Rs. {stats.totalCommission}</p>
        </motion.div>
      </div>

      {/* Referral Link Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600">
               <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black text-gray-900 uppercase">Your Invite Node</h3>
          </div>
          <button 
            onClick={() => setShowQR(!showQR)}
            className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:text-rose-600 transition-colors"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {showQR && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-center justify-center py-4 border-b border-gray-50"
            >
              <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-inner mb-3">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(referralLink)}`} 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Personal Scan Node</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-500 truncate mr-4">{referralLink}</p>
            <button 
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-gray-100 text-rose-600 shadow-sm active:scale-95'
              }`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <button 
            onClick={shareWhatsApp}
            className="w-full bg-[#25D366] text-white py-4 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-100 flex items-center justify-center group active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> Share on WhatsApp
          </button>
        </div>
      </motion.div>

      {/* Rules Info */}
      <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex items-start space-x-3">
        <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <p className="text-[9px] font-bold text-rose-700 uppercase leading-relaxed">
          Earn <span className="text-rose-900 font-black">10-15% Instant Commission</span> when your referrals upgrade their plans. Funds are added instantly to your worker balance.
        </p>
      </div>

      {/* Team List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2 mb-1">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Network Personnel</h2>
          </div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{stats.teamList.length} Nodes</span>
        </div>

        <div className="space-y-2">
          {stats.teamList.length > 0 ? (
            stats.teamList.map((member: any) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-100 transition-all"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-black text-xs">
                    {member.name[0]}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-900 leading-none mb-1 uppercase">{member.name}</h4>
                    <div className="flex items-center space-x-2">
                       <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                         {member.status}
                       </span>
                       <span className="text-[8px] font-bold text-gray-400 uppercase">Joined {member.joinedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-900 leading-none mb-1">Rs. {member.earnings}</p>
                  <p className="text-[7px] font-black text-rose-500 uppercase tracking-tighter">{member.plan}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white p-16 rounded-[2.5rem] text-center border border-dashed border-gray-100 space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-300">
                <UserPlus className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 mb-1">Isolation Mode</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your network is currently empty.</p>
              </div>
              <button 
                onClick={handleCopy}
                className="inline-flex items-center space-x-2 bg-rose-600 text-white px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-rose-200"
              >
                <span>Invite First Node</span>
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-gray-100/50 rounded-2xl p-4 flex items-center justify-center space-x-4 border border-gray-100">
        <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
           <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
           Verified Affiliate Program
        </div>
      </div>
    </div>
  );
};

export default Invite;
