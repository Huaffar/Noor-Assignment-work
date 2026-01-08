import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  text: string;
  bg: string;
  isDefault?: boolean;
}

export interface MarqueeConfig {
  text: string;
  speed: number;
  fontSize: string;
  textColor: string;
  bgColor: string;
  isActive: boolean;
  scale: number;
}

export interface StreakConfig {
  isActive: boolean;
  dailyReward: number;
  milestoneReward: number;
}

interface SystemSettings {
  siteName: string;
  siteLogo: string;
  siteFavicon: string;
  metaDescription: string;
  maintenanceMode: boolean;
  minWithdrawal: number;
  supportWhatsApp: string;
  activeThemeId: string;
  themes: ThemePreset[];
  heroConfig: {
    slides: HeroSlide[];
    transitionDuration: number;
    aspectRatio: 'full' | '16:9' | '21:9' | '4:3';
  };
  marqueeConfig: MarqueeConfig;
  streakConfig: StreakConfig;
  modules: {
    referralSystem: boolean;
    registration: boolean;
    dailyCheckIn: boolean;
    livePayoutTicker: boolean;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    telegram: string;
  };
  payoutMethods: {
    easyPaisa: { number: string; title: string };
    jazzCash: { number: string; title: string };
  };
}

interface SystemContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  setTheme: (themeId: string) => void;
  isLoading: boolean;
}

const themePresets: ThemePreset[] = [
  { id: "pink", name: "Royal Rose", primary: "#E11D48", text: "#1E293B", bg: "#FDF2F8", isDefault: true },
  { id: "green", name: "Emerald Growth", primary: "#10B981", text: "#064E3B", bg: "#F0FDF4" },
  { id: "black", name: "Slate Noir", primary: "#F43F5E", text: "#F8FAFC", bg: "#0F172A" },
  { id: "blue", name: "Oceanic Blue", primary: "#2563EB", text: "#1E3A8A", bg: "#EFF6FF" },
  { id: "yellow", name: "Amber Gold", primary: "#D97706", text: "#78350F", bg: "#FFFBEB" }
];

const defaultSettings: SystemSettings = {
  siteName: "Noor Earning Platform",
  siteLogo: "https://res.cloudinary.com/noor-official/image/upload/v1/assets/logo.png",
  siteFavicon: "https://res.cloudinary.com/noor-official/image/upload/v1/assets/favicon.ico",
  metaDescription: "Pakistan's premium micro-task platform. Earn daily by completing simple assignments and referrals.",
  maintenanceMode: false,
  minWithdrawal: 500,
  supportWhatsApp: "923001234567",
  activeThemeId: "pink",
  themes: themePresets,
  heroConfig: {
    transitionDuration: 6,
    aspectRatio: 'full',
    slides: [
      {
        id: 's1',
        image: "https://images.unsplash.com/photo-1573163067521-024c04023ec2?auto=format&fit=crop&q=80&w=1920",
        title: "Earn Money Daily from Home",
        subtitle: "Join Pakistan's most trusted network and turn your free time into consistent PKR earnings.",
        buttonText: "Start Earning",
        buttonLink: "/register"
      }
    ]
  },
  marqueeConfig: {
    text: "Assalam-o-Alaikum! New assignments are live. Referral bonus has been increased to 15% for Gold Members. 🚀",
    speed: 20,
    fontSize: "text-[8px]",
    textColor: "#E11D48",
    bgColor: "#FFE4E6",
    isActive: true,
    scale: 1.0
  },
  streakConfig: {
    isActive: true,
    dailyReward: 5,
    milestoneReward: 50
  },
  modules: {
    referralSystem: true,
    registration: true,
    dailyCheckIn: true,
    livePayoutTicker: true
  },
  socialLinks: {
    facebook: "https://facebook.com/noorofficial",
    instagram: "https://instagram.com/noorofficial",
    youtube: "https://youtube.com/c/noorofficial",
    telegram: "https://t.me/noorofficial"
  },
  payoutMethods: {
    easyPaisa: { number: "03001234567", title: "Noor Official HQ" },
    jazzCash: { number: "03017654321", title: "Noor Official Finance" }
  }
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('noor_system_config');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [isLoading, setIsLoading] = useState(true);

  const applyTheme = (themeId: string) => {
    const theme = settings.themes.find(t => t.id === themeId) || settings.themes[0];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-accent', theme.id === 'black' ? '#fb7185' : theme.primary + '33');
  };

  useEffect(() => {
    applyTheme(settings.activeThemeId);
    setIsLoading(false);
  }, [settings.activeThemeId]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('noor_system_config', JSON.stringify(updated));
      return updated;
    });
  };

  const setTheme = (themeId: string) => {
    updateSettings({ activeThemeId: themeId });
  };

  return (
    <SystemContext.Provider value={{ settings, updateSettings, setTheme, isLoading }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within a SystemProvider');
  return context;
};