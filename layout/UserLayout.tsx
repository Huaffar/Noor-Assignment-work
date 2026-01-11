import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Wallet, Menu, Settings as SettingsIcon,
  Banknote, Users, Briefcase, TrendingUp, Share2, History,
  LifeBuoy, User as UserIcon, ChevronDown, LayoutGrid,
  ClipboardList, LogOut, CloudLightning, Globe, Zap,
  ShieldAlert, Terminal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';
import LivePayouts from '../components/LivePayouts';
import NotificationBell from '../components/NotificationBell';
import Preloader from '../components/Preloader';

// STABLE: SidebarContent must be outside to prevent useRef errors
const SidebarContent: React.FC<{ 
  user: any; 
  isAdmin: boolean; 
  expandedMenus: string[]; 
  toggleMenu: (id: string) => void;
  pathname: string;
  logout: () => void;
}> = ({ user, isAdmin, expandedMenus, toggleMenu, pathname, logout }) => {
  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Work Center', path: '/tasks', icon: Briefcase },
    { name: 'My Wallet', path: '/wallet', icon: Wallet },
    { name: 'Withdraw Funds', path: '/withdraw', icon: Banknote }, 
    { name: 'Refer & Earn', path: '/referrals', icon: Share2 },
    { name: 'Earning Plans', path: '/upgrade', icon: TrendingUp },
    { name: 'Work History', path: '/requests', icon: History },
    { name: 'Support Help', path: '/support', icon: LifeBuoy },
    { name: 'My Profile', path: '/profile', icon: SettingsIcon },
  ];

  const adminMenuItems = [
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Personnel Hub', path: '/admin/users', icon: Users },
    { name: 'Plan Requests', path: '/admin/plan-requests', icon: ClipboardList },
    { name: 'Financials', id: 'financials', icon: Banknote, subItems: [{ name: 'Withdrawals', path: '/admin/withdrawals' }, { name: 'Bank Settings', path: '/admin/finance' }] },
    { name: 'System Core', id: 'system', icon: Terminal, subItems: [{ name: 'General', path: '/admin/settings/general' }, { name: 'Configuration', path: '/admin/settings/config' }, { name: 'Advanced', path: '/admin/settings/advanced' }] },
    { name: 'App Control', id: 'app_ctrl', icon: SettingsIcon, subItems: [{ name: 'Manage Plans', path: '/admin/plans' }, { name: 'Manage Work', path: '/admin/work' }, { name: 'Audit Logs', path: '/admin/audit' }] }
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] themed-card m-2 border border-theme-primary/10 shadow-lg relative overflow-hidden">
      <div className="p-5 flex items-center space-x-3 border-b border-theme-bg">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl themed-gradient flex items-center justify-center shadow-md">
            <CloudLightning className="text-white w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-theme-text uppercase leading-none">NOOR</span>
            <span className="text-[10px] font-bold text-theme-primary uppercase leading-none mt-1">Official</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar pb-6">
        {currentMenuItems.map((item: any) => {
          if (item.subItems) {
            const isExpanded = expandedMenus.includes(item.id || '');
            return (
              <div key={item.id} className="space-y-1">
                <button onClick={() => toggleMenu(item.id)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 hover:bg-theme-secondary/10 hover:text-theme-primary transition-all">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4.5 h-4.5" />
                    <span className="text-[11px] font-black uppercase tracking-wide">{item.name}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && item.subItems.map((sub: any) => (
                  <Link key={sub.path} to={sub.path} className={`flex items-center px-10 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${pathname === sub.path ? 'text-theme-primary bg-theme-secondary/20' : 'text-gray-400 hover:text-theme-primary'}`}>
                    {sub.name}
                  </Link>
                ))}
              </div>
            );
          }
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} to={item.path} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'themed-gradient text-white shadow-md' : 'text-gray-500 hover:bg-theme-secondary/10 hover:text-theme-primary'}`}>
              <item.icon className="w-4.5 h-4.5" />
              <span className="text-[11px] font-black uppercase tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-theme-bg">
        <button onClick={logout} className="w-full py-3 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center active:scale-95 transition-all">
          <LogOut className="w-3.5 h-3.5 mr-2" /> LOGOUT HUB
        </button>
      </div>
    </div>
  );
};

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['system']);
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSidebarOpen(false);
    if (!authLoading && !isAuthenticated) navigate('/login', { replace: true });
  }, [location.pathname, isAuthenticated, authLoading, navigate]);

  if (authLoading || !user) return <Preloader />;

  const toggleMenu = (id: string) => setExpandedMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  return (
    <div className="flex min-h-screen bg-theme-bg">
      <LivePayouts />
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
        <SidebarContent user={user} isAdmin={user.role === 'admin'} expandedMenus={expandedMenus} toggleMenu={toggleMenu} pathname={location.pathname} logout={logout} />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-64 z-[110] lg:hidden">
              <SidebarContent user={user} isAdmin={user.role === 'admin'} expandedMenus={expandedMenus} toggleMenu={toggleMenu} pathname={location.pathname} logout={logout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-theme-bg px-5 flex items-center justify-between sticky top-0 z-50 bg-theme-card/90 backdrop-blur-xl">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-theme-secondary rounded-xl text-theme-primary"><Menu className="w-4.5 h-4.5" /></button>
          <div className="flex items-center space-x-4 ml-auto">
             <NotificationBell />
             <div onClick={() => navigate('/profile')} className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all border border-white/10">
               <UserIcon className="w-4 h-4" />
             </div>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-x-hidden no-scrollbar">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={location.pathname}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;