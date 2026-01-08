
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Smartphone, 
  MessageSquare, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import PaymentMethods from './PaymentMethods';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payment' | 'system' | 'support'>('payment');
  const [isSaved, setIsSaved] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const tabs = [
    { id: 'payment', label: 'Cashout', icon: Smartphone },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'support', label: 'Support', icon: MessageSquare },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-20 space-y-4 px-1">
      <div className="px-1">
        <h1 className="text-xl font-black text-gray-900 leading-none">Master Control</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">System Overrides</p>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl w-full">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg font-black text-[10px] uppercase tracking-tight transition-all ${activeTab === tab.id ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}>
            <tab.icon className="w-3 h-3" /> <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === 'payment' && <PaymentMethods />}

            {activeTab === 'system' && (
              <form className="space-y-3">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <div><p className="text-[10px] font-black text-amber-900 leading-none">Maintenance</p><p className="text-[7px] font-bold text-amber-600 uppercase tracking-widest">Blocks activities</p></div>
                    </div>
                    <button type="button" onClick={() => setMaintenance(!maintenance)} className={`w-10 h-6 rounded-full p-1 transition-all ${maintenance ? 'bg-amber-600' : 'bg-gray-200'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${maintenance ? 'translate-x-4' : 'translate-x-0'}`} /></button>
                  </div>

                  <div className="space-y-3">
                    <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Min. Withdrawal (PKR)</label><input type="number" defaultValue="500" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-black outline-none focus:border-pink-400 text-sm" /></div>
                    <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Logo Label</label><input defaultValue="Noor Official" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-black outline-none focus:border-pink-400 text-sm" /></div>
                  </div>
                </div>
                <button type="button" className="w-full py-4 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200/50">Apply Node Config</button>
              </form>
            )}

            {activeTab === 'support' && (
              <form className="space-y-3">
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">WhatsApp Support</label><input placeholder="923XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black outline-none focus:border-pink-400 text-xs" /></div>
                    <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Official Email</label><input placeholder="support@mail.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black outline-none focus:border-pink-400 text-xs" /></div>
                 </div>
                 <button type="button" className="w-full py-4 bg-pink-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-pink-100">Commit Channels</button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminSettings;
