import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  CreditCard, 
  Percent, 
  Image as ImageIcon,
  Save,
  Loader2,
  CheckCircle2,
  Plus,
  Trash2,
  Palette,
  Eye,
  Layout,
  BellRing,
  Zap,
  MousePointer2,
  Maximize,
  Trophy,
  ShieldCheck,
  Smartphone,
  SmartphoneNfc,
  Settings as SettingsIcon,
  Monitor,
  Check,
  Edit2,
  X,
  Link as LinkIcon,
  Type,
  ExternalLink,
  Upload,
  Crop,
  Clock,
  Users,
  Facebook,
  Instagram,
  Youtube,
  Send,
  Search,
  Hash,
  ShieldAlert
} from 'lucide-react';
import { getSettings, updateSettings } from '../../api/controllers/settingsController';
import { useAuth } from '../../context/AuthContext';
import { useSystem, HeroSlide } from '../../context/SystemContext';
import { uploadFile } from '../../api/config/cloudinary';
import TeamRoles from './settings/TeamRoles';

const InputGroup = ({ label, value, onChange, placeholder, type = "text", icon: Icon, colorPreview }: any) => (
  <div className="space-y-1">
    <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 group-focus-within:text-rose-500" />}
      <input 
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 font-bold text-[10px] outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400 transition-all ${Icon ? 'pl-8' : 'px-2'} ${type === 'color' ? 'h-7 p-0.5' : ''}`}
      />
      {colorPreview && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded border border-white shadow-sm" style={{ backgroundColor: value }} />}
    </div>
  </div>
);

const TextAreaGroup = ({ label, value, onChange, placeholder, icon: Icon }: any) => (
  <div className="space-y-1">
    <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-2.5 top-3 w-3 h-3 text-gray-400 group-focus-within:text-rose-500" />}
      <textarea 
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`w-full bg-gray-50 border border-gray-100 rounded-lg py-2 font-bold text-[10px] outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400 transition-all resize-none ${Icon ? 'pl-8' : 'px-2'}`}
      />
    </div>
  </div>
);

const AssetUpload = ({ label, currentUrl, onUpload, icon: Icon, circular = false }: any) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalLoading(true);
      const url = await uploadFile(file);
      onUpload(url);
      setLocalLoading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex items-center space-x-3 bg-gray-50 border border-gray-100 rounded-xl p-2 group hover:border-rose-200 transition-all">
        <div className={`w-10 h-10 bg-white border border-gray-100 overflow-hidden flex items-center justify-center relative shrink-0 ${circular ? 'rounded-full' : 'rounded-lg'}`}>
          {currentUrl ? (
            <img src={currentUrl} className="w-full h-full object-contain" alt="Asset" />
          ) : (
            <Icon className="w-4 h-4 text-gray-300" />
          )}
          {localLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="w-3 h-3 animate-spin text-rose-600" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[7px] text-gray-400 font-bold truncate uppercase">{currentUrl ? currentUrl.split('/').pop() : "No asset selected"}</p>
          <button 
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-[8px] font-black text-rose-600 uppercase hover:underline mt-0.5"
          >
            Choose File
          </button>
          <input type="file" ref={fileRef} hidden onChange={handleFile} accept="image/*" />
        </div>
      </div>
    </div>
  );
};

const ModuleSwitch = ({ label, active, onToggle }: any) => (
  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:border-rose-200 transition-all">
    <span className="text-[8px] font-black text-gray-900 uppercase tracking-tighter">{label}</span>
    <button onClick={onToggle} className={`relative w-7 h-4 rounded-full flex items-center p-0.5 transition-colors ${active ? 'bg-emerald-500' : 'bg-gray-200'}`}>
      <motion.div animate={{ x: active ? 12 : 0 }} className="w-3 h-3 bg-white rounded-full shadow-sm" />
    </button>
  </div>
);

const AdminSettings: React.FC = () => {
  const { settings: globalSettings, setTheme, updateSettings: updateGlobalSettings } = useSystem();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [config, setConfig] = useState<any>(null);
  
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSettings().then(data => {
      setConfig({ ...data, ...globalSettings });
      setIsLoading(false);
    });
  }, [globalSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      updateGlobalSettings(config);
      setTheme(config.activeThemeId);
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const handleUpdateSlide = (updated: HeroSlide) => {
    const updatedSlides = config.heroConfig.slides.map((s: HeroSlide) => s.id === updated.id ? updated : s);
    setConfig({ ...config, heroConfig: { ...config.heroConfig, slides: updatedSlides } });
    setEditingSlide(null);
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: 's' + Date.now(),
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
      title: "New Earning Opportunity",
      subtitle: "Customize your hero message here.",
      buttonText: "Join Now",
      buttonLink: "/register"
    };
    setConfig({ ...config, heroConfig: { ...config.heroConfig, slides: [...config.heroConfig.slides, newSlide] } });
    setEditingSlide(newSlide);
  };

  const handleDeleteSlide = (id: string) => {
    const filtered = config.heroConfig.slides.filter((s: HeroSlide) => s.id !== id);
    setConfig({ ...config, heroConfig: { ...config.heroConfig, slides: filtered } });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingSlide) {
      setIsUploading(true);
      try {
        setIsCropping(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        const imageUrl = await uploadFile(file);
        setEditingSlide({ ...editingSlide, image: imageUrl });
        setIsCropping(false);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const tabs = [
    { id: 'general', label: 'Identity', icon: Globe },
    { id: 'modules', label: 'Modules', icon: SettingsIcon },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'appearance', label: 'Visuals', icon: ImageIcon },
    { id: 'marquee', label: 'Pulse', icon: BellRing },
    { id: 'rewards', label: 'Bonus', icon: Trophy },
    { id: 'finance', label: 'Finance', icon: Percent },
    { id: 'themes', label: 'Themes', icon: Palette },
  ];

  if (isLoading || !config) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-5 h-5 text-rose-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-2 px-1">
      <div className="flex items-center space-x-2 px-1 mb-2">
        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shadow-xl">
          <Zap className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>
        <div>
          <h1 className="text-sm font-black text-gray-900 leading-none uppercase tracking-tight">System Core</h1>
          <p className="text-[6px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Admin v3.8.2</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <nav className="lg:w-40 space-y-0.5 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditingSlide(null); }}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all border ${
                activeTab === tab.id 
                  ? 'bg-white border-rose-200 text-rose-600 shadow-sm' 
                  : 'bg-transparent border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className={`w-3 h-3 ${activeTab === tab.id ? 'text-rose-500' : 'text-gray-400'}`} />
              <span className="text-[9px] font-black uppercase tracking-tight">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 min-h-[400px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {editingSlide ? (
                  <motion.div key="slide-editor" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                       <h3 className="text-[9px] font-black text-gray-900 uppercase">Edit Hero Slide</h3>
                       <button onClick={() => setEditingSlide(null)} className="p-1.5 bg-gray-50 rounded-lg text-gray-400"><X className="w-3 h-3" /></button>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="space-y-1">
                          <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Hero Asset</label>
                          <div className="relative aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden group">
                             {isCropping ? (
                               <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-[7px] font-black text-white uppercase tracking-widest flex items-center justify-center">
                                      <Crop className="w-3 h-3 mr-1" /> Perfecting Crop...
                                    </p>
                                  </div>
                               </div>
                             ) : null}
                             <img src={editingSlide.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Slide Preview" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="p-2 bg-white rounded-xl text-gray-900 shadow-xl hover:scale-110 transition-transform flex items-center space-x-2"
                                >
                                   <Upload className="w-4 h-4" />
                                   <span className="text-[9px] font-black uppercase">Replace</span>
                                </button>
                             </div>
                             <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 gap-2.5">
                          <InputGroup label="Headline Title" value={editingSlide.title} onChange={(v:any)=>setEditingSlide({...editingSlide, title: v})} icon={Type} />
                          <InputGroup label="Subtitle / Description" value={editingSlide.subtitle} onChange={(v:any)=>setEditingSlide({...editingSlide, subtitle: v})} icon={Layout} />
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                          <InputGroup label="Button Label" value={editingSlide.buttonText} onChange={(v:any)=>setEditingSlide({...editingSlide, buttonText: v})} icon={MousePointer2} />
                          <InputGroup label="Action Link" value={editingSlide.buttonLink} onChange={(v:any)=>setEditingSlide({...editingSlide, buttonLink: v})} icon={LinkIcon} />
                       </div>
                    </div>

                    <button 
                      onClick={() => handleUpdateSlide(editingSlide)} 
                      disabled={isUploading}
                      className="w-full py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest mt-2 flex items-center justify-center"
                    >
                      {isUploading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                      Update Slide Asset
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {activeTab === 'general' && (
                      <div className="space-y-5 overflow-y-auto max-h-[500px] no-scrollbar pr-1">
                        <div className="space-y-3">
                          <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5 flex items-center">
                            <Globe className="w-3 h-3 mr-1 text-rose-500" /> Network Identity
                          </h3>
                          <InputGroup label="Network Title" value={config.siteName} onChange={(v: string) => setConfig({...config, siteName: v})} icon={Globe} />
                          <InputGroup label="Support WhatsApp (Primary)" value={config.supportWhatsApp} onChange={(v: string) => setConfig({...config, supportWhatsApp: v})} icon={BellRing} />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5 flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-1 text-emerald-500" /> SEO & Brand Assets
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <AssetUpload label="Platform Logo" currentUrl={config.siteLogo} onUpload={(url:string)=>setConfig({...config, siteLogo: url})} icon={ImageIcon} />
                            <AssetUpload label="Site Favicon" currentUrl={config.siteFavicon} onUpload={(url:string)=>setConfig({...config, siteFavicon: url})} icon={Layout} circular />
                          </div>
                          <TextAreaGroup label="SEO Meta Description" value={config.metaDescription} onChange={(v:string)=>setConfig({...config, metaDescription: v})} icon={Type} placeholder="Describe your platform for search engines..." />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5 flex items-center">
                            <LinkIcon className="w-3 h-3 mr-1 text-blue-500" /> Social Integrations
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <InputGroup label="Facebook URL" value={config.socialLinks.facebook} onChange={(v:string)=>setConfig({...config, socialLinks: {...config.socialLinks, facebook: v}})} icon={Facebook} />
                            <InputGroup label="Instagram URL" value={config.socialLinks.instagram} onChange={(v:string)=>setConfig({...config, socialLinks: {...config.socialLinks, instagram: v}})} icon={Instagram} />
                            <InputGroup label="YouTube Channel" value={config.socialLinks.youtube} onChange={(v:string)=>setConfig({...config, socialLinks: {...config.socialLinks, youtube: v}})} icon={Youtube} />
                            <InputGroup label="Telegram Link" value={config.socialLinks.telegram} onChange={(v:string)=>setConfig({...config, socialLinks: {...config.socialLinks, telegram: v}})} icon={Send} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5 flex items-center">
                            <CreditCard className="w-3 h-3 mr-1 text-amber-500" /> Primary Deposit Nodes
                          </h3>
                          <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest flex items-center"><Smartphone className="w-2.5 h-2.5 mr-1" /> EasyPaisa</p>
                                <InputGroup label="Account Number" value={config.payoutMethods.easyPaisa.number} onChange={(v:string)=>setConfig({...config, payoutMethods: {...config.payoutMethods, easyPaisa: {...config.payoutMethods.easyPaisa, number: v}}})} />
                                <InputGroup label="Account Title" value={config.payoutMethods.easyPaisa.title} onChange={(v:string)=>setConfig({...config, payoutMethods: {...config.payoutMethods, easyPaisa: {...config.payoutMethods.easyPaisa, title: v}}})} />
                              </div>
                              <div className="space-y-2">
                                <p className="text-[8px] font-black text-rose-600 uppercase tracking-widest flex items-center"><SmartphoneNfc className="w-2.5 h-2.5 mr-1" /> JazzCash</p>
                                <InputGroup label="Account Number" value={config.payoutMethods.jazzCash.number} onChange={(v:string)=>setConfig({...config, payoutMethods: {...config.payoutMethods, jazzCash: {...config.payoutMethods.jazzCash, number: v}}})} />
                                <InputGroup label="Account Title" value={config.payoutMethods.jazzCash.title} onChange={(v:string)=>setConfig({...config, payoutMethods: {...config.payoutMethods, jazzCash: {...config.payoutMethods.jazzCash, title: v}}})} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'team' && <TeamRoles />}

                    {activeTab === 'appearance' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                           <h3 className="text-[9px] font-black text-gray-900 uppercase">Hero Infrastructure</h3>
                           <button onClick={handleAddSlide} className="p-1.5 bg-rose-600 text-white rounded-lg shadow-md active:scale-95"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2">
                           <div className="flex items-center justify-between">
                              <label className="text-[7px] font-black text-rose-600 uppercase tracking-widest flex items-center">
                                 <Clock className="w-3 h-3 mr-1.5" /> Slide Cycle Duration
                              </label>
                              <span className="text-[8px] font-black text-rose-600 bg-white px-1.5 py-0.5 rounded border border-rose-100">{config.heroConfig.transitionDuration}s</span>
                           </div>
                           <input 
                             type="range" 
                             min="2" 
                             max="15" 
                             step="1" 
                             value={config.heroConfig.transitionDuration} 
                             onChange={(e) => setConfig({...config, heroConfig: { ...config.heroConfig, transitionDuration: parseInt(e.target.value) }})}
                             className="w-full accent-rose-600 h-1 bg-rose-200 rounded-lg cursor-pointer" 
                           />
                        </div>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto no-scrollbar">
                          {config.heroConfig.slides.map((slide: any) => (
                            <div key={slide.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group hover:border-rose-200 transition-all">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-8 rounded-lg overflow-hidden bg-gray-200 relative shrink-0 border border-gray-200 shadow-sm">
                                   <img src={slide.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div>
                                   <p className="text-[9px] font-black text-gray-900 leading-none mb-0.5 uppercase truncate max-w-[120px]">{slide.title}</p>
                                   <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Node Asset • {slide.id.substring(0,6)}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => setEditingSlide(slide)} className="p-1.5 bg-white border border-gray-100 text-gray-400 rounded-lg hover:text-rose-600 hover:border-rose-200"><Edit2 className="w-3 h-3" /></button>
                                 <button onClick={() => handleDeleteSlide(slide.id)} className="p-1.5 bg-white border border-gray-100 text-gray-400 rounded-lg hover:text-rose-600 hover:border-rose-200"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'modules' && (
                      <div className="space-y-2">
                        <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5">Feature Switches</h3>
                        <ModuleSwitch label="Referral System" active={config.modules.referralSystem} onToggle={() => setConfig({...config, modules: {...config.modules, referralSystem: !config.modules.referralSystem}})} />
                        <ModuleSwitch label="Public Registration" active={config.modules.registration} onToggle={() => setConfig({...config, modules: {...config.modules, registration: !config.modules.registration}})} />
                        <ModuleSwitch label="Live Payout Ticker" active={config.modules.livePayoutTicker} onToggle={() => setConfig({...config, modules: {...config.modules, livePayoutTicker: !config.modules.livePayoutTicker}})} />
                        <ModuleSwitch label="Daily Bonus" active={config.modules.dailyCheckIn} onToggle={() => setConfig({...config, modules: {...config.modules, dailyCheckIn: !config.modules.dailyCheckIn}})} />
                      </div>
                    )}

                    {activeTab === 'marquee' && (
                      <div className="space-y-3">
                        <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-1.5">Pulse News Node</h3>
                        <InputGroup label="Headline Message" value={config.marqueeConfig.text} onChange={(v: string) => setConfig({...config, marqueeConfig: {...config.marqueeConfig, text: v}})} icon={BellRing} />
                        <div className="grid grid-cols-2 gap-3">
                          <InputGroup label="Text Color" type="color" value={config.marqueeConfig.textColor} onChange={(v: string) => setConfig({...config, marqueeConfig: {...config.marqueeConfig, textColor: v}})} icon={Palette} colorPreview />
                          <InputGroup label="Background" type="color" value={config.marqueeConfig.bgColor} onChange={(v: string) => setConfig({...config, marqueeConfig: {...config.marqueeConfig, bgColor: v}})} icon={Layout} colorPreview />
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'themes' && (
                      <div className="grid grid-cols-2 gap-2">
                        {config.themes.map((theme: any) => (
                          <div key={theme.id} onClick={() => setConfig({...config, activeThemeId: theme.id})} className={`p-2 rounded-xl border-2 cursor-pointer transition-all ${config.activeThemeId === theme.id ? 'border-rose-500 bg-rose-50/20 shadow-sm' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="w-5 h-5 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}><Palette className="w-3 h-3" /></div>
                              {config.activeThemeId === theme.id && <Check className="w-3 h-3 text-rose-500" />}
                            </div>
                            <h3 className="text-[7px] font-black uppercase tracking-widest text-gray-900">{theme.name}</h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                <div className="flex items-center space-x-1.5">
                  <Monitor className="w-3 h-3 text-gray-400" />
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Global Asset Preview</span>
                </div>
                <div className="flex items-center space-x-1">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[6px] font-black text-emerald-600 uppercase">Synchronized</span>
                </div>
              </div>
              
              <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden scale-[0.85] origin-top">
                <div className="p-2.5 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                   <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[7px] font-bold overflow-hidden" style={{ backgroundColor: config.themes.find((t:any)=>t.id === config.activeThemeId)?.primary || '#e11d48' }}>
                        {config.siteLogo ? <img src={config.siteLogo} className="w-full h-full object-contain" /> : "N"}
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-tighter">{config.siteName}</span>
                   </div>
                   <div className="flex space-x-1.5">
                      <Facebook className="w-2.5 h-2.5 text-gray-300" />
                      <Instagram className="w-2.5 h-2.5 text-gray-300" />
                   </div>
                </div>

                <div className="relative">
                  {config.marqueeConfig.isActive && (
                    <div className="h-4 flex items-center overflow-hidden border-b border-gray-50 shadow-inner" style={{ backgroundColor: config.marqueeConfig.bgColor }}>
                       <div className="h-full px-1 flex items-center text-white text-[4px] font-black uppercase shrink-0" style={{ backgroundColor: config.marqueeConfig.textColor }}>NEWS</div>
                       <div className="relative flex-1 overflow-hidden">
                          <motion.div animate={{ x: [80, -250] }} transition={{ duration: config.marqueeConfig.speed, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap font-black text-[5px]" style={{ color: config.marqueeConfig.textColor }}>
                            {config.marqueeConfig.text}
                          </motion.div>
                       </div>
                    </div>
                  )}
                  
                  <div className="aspect-[21/9] bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    {config.heroConfig.slides.length > 0 && (
                      <>
                        <img src={editingSlide ? editingSlide.image : config.heroConfig.slides[0].image} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
                        <div className="relative text-center px-6 max-w-[240px]">
                           <h4 className="text-[12px] font-black text-gray-900 leading-tight uppercase mb-1 tracking-tighter">
                             {editingSlide ? editingSlide.title : config.heroConfig.slides[0].title}
                           </h4>
                           <p className="text-[6px] text-gray-500 font-bold uppercase tracking-tight mb-2 line-clamp-1">
                             {editingSlide ? editingSlide.subtitle : config.heroConfig.slides[0].subtitle}
                           </p>
                           <div className="flex items-center justify-center space-x-1.5">
                              <div className="px-3 py-1 bg-rose-600 rounded-md text-white text-[5px] font-black uppercase tracking-widest shadow-md">
                                {editingSlide ? editingSlide.buttonText : config.heroConfig.slides[0].buttonText}
                              </div>
                           </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                   <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                         <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                      </div>
                      <div className="h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                         <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                      </div>
                   </div>
                   <div className="bg-rose-50/20 border border-rose-100/50 p-2 rounded-lg text-[4px] font-black text-gray-400 uppercase leading-relaxed line-clamp-2">
                      {config.metaDescription}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-[150] bg-white/95 backdrop-blur-md border-t border-gray-100 p-2.5 md:px-10 flex items-center justify-between shadow-2xl">
         <div className="flex items-center space-x-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isSaved ? 'bg-emerald-500' : 'bg-gray-200 animate-pulse'}`} />
            <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest leading-none">
              {isSaved ? "Node Cluster Optimized" : "Pending Core Sync"}
            </span>
         </div>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className={`px-8 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all flex items-center shadow-lg active:scale-95 ${
             isSaving ? 'bg-rose-400' : isSaved ? 'bg-emerald-600' : 'bg-rose-600 hover:bg-rose-700'
           } text-white`}
         >
           {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : isSaved ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <Save className="w-3 h-3 mr-2" />}
           {isSaving ? "Syncing..." : isSaved ? "Deployed" : "Commit to Production"}
         </button>
      </div>
    </div>
  );
};

export default AdminSettings;