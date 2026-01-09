import React, { createContext, useContext, useState, useLayoutEffect, ReactNode } from 'react';

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

interface ReferralStrategy {
  l1: number;
  l2: number;
  l3: number;
  withdrawalUnlockReferrals: number;
}

interface CompanyProfile {
  logoUrl: string;
  headerText: string;
  footerText: string;
  whatsapp: string;
  telegram: string;
  facebook: string;
  instagram: string;
  bankName: string;
  bankAccount: string;
  bankTitle: string;
}

interface SystemSettings {
  siteName: string;
  siteLogo: string;
  maintenanceMode: boolean;
  minWithdrawal: number;
  withdrawalFee: number;
  ratePerPage: number;
  supportWhatsApp: string;
  activeThemeId: string;
  themes: ThemePreset[];
  referralStrategy: ReferralStrategy;
  companyProfile: CompanyProfile;
  heroConfig: {
    slides: HeroSlide[];
    transitionDuration: number;
  };
  marqueeConfig: MarqueeConfig;
  modules: {
    referralSystem: boolean;
    registration: boolean;
    dailyCheckIn: boolean;
    livePayoutTicker: boolean;
    kycRequired: boolean;
    demoLogin: boolean;
    requireReferralForWithdraw: boolean;
  };
  streakConfig: {
    isActive: boolean;
    dailyReward: number;
    milestoneReward: number;
  };
  payoutMethods: {
    easyPaisa: { number: string; title: string };
    jazzCash: { number: string; title: string };
  };
}

const defaultSettings: SystemSettings = {
  siteName: "Noor Official",
  siteLogo: "https://res.cloudinary.com/noor-official/image/upload/v1/assets/logo.png",
  maintenanceMode: false,
  minWithdrawal: 500,
  withdrawalFee: 0,
  ratePerPage: 240,
  supportWhatsApp: "923001234567",
  activeThemeId: "pink",
  themes: [
    { id: "pink", name: "Royal Rose", primary: "#E11D48", text: "#1E293B", bg: "#FDF2F8", isDefault: true },
    { id: "black", name: "Slate Noir", primary: "#F43F5E", text: "#F8FAFC", bg: "#0F172A" },
  ],
  referralStrategy: { l1: 15, l2: 5, l3: 2, withdrawalUnlockReferrals: 1 },
  companyProfile: {
    logoUrl: "https://res.cloudinary.com/noor-official/image/upload/v1/assets/logo.png",
    headerText: "Pakistan's Trusted Earning Network",
    footerText: "Verified by Noor Digital Systems © 2024",
    whatsapp: "923001234567",
    telegram: "https://t.me/noorofficial",
    facebook: "https://facebook.com/noorofficial",
    instagram: "https://instagram.com/noorofficial",
    bankName: "HBL Pakistan",
    bankAccount: "PK00HABL1234567890",
    bankTitle: "Noor Official HQ"
  },
  heroConfig: {
    transitionDuration: 6,
    slides: [
      { id: 's1', image: "https://images.unsplash.com/photo-1573163067521-024c04023ec2?auto=format&fit=crop&q=80&w=1920", title: "Earn Money Daily", subtitle: "Join thousands of workers across Pakistan.", buttonText: "Start Earning", buttonLink: "/register" }
    ]
  },
  marqueeConfig: {
    text: "Welcome to Noor Official! Withdrawals are processed instantly today. New work updated! 🚀",
    speed: 25,
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
    livePayoutTicker: true,
    kycRequired: false,
    demoLogin: true,
    requireReferralForWithdraw: true
  },
  payoutMethods: {
    easyPaisa: { number: "03001234567", title: "Noor HQ" },
    jazzCash: { number: "03017654321", title: "Noor Finance" }
  }
};

interface SystemContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  setTheme: (themeId: string) => void;
  isLoading: boolean;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('noor_v4_config');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [isLoading] = useState(false);

  useLayoutEffect(() => {
    const theme = settings.themes.find(t => t.id === settings.activeThemeId) || settings.themes[0];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-text', theme.text);
  }, [settings.activeThemeId, settings.themes]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('noor_v4_config', JSON.stringify(updated));
      return updated;
    });
  };

  const setTheme = (themeId: string) => updateSettings({ activeThemeId: themeId });

  return (
    <SystemContext.Provider value={{ settings, updateSettings, setTheme, isLoading }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem error');
  return context;
};