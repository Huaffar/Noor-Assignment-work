import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Camera, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Palette, 
  Moon, 
  Sun,
  MapPin,
  Smartphone,
  Info,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';
import { updateProfile, changePassword } from '../../api/controllers/userController';
import { uploadFile } from '../../api/config/cloudinary';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { settings, setTheme } = useSystem();
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'appearance'>('personal');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setProfileData(prev => ({ ...prev, avatar: url }));
      await updateProfile(user?.id || 'demo', { avatar: url });
    } catch (err) {
      alert("System sync failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(user?.id || 'demo', profileData);
      alert("Account information updated.");
    } catch (err) {
      alert("Update failed.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pb-24 space-y-4 px-1 scale-[0.98] origin-top">
      {/* Identity Card with Prominent Balance */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
        <div className="relative mb-4 group">
          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-50 border-4 border-white shadow-xl relative">
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                <Loader2 className="w-6 h-6 animate-spin text-theme-primary" />
              </div>
            )}
            <img 
              src={profileData.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=f0f9ff&color=0ea5e9&bold=true`} 
              className="w-full h-full object-cover" 
              alt="Profile" 
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-2 bg-slate-950 text-white rounded-xl shadow-lg active:scale-90 transition-transform"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
        </div>
        
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{user?.name}</h2>
        
        <div className="mt-2 flex items-center space-x-2">
           <div className={`px-2 py-0.5 rounded-md border text-[7px] font-black uppercase ${user?.kycStatus === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
              {user?.kycStatus === 'approved' ? 'Verified Account' : 'Unverified Identity'}
           </div>
           <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest">{user?.email}</span>
        </div>

        {/* Prominent Balance Display */}
        <div className="mt-6 w-full px-6 py-4 bg-slate-950 rounded-2xl flex items-center justify-between shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 themed-gradient rounded-full blur-2xl opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity" />
           <div className="flex items-center space-x-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                 <Wallet className="w-5 h-5 text-theme-primary" />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Current Balance</p>
                 <p className="text-xl font-black text-white leading-none tracking-tighter">Rs. {(user?.balance || 0).toLocaleString()}</p>
              </div>
           </div>
           <button onClick={() => window.location.hash = '#/withdraw'} className="relative z-10 px-4 py-2 bg-white/10 text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-theme-primary transition-all">Withdraw</button>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-2xl mx-1 border border-gray-200">
         {[
           { id: 'personal', label: 'Identity', icon: User },
           { id: 'security', label: 'Security', icon: Lock },
           { id: 'appearance', label: 'Visuals', icon: Palette }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
               activeTab === tab.id ? 'bg-white text-theme-primary shadow-sm border border-gray-200' : 'text-gray-400'
             }`}
           >
             <tab.icon className="w-4 h-4" />
             <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
           </button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'personal' && (
          <motion.form 
            key="personal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleProfileUpdate}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5 mx-1"
          >
            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Legal Full Name</label>
              <input required value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 font-black text-xs outline-none focus:border-theme-primary shadow-inner" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">WhatsApp Hub</label>
              <div className="relative">
                 <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                 <input type="tel" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 font-black text-xs outline-none focus:border-theme-primary shadow-inner" placeholder="03XXXXXXXXX" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Permanent Address</label>
              <div className="relative">
                 <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                 <input value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 font-black text-xs outline-none focus:border-theme-primary shadow-inner" placeholder="City, Area" />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start space-x-3">
               <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
               <p className="text-[8px] font-bold text-blue-700 uppercase tracking-tight leading-relaxed">
                 Account data is used strictly for verification and secure fund disbursals.
               </p>
            </div>

            <button disabled={isUpdating} className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl flex items-center justify-center active:scale-95 transition-all">
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2 text-theme-primary" />}
              Commit Account Sync
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;