
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Added missing Info import to resolve compilation error on line 123
import { Send, Users, ShieldAlert, Loader2, CheckCircle2, MessageSquare, Target, Info } from 'lucide-react';
import { broadcastAnnouncement } from '../../api/controllers/notificationController';
import { useAuth } from '../../context/AuthContext';

const SendAlert: React.FC = () => {
  const { user } = useAuth();
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetGroup: 'all',
    type: 'info'
  });

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);
    await broadcastAnnouncement(user?.id || 'admin', formData);
    setIsBroadcasting(false);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      setFormData({ title: '', message: '', targetGroup: 'all', type: 'info' });
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-4 px-1">
      <div className="px-1">
        <h1 className="text-xl font-black text-gray-900 leading-none uppercase tracking-tight">Signal Broadcast</h1>
        <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Personnel Alert Node</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50 bg-rose-50/20">
           <div className="flex items-center space-x-2 text-rose-600">
             <ShieldAlert className="w-4 h-4" />
             <h3 className="text-[10px] font-black uppercase tracking-widest">Security Protocol</h3>
           </div>
           <p className="text-[9px] text-rose-700 font-medium mt-1 uppercase">Broadcasting sends real-time pulses to all active network nodes. Use with precision.</p>
        </div>

        <form onSubmit={handleBroadcast} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Alert Target</label>
              <div className="relative">
                <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <select 
                  value={formData.targetGroup}
                  onChange={e => setFormData({...formData, targetGroup: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-3 font-black text-[10px] uppercase outline-none focus:border-rose-400"
                >
                  <option value="all">Global Node</option>
                  <option value="paid">Active Investors</option>
                  <option value="free">Standard Workers</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Signal Type</label>
              <div className="relative">
                <Target className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-3 font-black text-[10px] uppercase outline-none focus:border-rose-400"
                >
                  <option value="info">Information</option>
                  <option value="warning">Critical</option>
                  <option value="success">Reward</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Headline</label>
            <input 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400"
              placeholder="e.g. Server Maintenance Protocol"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Payload</label>
            <textarea 
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-bold text-xs outline-none focus:border-rose-400 h-32 resize-none"
              placeholder="Enter message text here..."
            />
          </div>

          <button 
            disabled={isBroadcasting || isDone}
            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center ${
              isDone ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-rose-600'
            } text-white`}
          >
            {isBroadcasting ? <Loader2 className="w-4 h-4 animate-spin" /> : isDone ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
            {isBroadcasting ? "Transmitting..." : isDone ? "Signals Deployed" : "Initiate Broadcast"}
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="px-1 mt-6">
        <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3">Live Preview Node</h3>
        <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200 opacity-60 grayscale scale-95 origin-top">
           <div className="p-3.5 bg-white rounded-xl shadow-sm flex items-start space-x-3 border border-gray-100">
             <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
               formData.type === 'success' ? 'bg-emerald-50 text-emerald-600' : formData.type === 'warning' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
             }`}>
               <Info className="w-4 h-4" />
             </div>
             <div>
               <h4 className="text-[10px] font-black text-gray-900 leading-none mb-1 uppercase">{formData.title || 'Signal Headline'}</h4>
               <p className="text-[9px] font-medium text-gray-500 leading-tight">{formData.message || 'Payload content will appear here...'}</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;
