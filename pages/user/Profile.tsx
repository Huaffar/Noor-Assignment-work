
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Camera, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Save, 
  Loader2, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  ArrowRight,
  Palette,
  Moon,
  Sun
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
  const [showPass, setShowPass] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || ''
  });

  const [passData, setPassData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDarkMode = settings.activeThemeId === 'black';
  const kycActive = settings.modules.kycRequired;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setProfileData(prev => ({ ...prev, avatar: url }));
      await updateProfile(user?.id || 'demo', { avatar: url });
      alert("Avatar node synchronized.");
    } catch (err) {
      alert("Transmission failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(user?.id || 'demo', { name: profileData.name });
      alert("Identity synced.");
    } catch (err) {
      alert("Sync error.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) return alert("Keys mismatch.");
    setIsUpdating(true);
    try {
      await changePassword(user?.id || 'demo', passData);
      setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      alert("Key rotation complete.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'pink' : 'black');
  };

  return (
    <div className="max-w-sm mx-auto pb-24 space-y-2.5 px-1 scale-[0.96] origin-top">
      {/* Banner Section - Tiny Height */}
      <div className="relative h-16 rounded-[1.2rem] bg-slate-950 overflow-hidden shadow-lg border border-slate-800 mx-2">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-600 rounded-full blur-[60px]" />
        </div>
      </div>

      {/* Identity Hub - Shrunk */}
      <div className="relative -mt-10 flex flex-col items-center space-y-1 px-4">
        <div className="relative group">
          <div className="w-16 h-16 rounded-[1.2rem] bg-white p-0.5 shadow-xl border border-gray-100">
            <div className="w-full h-full rounded-[1rem] overflow-hidden bg-rose-50 relative">
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                  <Loader2 className="w-4 h-4 text-rose-600 animate-spin" />
                </div>
              ) : (
                <img 
                  src={profileData.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=fff1f2&color=e11d48&bold=true`} 
                  className="w-full h-full object-cover" 
                  alt="Profile" 
                />
              )}
            </div>
          </div>
          <button 
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-950 text-white rounded-lg flex items-center justify-center shadow-lg border-2 border-white active:scale-90"
          >
            <Camera className="w-3 h-3" />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
        </div>
        <div className="text-center">
          <h1 className="text-[13px] font-black text-gray-900 leading-none uppercase">{user?.name}</h1>
          {kycActive && (
            <div className={`inline-flex items-center space-x-1 mt-0.5 ${user?.kycStatus === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'} px-1.5 py-0.5 rounded-md border`}>
               {user?.kycStatus === 'approved' ? <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" /> : <Zap className="w-2.5 h-2.5 text-rose-500" />}
               <span className="text-[6px] font-black uppercase">{user?.kycStatus === 'approved' ? 'Identity Verified' : 'Unverified Hub'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini Tabs */}
      <div className="flex p-0.5 bg-gray-100 rounded-lg mx-2 border border-gray-200">
        {[
          { id: 'personal', label: 'Identity', icon: User },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'appearance', label: 'UI Mode', icon: Palette }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 relative flex items-center justify-center space-x-1 py-1 rounded-md transition-all ${
              activeTab === tab.id ? 'text-rose-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            {activeTab === tab.id && <motion.div layoutId="profileActiveTab" className="absolute inset-0 bg-white rounded-md" />}
            <tab.icon className="w-2.5 h-2.5 relative z-10" />
            <span className="text-[8px] font-black uppercase tracking-tight relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-2">
        <AnimatePresence mode="wait">
          {activeTab === 'personal' ? (
            <motion.div 
              key="personal" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white p-3.5 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-3"
            >
              <form onSubmit={handleProfileUpdate} className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-[6px] font-black text-gray-400 uppercase tracking-widest ml-1">Legal Name</label>
                  <input required value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 font-bold text-[10px] outline-none focus:border-rose-400" />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="space-y-1">
                    <label className="text-[6px] font-black text-gray-400 uppercase ml-1">Email Terminal</label>
                    <input disabled value={user?.email} className="w-full bg-gray-100 border border-gray-100 rounded-lg py-1.5 px-3 font-bold text-[8px] text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[6px] font-black text-gray-400 uppercase ml-1">WhatsApp Hub</label>
                    <input disabled value={user?.whatsapp} className="w-full bg-gray-100 border border-gray-100 rounded-lg py-1.5 px-3 font-bold text-[8px] text-gray-400" />
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-2.5 flex items-center justify-between shadow-lg">
                   <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-rose-600 rounded-lg flex items-center justify-center text-white"><Zap className="w-3 h-3" /></div>
                      <span className="text-[8px] font-black text-white uppercase">Status: Session Active</span>
                   </div>
                   <ChevronRight className="w-3 h-3 text-slate-700" />
                </div>

                <button disabled={isUpdating} className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-black text-[8px] uppercase tracking-widest shadow-md hover:bg-rose-600 transition-all flex items-center justify-center">
                  {isUpdating ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Save className="w-3 h-3 mr-1.5 text-rose-500" />}
                  Update Sync
                </button>
              </form>
            </motion.div>
          ) : activeTab === 'security' ? (
            <motion.div 
              key="security" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white p-3.5 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-3"
            >
              <div className="flex items-center space-x-2 border-b border-gray-50 pb-2">
                 <div className="p-1 bg-slate-950 text-rose-500 rounded-lg"><Lock className="w-3 h-3" /></div>
                 <h3 className="text-[9px] font-black text-gray-900 uppercase">Secure Hub</h3>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-[6px] font-black text-gray-400 uppercase ml-1">Current Pass</label>
                  <div className="relative">
                    <input 
                      required type={showPass ? "text" : "password"} value={passData.oldPassword}
                      onChange={e => setPassData({...passData, oldPassword: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 pl-3 pr-8 font-bold text-[10px] outline-none"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                      {showPass ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="space-y-1">
                    <label className="text-[6px] font-black text-gray-400 uppercase ml-1">New Key</label>
                    <input required type="password" value={passData.newPassword} onChange={e => setPassData({...passData, newPassword: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-3 font-bold text-[10px] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[6px] font-black text-gray-400 uppercase ml-1">Verify Key</label>
                    <input required type="password" value={passData.confirmPassword} onChange={e => setPassData({...passData, confirmPassword: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-3 font-bold text-[10px] outline-none" />
                  </div>
                </div>

                <button disabled={isUpdating} className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-black text-[8px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                  Rotate Keys
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="appearance" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white p-3.5 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-4"
            >
              <div className="flex items-center space-x-2 border-b border-gray-50 pb-2">
                 <div className="p-1 bg-slate-950 text-rose-500 rounded-lg"><Palette className="w-3 h-3" /></div>
                 <h3 className="text-[9px] font-black text-gray-900 uppercase">Aesthetics Hub</h3>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-rose-600'}`}>
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase">Dark Mode Sync</p>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Slate Noir Variant</p>
                  </div>
                </div>
                <button 
                  onClick={toggleDarkMode}
                  className={`w-10 h-6 rounded-full p-1 transition-all ${isDarkMode ? 'bg-rose-600' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: isDarkMode ? 16 : 0 }} 
                    className="w-4 h-4 bg-white rounded-full shadow-md" 
                  />
                </button>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <p className="text-[7px] font-bold text-rose-700 leading-relaxed uppercase tracking-tighter text-center">
                  Syncing UI variants across all active sessions...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 bg-gray-100/50 rounded-[1rem] text-center border border-gray-100 mx-4 opacity-60">
         <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest leading-tight">
            Identity audits are permanent. Session terminators active.
         </p>
      </div>
    </div>
  );
};

export default Profile;
