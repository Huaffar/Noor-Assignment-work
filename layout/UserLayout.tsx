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
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  ClipboardList,
  LogOut,
  CloudLightning,
  FileCheck,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';
import LivePayouts from '../components/LivePayouts';
import NotificationBell from '../components/NotificationBell';
import { getPlanRequests, getAuditAnalytics } from '../api/controllers/adminController';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['financials', 'logic', 'system']);
  const [pendingPlansCount, setPendingPlansCount] = useState(0);
  const [pendingWorkCount, setPendingWorkCount] = useState(0);
  const { user, logout, isAuthenticated } = useAuth();
  const { settings } = useSystem();
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

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true });
  }, [isAuthenticated, navigate]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]);
  };

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Task Console', path: '/tasks', icon: Briefcase },
    { name: 'My Wallet', path: '/wallet', icon: Wallet },
    { name: 'Payout Hub', path: '/withdraw', icon: Banknote }, 
    { name: 'Affiliates', path: '/referrals', icon: Share2 },
    { name: 'Packages', path: '/upgrade', icon: TrendingUp },
    { name: 'Audit History', path: '/requests', icon: History },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Profile', path: '/profile', icon: SettingsIcon },
  ];

  const adminMenuItems = [
    { name: 'Admin Hub', path: '/admin', icon: LayoutDashboard },
    { name: 'Intelligence', path: '/admin/reports', icon: BarChart3 },
    { name: 'Members', path: '/admin/users', icon: Users },
    { name: 'Plan Requests', path: '/admin/plan-requests', icon: ClipboardList, badge: pendingPlansCount > 0 ? pendingPlansCount : undefined },
    { name: 'Financials', id: 'financials', icon: Banknote, subItems: [{ name: 'Payments', path: '/admin/withdrawals' }, { name: 'Gateways', path: '/admin/finance' }, { name: 'Logs', path: '/admin/audit' }] },
    { name: 'Work CMS', id: 'logic', icon: LayoutGrid, subItems: [{ name: 'Plans', path: '/admin/plans' }, { name: 'Review', path: '/admin/reviews', badge: pendingWorkCount > 0 ? pendingWorkCount : undefined }, { name: 'Inject', path: '/admin/work' }, { name: 'Guides', path: '/admin/guides' }] },
    { name: 'Platform', id: 'system', icon: SettingsIcon, subItems: [{ name: 'Controls', path: '/admin/settings' }, { name: 'Marketing', path: '/admin/marketing' }, { name: 'Trash', path: '/admin/trash' }] }
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : userMenuItems;

  const SidebarContent = () => (
    <div className="flex flex-col h-[calc(100vh-1rem)] themed-card m-2 border border-theme-primary/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 themed-gradient opacity-5 rounded-full blur-2xl -mr-12 -mt-12" />
      
      <div className="p-5 flex items-center space-x-2 border-b border-theme-bg relative z-10">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg themed-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <CloudLightning className="text-white w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-black tracking-tight text-theme-text uppercase leading-none">NOOR</span>
            <span className="text-[7px] font-black tracking-[0.2em] text-theme-primary uppercase leading-none mt-1">Official</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar pb-10 relative z-10">
        {currentMenuItems.map((item: any) => {
          if (item.subItems) {
            const isExpanded = expandedMenus.includes(item.id);
            const hasActiveSub = item.subItems.some((sub: any) => location.pathname === sub.path);
            return (
              <div key={item.id} className="space-y-0.5">
                <button onClick={() => toggleMenu(item.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${hasActiveSub ? 'text-theme-primary bg-theme-secondary/40' : 'text-gray-400 hover:bg-theme-secondary/20 hover:text-theme-primary'}`}>
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4 h-4 ${hasActiveSub ? 'text-theme-primary' : 'opacity-40 group-hover:opacity-100'}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
                  </div>
                  <ChevronDown className={`w-3 h-3 opacity-30 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-6 space-y-0.5 border-l border-theme-secondary">
                      {item.subItems.map((sub: any) => (
                        <Link key={sub.path} to={sub.path} className={`flex items-center justify-between px-4 py-1.5 rounded-r-lg text-[7px] font-black uppercase transition-all ${location.pathname === sub.path ? 'text-theme-primary bg-theme-secondary/30' : 'text-gray-400 hover:text-theme-primary'}`}>
                          <span>{sub.name}</span>
                          {sub.badge !== undefined && <span className="w-4 h-4 themed-gradient text-white rounded-full flex items-center justify-center text-[6px] animate-pulse">{sub.badge}</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all group relative overflow-hidden ${isActive ? 'themed-gradient text-white shadow-lg' : 'text-gray-400 hover:bg-theme-secondary/20 hover:text-theme-primary'}`}>
              <div className="flex items-center space-x-3 relative z-10">
                <item.icon className={`w-4 h-4 ${isActive ? 'scale-110' : 'opacity-40 group-hover:opacity-100'}`} />
                <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-90'}`}>{item.name}</span>
              </div>
              {item.badge !== undefined && <span className={`relative z-10 text-[7px] font-black w-4 h-4 flex items-center justify-center rounded-full ${isActive ? 'bg-white text-theme-primary' : 'bg-theme-secondary text-theme-primary'}`}>{item.badge}</span>}
              {isActive && <div className="absolute inset-0 bg-white/10 blur-xl opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-theme-bg relative z-10">
        <div className="p-3 rounded-xl bg-slate-950 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 themed-gradient opacity-10 rounded-full blur-xl" />
          <div className="relative z-10">
            <p className="text-[6px] font-black text-theme-primary uppercase tracking-[0.2em] mb-1 opacity-60 leading-none">ACTIVE USER</p>
            <p className="text-[8px] font-black text-white truncate uppercase mb-3 leading-none">{user?.name}</p>
            <button onClick={logout} className="w-full py-2 font-black text-[7px] uppercase tracking-widest rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center group active:scale-95">
              <LogOut className="w-3 h-3 mr-2" /> DISCONNECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-theme-bg">
      <LivePayouts />
      <aside className="hidden lg:block w-60 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 bottom-0 w-60 z-[110] lg:hidden shadow-2xl"><SidebarContent /></motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-theme-bg px-4 flex items-center justify-between sticky top-0 z-50 bg-theme-card/90 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-theme-secondary rounded-lg text-theme-primary shadow-sm active:scale-90 transition-all"><Menu className="w-4 h-4" /></button>
            <div className="hidden sm:flex items-center space-x-2 text-gray-400 opacity-40">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_var(--theme-primary)]" />
               <span className="font-black text-[7px] uppercase tracking-[0.4em]">SYSTEM OK</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <NotificationBell />
             <div onClick={() => navigate('/profile')} className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-white cursor-pointer shadow-xl hover:bg-theme-primary transition-all active:scale-90 border border-white/10 group">
               <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
             </div>
          </div>
        </header>
        <main className="flex-1 p-2 sm:p-6 overflow-x-hidden no-scrollbar">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={location.pathname}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;