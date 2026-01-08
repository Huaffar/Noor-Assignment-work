
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Building, 
  CreditCard, 
  Percent, 
  Image as ImageIcon,
  Save,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
  Upload,
  AlertTriangle,
  Smartphone,
  SmartphoneNfc,
  ChevronRight,
  Info,
  Palette,
  Check,
  Eye,
  Type
} from 'lucide-react';
import { getSettings, updateSettings } from '../../api/controllers/settingsController';
import { useAuth } from '../../context/AuthContext';

const ToggleSwitch = ({ enabled, onChange, label, sublabel, danger = false }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:border-pink-200">
    <div className="space-y-0.5">
      <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{label}</p>
      {sublabel && <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{sublabel}</p>}
    </div>
    <button 
      type="button"
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative ${
        enabled 
          ? danger ? 'bg-rose-600' : 'bg-emerald-500' 
          : 'bg-gray-200'
      }`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

const InputGroup = ({ label, value, onChange, placeholder, type = "text", helper }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input 
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-sm outline-none focus:ring-4 focus:ring-pink-500/5 focus:border-pink-400 transition-all"
      />
      {type === "color" && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white shadow-sm pointer-events-none" style={{ backgroundColor: value }} />
      )}
    </div>
    {helper && <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest ml-1">{helper}</p>}
  </div>
);

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    getSettings().then(data => {
      setConfig(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateSettings(user?.id || 'root', config);
    if (res.success) {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const tabs = [
    { id: 'general', label: 'Identity', icon: Globe },
    { id: 'company', label: 'Corporate', icon: Building },
    { id: 'payment', label: 'Channels', icon: CreditCard },
    { id: 'finance', label: 'Financials', icon: Percent },
    { id: 'appearance', label: 'Landing', icon: ImageIcon },
    { id: 'themes', label: 'Site Themes', icon: Palette },
  ];

  if (isLoading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-32 space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">{config.general.siteName} Hub</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Platform Engine Configuration</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-2xl border border-slate-800">
          <Info className="w-4 h-4 text-rose-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">v3.0 Core Synchronizer</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <nav className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-rose-600 text-white shadow-xl shadow-rose-900/10' 
                  : 'bg-white text-gray-400 hover:bg-pink-50 hover:text-rose-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <tab.icon className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
          ))}
        </nav>

        {/* Dynamic Content Area */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              {/* TAB 1: IDENTITY */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup 
                      label="Platform Title" 
                      value={config.general.siteName} 
                      onChange={(v: string) => setConfig({...config, general: {...config.general, siteName: v}})} 
                      placeholder="e.g. Noor Earning Platform"
                    />
                    <InputGroup 
                      label="Copyright Text" 
                      value={config.general.copyrightText} 
                      onChange={(v: string) => setConfig({...config, general: {...config.general, copyrightText: v}})} 
                      placeholder="© 2024 Your Company"
                    />
                  </div>
                  <InputGroup 
                    label="Footer Brand Text" 
                    value={config.general.footerText} 
                    onChange={(v: string) => setConfig({...config, general: {...config.general, footerText: v}})} 
                    placeholder="Brief description for the footer..."
                  />

                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-pink-200 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 p-2 flex items-center justify-center shadow-inner">
                        <img src={config.general.logoUrl} className="max-w-full max-h-full object-contain" alt="Logo" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1.5">Platform Logo</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Preferred Size: 400x120px</p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-rose-600 hover:text-white transition-all">
                      <Upload className="w-4 h-4" /> <span>Update Asset</span>
                    </button>
                  </div>

                  <div className="pt-4 space-y-3">
                    <ToggleSwitch 
                      label="Global Maintenance Lock" 
                      sublabel="Restricts user access platform-wide"
                      enabled={config.modules.isMaintenanceMode}
                      onChange={(v: boolean) => setConfig({...config, modules: {...config.modules, isMaintenanceMode: v}})}
                      danger
                    />
                    <ToggleSwitch 
                      label="New Node Registrations" 
                      sublabel="Allow or block new account creations"
                      enabled={config.modules.allowRegistrations}
                      onChange={(v: boolean) => setConfig({...config, modules: {...config.modules, allowRegistrations: v}})}
                    />
                  </div>
                </div>
              )}

              {/* TAB: CORPORATE */}
              {activeTab === 'company' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup 
                      label="WhatsApp HQ Node" 
                      value={config.company.whatsappNumber} 
                      onChange={(v: string) => setConfig({...config, company: {...config.company, whatsappNumber: v}})} 
                      helper="Format: 923001234567"
                    />
                    <InputGroup 
                      label="Official Support Email" 
                      value={config.company.supportEmail} 
                      onChange={(v: string) => setConfig({...config, company: {...config.company, supportEmail: v}})} 
                      placeholder="support@domain.com"
                    />
                  </div>
                  <InputGroup 
                    label="Corporate Address" 
                    value={config.company.address} 
                    onChange={(v: string) => setConfig({...config, company: {...config.company, address: v}})} 
                    placeholder="Lahore, Pakistan"
                  />

                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Social Integration</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup 
                        label="Facebook" 
                        value={config.socials.facebook} 
                        onChange={(v: string) => setConfig({...config, socials: {...config.socials, facebook: v}})} 
                      />
                      <InputGroup 
                        label="Instagram" 
                        value={config.socials.instagram} 
                        onChange={(v: string) => setConfig({...config, socials: {...config.socials, instagram: v}})} 
                      />
                      <InputGroup 
                        label="YouTube" 
                        value={config.socials.youtube} 
                        onChange={(v: string) => setConfig({...config, socials: {...config.socials, youtube: v}})} 
                      />
                      <InputGroup 
                        label="Telegram" 
                        value={config.socials.telegram} 
                        onChange={(v: string) => setConfig({...config, socials: {...config.socials, telegram: v}})} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PAYMENT CHANNELS */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                   <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start space-x-4">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                      <p className="text-xs font-bold text-amber-800 leading-relaxed uppercase tracking-tight">
                        Critical: These details are visible to all users during upgrade. Verification depends on these numbers.
                      </p>
                   </div>

                   <div className="space-y-4">
                      {config.finance.paymentMethods.map((method: any, mIdx: number) => (
                        <div key={mIdx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 relative group overflow-hidden">
                           <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-600" />
                           <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-3">
                                 {method.provider === 'EasyPaisa' ? <Smartphone className="text-emerald-500 w-5 h-5" /> : <SmartphoneNfc className="text-rose-500 w-5 h-5" />}
                                 <h4 className="text-sm font-black text-gray-900 uppercase">{method.provider} Gateway</h4>
                              </div>
                              <button 
                                onClick={() => {
                                  const updated = config.finance.paymentMethods.filter((_: any, i: number) => i !== mIdx);
                                  setConfig({...config, finance: {...config.finance, paymentMethods: updated}});
                                }}
                                className="p-2 text-gray-300 hover:text-rose-600 transition-colors"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                           <div className="grid md:grid-cols-2 gap-4">
                              <InputGroup 
                                label="Account Title" 
                                value={method.title} 
                                onChange={(v: string) => {
                                  const updated = [...config.finance.paymentMethods];
                                  updated[mIdx].title = v;
                                  setConfig({...config, finance: {...config.finance, paymentMethods: updated}});
                                }}
                              />
                              <InputGroup 
                                label="Account Number" 
                                value={method.number} 
                                onChange={(v: string) => {
                                  const updated = [...config.finance.paymentMethods];
                                  updated[mIdx].number = v;
                                  setConfig({...config, finance: {...config.finance, paymentMethods: updated}});
                                }}
                              />
                           </div>
                        </div>
                      ))}

                      <button 
                        onClick={() => {
                          const updated = [...config.finance.paymentMethods, { provider: 'EasyPaisa', number: '', title: '' }];
                          setConfig({...config, finance: {...config.finance, paymentMethods: updated}});
                        }}
                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-black text-[10px] uppercase tracking-widest hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center space-x-2"
                      >
                         <Plus className="w-4 h-4" /> <span>Add Financial Gateway</span>
                      </button>
                   </div>
                </div>
              )}

              {/* TAB: FINANCIALS */}
              {activeTab === 'finance' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                        <Percent className="w-5 h-5" />
                      </div>
                      <InputGroup 
                        label="Network Multiplier (%)" 
                        type="number"
                        value={config.finance.referralBonusPercentage} 
                        onChange={(v: number) => setConfig({...config, finance: {...config.finance, referralBonusPercentage: Number(v)}})} 
                        helper="Earnings share for network growth"
                      />
                    </div>

                    <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-rose-500 mb-4">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <InputGroup 
                        label="Liquidity Floor (PKR)" 
                        type="number"
                        value={config.finance.minWithdrawalLimit} 
                        onChange={(v: number) => setConfig({...config, finance: {...config.finance, minWithdrawalLimit: Number(v)}})} 
                        helper="Minimum balance required for payout"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <Globe className="w-5 h-5 text-gray-400" />
                       <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Base Asset Unit</h4>
                    </div>
                    <select 
                      value={config.finance.currency}
                      onChange={e => setConfig({...config, finance: {...config.finance, currency: e.target.value}})}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-black text-xs uppercase outline-none focus:border-rose-600"
                    >
                      <option>PKR</option>
                      <option>USD</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB: SITE THEMES ENGINE */}
              {activeTab === 'themes' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.appearance.themes.map((theme: any) => (
                      <motion.div 
                        key={theme.id}
                        onClick={() => setConfig({...config, appearance: {...config.appearance, activeThemeId: theme.id}})}
                        className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all relative group overflow-hidden ${
                          config.appearance.activeThemeId === theme.id 
                            ? 'border-rose-600 bg-white shadow-xl' 
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: theme.primary, color: theme.bg }}>
                            <Palette className="w-5 h-5" />
                          </div>
                          {config.appearance.activeThemeId === theme.id && (
                            <div className="bg-rose-600 text-white p-1 rounded-full">
                               <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">{theme.name}</h4>
                        <div className="flex items-center space-x-2">
                           <div className="flex -space-x-1.5">
                              <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.primary }} />
                              <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.text }} />
                              <div className="w-4 h-4 rounded-full border border-white shadow-inner" style={{ backgroundColor: theme.bg }} />
                           </div>
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Color Matrix</span>
                        </div>

                        {/* Visual Preview Badge */}
                        <div className="mt-4 p-2.5 rounded-xl border border-gray-100 flex items-center justify-center space-x-2" style={{ backgroundColor: theme.bg }}>
                           <Type className="w-3 h-3" style={{ color: theme.primary }} />
                           <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.text }}>Preview Text</span>
                        </div>

                        {theme.id === config.appearance.activeThemeId && (
                           <div className="absolute top-0 right-0 bg-rose-600 text-white px-3 py-1 rounded-bl-xl text-[7px] font-black uppercase tracking-widest">
                             Live
                           </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Theme Deep Customizer */}
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-sm font-black uppercase tracking-[0.2em] text-rose-500">Active Theme Tuner</h3>
                       <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                          <Eye className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-[10px] font-black uppercase">Live Calibration</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-1.5">
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Action</label>
                          <input 
                            type="color" 
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl cursor-pointer p-1"
                            value={config.appearance.themes.find((t: any) => t.id === config.appearance.activeThemeId)?.primary}
                            onChange={(e) => {
                               const updatedThemes = config.appearance.themes.map((t: any) => 
                                 t.id === config.appearance.activeThemeId ? {...t, primary: e.target.value} : t
                               );
                               setConfig({...config, appearance: {...config.appearance, themes: updatedThemes}});
                            }}
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Typography</label>
                          <input 
                            type="color" 
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl cursor-pointer p-1"
                            value={config.appearance.themes.find((t: any) => t.id === config.appearance.activeThemeId)?.text}
                            onChange={(e) => {
                               const updatedThemes = config.appearance.themes.map((t: any) => 
                                 t.id === config.appearance.activeThemeId ? {...t, text: e.target.value} : t
                               );
                               setConfig({...config, appearance: {...config.appearance, themes: updatedThemes}});
                            }}
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Background Canvas</label>
                          <input 
                            type="color" 
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl cursor-pointer p-1"
                            value={config.appearance.themes.find((t: any) => t.id === config.appearance.activeThemeId)?.bg}
                            onChange={(e) => {
                               const updatedThemes = config.appearance.themes.map((t: any) => 
                                 t.id === config.appearance.activeThemeId ? {...t, bg: e.target.value} : t
                               );
                               setConfig({...config, appearance: {...config.appearance, themes: updatedThemes}});
                            }}
                          />
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: LANDING MEDIA */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Hero Media Repository</h3>
                     <button 
                       onClick={() => {
                         const updated = [...config.appearance.heroImages, ''];
                         setConfig({...config, appearance: {...config.appearance, heroImages: updated}});
                       }}
                       className="text-[10px] font-black text-rose-600 uppercase flex items-center space-x-1 hover:underline"
                     >
                        <Plus className="w-3.5 h-3.5" /> <span>Add Media Node</span>
                     </button>
                  </div>

                  <div className="grid gap-4">
                    {config.appearance.heroImages.map((img: string, iIdx: number) => (
                      <div key={iIdx} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-2xl border border-gray-100 group">
                        <div className="w-20 h-12 bg-white rounded-lg border border-gray-200 overflow-hidden shrink-0">
                          {img ? <img src={img} className="w-full h-full object-cover" alt="Slide" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-4 h-4" /></div>}
                        </div>
                        <input 
                          value={img} 
                          onChange={e => {
                            const updated = [...config.appearance.heroImages];
                            updated[iIdx] = e.target.value;
                            setConfig({...config, appearance: {...config.appearance, heroImages: updated}});
                          }}
                          placeholder="Asset URL (Unsplash/Cloudinary)"
                          className="flex-1 bg-transparent border-none outline-none font-bold text-xs"
                        />
                        <button 
                          onClick={() => {
                            const updated = config.appearance.heroImages.filter((_: any, i: number) => i !== iIdx);
                            setConfig({...config, appearance: {...config.appearance, heroImages: updated}});
                          }}
                          className="p-2 text-gray-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Global Sync Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-[100] bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-4 md:px-12 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className={`w-2.5 h-2.5 rounded-full ${isSaved ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-gray-200 animate-pulse'}`} />
            <div className="hidden sm:block">
               <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                  {isSaved ? "Configuration Synchronized" : "Uncommitted Core Changes"}
               </p>
               <p className="text-[8px] font-bold text-gray-400 uppercase">System Active: 2.4.0</p>
            </div>
         </div>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className={`px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center shadow-2xl ${
             isSaved ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-rose-600 text-white shadow-rose-200 hover:bg-rose-700 active:scale-95'
           }`}
         >
           {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : isSaved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
           {isSaving ? "Syncing Core..." : isSaved ? "Deployed" : "Commit Changes"}
         </button>
      </div>
    </div>
  );
};

export default AdminSettings;
