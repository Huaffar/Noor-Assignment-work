
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Smartphone, 
  Palette, 
  Save, 
  CheckCircle2, 
  Moon,
  Sun,
  Edit2,
  X,
  Camera,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'payout' | 'appearance'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    whatsapp: user?.whatsapp || '',
    password: ''
  });

  const tabs = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'payout', label: 'Payouts', icon: Smartphone },
    { id: 'appearance', label: 'Theme', icon: Palette },
  ];

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-4 px-1">
      <div className="px-1 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Settings</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Environment Config</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsEditing(false); }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight transition-all flex items-center space-x-1 ${
                activeTab === tab.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        {activeTab === 'profile' && (
          <div className="absolute top-5 right-5 z-10">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center ${
                isEditing ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400 hover:text-rose-600'
              }`}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
          </div>
        )}

        <form onSubmit={handleCommit} className="space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Overview Card */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="relative group">
                  <div className="w-16 h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-rose-200">
                    {user?.name?.[0].toUpperCase()}
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 bg-slate-900/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                   <h3 className="text-sm font-black text-gray-900 leading-none mb-1">{user?.name}</h3>
                   <p className="text-[10px] font-black text-rose-600/60 uppercase tracking-widest">{user?.role === 'admin' ? 'Strategic Administrator' : 'Verified Worker'}</p>
                   <p className="text-[8px] font-bold text-gray-400 mt-0.5 uppercase">Joined: Oct 2023</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Display Name</label>
                  <input 
                    disabled={!isEditing}
                    className={`w-full border rounded-xl p-3 font-bold text-sm outline-none transition-all ${
                      isEditing ? 'bg-white border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-600' : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`} 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">WhatsApp Primary</label>
                  <input 
                    disabled={!isEditing}
                    className={`w-full border rounded-xl p-3 font-bold text-sm outline-none transition-all ${
                      isEditing ? 'bg-white border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-600' : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`} 
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
                {isEditing && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">New Password (Optional)</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white border border-rose-200 rounded-xl p-3 font-bold text-sm outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-600 transition-all" />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payout' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[9px] font-black text-emerald-600 uppercase tracking-tight">
                 Your funds will be credited to these accounts during withdrawal.
              </div>
              <div>
                <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">EasyPaisa</label>
                <input placeholder="03XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">JazzCash</label>
                <input placeholder="03XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-sm outline-none" />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {darkMode ? <Moon className="w-4 h-4 text-gray-900" /> : <Sun className="w-4 h-4 text-rose-600" />}
                  </div>
                  <p className="text-xs font-black text-gray-900">Adaptive UI (Beta)</p>
                </div>
                <button type="button" onClick={() => setDarkMode(!darkMode)} className={`w-10 h-6 rounded-full p-1 transition-all ${darkMode ? 'bg-rose-600' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          )}

          {(isEditing || activeTab !== 'profile') && (
            <button 
              type="submit" 
              disabled={isSaving}
              className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center ${
                isSaved ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-rose-600 shadow-xl shadow-slate-200/50'
              }`}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
              {!isSaving && !isSaved && (activeTab === 'profile' ? "Save Profile" : "Commit Changes")}
              {isSaved && !isSaving && "Node Synchronised"}
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Settings;
