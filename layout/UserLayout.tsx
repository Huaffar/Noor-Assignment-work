import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  Menu, 
  Settings as SettingsIcon,
  Banknote,
  Users,
  Briefcase,
  TrendingUp,
  Share2,
  History,
  LifeBuoy,
  User as UserIcon,
  Activity,
  ArrowUpRight,
  ClipboardCheck,
  ShieldCheck,
  Building,
  Target,
  ChevronDown,
  ChevronRight,
  Trash2,
  Megaphone,
  Palette,
  Globe,
  LayoutGrid,
  ClipboardList,
  ShieldAlert,
  Sliders,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LivePayouts from '../components/LivePayouts';
import NotificationBell from '../components/NotificationBell';
import { getPlanRequests, getAuditAnalytics } from '../api/controllers/adminController';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['financials', 'logic', 'system']);
  const [pendingPlansCount, setPendingPlansCount] = useState(0);
  const [pendingWorkCount, setPendingWorkCount] = useState(0);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setIsSidebarOpen(false);
    if (isAdmin) {
      getPlanRequests().then(data => {
        setPendingPlansCount(data.filter(r => r.status === 'Pending').length);
      });
      getAuditAnalytics().then(data => {
        setPendingWorkCount(data.todayStats.pending);
      });
    }
  }, [location.pathname, isAdmin]);

  // Critical Sync: If not authenticated, force redirect immediately
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Assignments', path: '/tasks', icon: Briefcase },
    { name: 'Assets Hub', path: '/wallet', icon: Wallet },
    { name: 'Instant Payout', path: '/withdraw', icon: ArrowUpRight }, 
    { name: 'Team Network', path: '/referrals', icon: Share2 },
    { name: 'Earning Plans', path: '/upgrade', icon: TrendingUp },
    { name: 'Audit Logs', path: '/requests', icon: History, badge: 2 },
    { name: 'Support Node', path: '/support', icon: LifeBuoy },
    { name: 'Account Config', path: '/profile', icon: SettingsIcon },
  ];

  const adminMenuItems = [
    { name: 'Admin Hub', path: '/admin', icon: LayoutDashboard },
    { name: 'Personnel Hub', path: '/admin/users', icon: Users },
    { 
      name: 'Plan Requests', 
      path: '/admin/plan-requests', 
      icon: ClipboardList,
      badge: pendingPlansCount > 0 ? pendingPlansCount : undefined
    },
    {
      name: 'Financial Hub',
      id: 'financials',
      icon: Banknote,
      subItems: [
        { name: 'Payout Queue', path: '/admin/withdrawals' },
        { name: 'Gateway Node', path: '/admin/finance' },
        { name: 'Audit Trace', path: '/admin/audit' },
      ]
    },
    {
      name: 'Assignment CMS',
      id: 'logic',
      icon: LayoutGrid,
      subItems: [
        { name: 'Plan Config', path: '/admin/plans' },
        { name: 'Work Auditor', path: '/admin/reviews', badge: pendingWorkCount > 0 ? pendingWorkCount : undefined },
        { name: 'Work Manager', path: '/admin/work' },
        { name: 'Guides CMS', path: '/admin/guides' },
      ]
    },
    {
      name: 'Platform Node',
      id: 'system',
      icon: SettingsIcon,
      subItems: [
        { name: 'Command Hub', path: '/admin/settings' },
        { name: 'Marketing Node', path: '/admin/marketing' },
        { name: 'Signal Dispatch', path: '/admin/alerts' },
        { name: 'Recycle Vault', path: '/admin/trash' },
      ]
    }
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleSessionEnd = () => {
    logout();
    // Redirect handled by useEffect above for cleaner state cleanup
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-pink-50 shadow-sm">
      <div className="p-6 flex items-center space-x-3 border-b border-pink-50">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-100">
            <Sparkles className="text-white w-4 h-4 fill-white" />
          </div>
          <span className="text-base font-black tracking-tighter text-slate-900 uppercase">Noor<span className="text-pink-500">Offcl</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-6 overflow-y-auto no-scrollbar pb-10">
        {currentMenuItems.map((item: any) => {
          if (item.subItems) {
            const isExpanded = expandedMenus.includes(item.id);
            const hasActiveSub = item.subItems.some((sub: any) => location.pathname === sub.path);
            
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                    hasActiveSub ? 'text-pink-600 bg-pink-50/30' : 'text-slate-400 hover:text-pink-500 hover:bg-pink-50/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4.5 h-4.5 ${hasActiveSub ? 'text-pink-600 scale-110' : 'opacity-60'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5 opacity-40" /> : <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-7 space-y-1 border-l border-pink-50"
                    >
                      {item.subItems.map((sub: any) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <div key={sub.path} className="relative">
                            <Link
                              to={sub.path}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                                isSubActive ? 'text-pink-600 bg-pink-50/50' : 'text-slate-400 hover:text-pink-600'
                              }`}
                            >
                              <span>{sub.name}</span>
                              {sub.badge !== undefined && (
                                <span className="w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[7px] animate-pulse shadow-sm">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                isActive ? 'bg-pink-500 text-white shadow-xl shadow-pink-100' : 'text-slate-400 hover:text-pink-500 hover:bg-pink-50/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-4.5 h-4.5 transition-all ${isActive ? 'scale-110 opacity-100' : 'opacity-60'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-md ${isActive ? 'bg-white text-pink-600' : 'bg-rose-50 text-white'}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-pink-50">
        <div className="p-4 rounded-[1.8rem] bg-slate-950 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <p className="text-[7px] font-black text-pink-500 uppercase tracking-widest mb-1 relative z-10">Verified Personnel</p>
          <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter mb-4 relative z-10">{user?.name}</p>
          <button 
            onClick={handleSessionEnd}
            className="w-full py-3 font-black text-[9px] uppercase tracking-[0.2em] rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center group relative z-10"
          >
            <LogOut className="w-3.5 h-3.5 mr-2 group-hover:rotate-12 transition-transform" /> 
            End Session
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FCFCFD]">
      <LivePayouts />
      <aside className="hidden lg:block w-60 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-64 z-[110] lg:hidden shadow-2xl"><SidebarContent /></motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-pink-50 px-6 flex items-center justify-between sticky top-0 z-50 bg-white/90 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-pink-50 rounded-xl text-pink-500 shadow-sm"><Menu className="w-5 h-5" /></button>
            <div className="hidden sm:flex items-center space-x-2 text-slate-300">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="font-black text-[8px] uppercase tracking-[0.4em]">Secure Node Sync Active</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <div className="bg-pink-50/50 px-4 py-2 rounded-xl border border-pink-100 flex items-center space-x-3 shadow-sm hover:border-pink-200 transition-colors">
                <ClipboardList className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-[10px] font-black text-slate-900 leading-none">{pendingPlansCount} PENDING</span>
             </div>
             <NotificationBell />
             <div onClick={() => navigate('/profile')} className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-pink-500 transition-all active:scale-90 border border-white/10"><UserIcon className="w-4 h-4" /></div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden no-scrollbar">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={location.pathname}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;