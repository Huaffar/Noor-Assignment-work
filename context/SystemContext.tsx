
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
  secondary: string;
  text: string;
  bg: string;
  card: string;
  gradient: string;
  isDefault?: boolean;
}

export interface CardSettings {
  borderRadius: string;
  shadowDepth: string;
  borderWidth: string;
  glassMode: boolean;
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
  cardSettings: CardSettings;
  referralStrategy: {
    l1: number;
    l2: number;
    l3: number;
    withdrawalUnlockReferrals: number;
  };
  companyProfile: {
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
  };
  heroConfig: {
    slides: HeroSlide[];
    transitionDuration: number;
  };
  marqueeConfig: {
    text: string;
    speed: number;
    fontSize: string;
    textColor: string;
    bgColor: string;
    isActive: boolean;
    scale: number;
  };
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
  activeThemeId: "sky",
  cardSettings: {
    borderRadius: "2rem",
    shadowDepth: "0 10px 25px -5px rgba(0,0,0,0.05)",
    borderWidth: "1px",
    glassMode: false
  },
  themes: [
    { 
      id: "sky", 
      name: "Sky Blue", 
      primary: "#0ea5e9", 
      secondary: "#f0f9ff", 
      text: "#0f172a", 
      bg: "#f8fafc", 
      card: "#ffffff",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      isDefault: true 
    },
    { 
      id: "black", 
      name: "Slate Noir", 
      primary: "#38bdf8", 
      secondary: "#1e293b", 
      text: "#f8fafc", 
      bg: "#020617", 
      card: "#0f172a",
      gradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
    },
    { 
      id: "pink", 
      name: "Royal Rose", 
      primary: "#e11d48", 
      secondary: "#fff1f2", 
      text: "#1e293b", 
      bg: "#fff5f6", 
      card: "#ffffff",
      gradient: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)"
    },
  ],
  referralStrategy: { l1: 15, l2: 5, l3: 2, withdrawalUnlockReferrals: 1 },
  companyProfile: {
    logoUrl: "https://res.cloudinary.com/noor-official/image/upload/v1/assets/logo.png",
    headerText: "Pakistan's Trusted Earning Hub",
    footerText: "Verified by Noor Digital © 2024",
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
      { id: 's1', image: "https://images.unsplash.com/photo-1573163067521-024c04023ec2?auto=format&fit=crop&q=80&w=1920", title: "Earn Daily", subtitle: "Join thousands of workers today.", buttonText: "Start Now", buttonLink: "/register" }
    ]
  },
  marqueeConfig: {
    text: "Welcome! New work added. Instant payments active! 🚀",
    speed: 25,
    fontSize: "text-[8px]",
    textColor: "#0ea5e9",
    bgColor: "#f0f9ff",
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
    easyPaisa: { number: "03001234567", title: "Noor Hub" },
    jazzCash: { number: "03017654321", title: "Noor Cashier" }
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
    const saved = localStorage.getItem('noor_v5_architect');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [isLoading] = useState(false);

  useLayoutEffect(() => {
    const theme = settings.themes.find(t => t.id === settings.activeThemeId) || settings.themes[0];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-card', theme.card);
    root.style.setProperty('--theme-gradient', theme.gradient);
    
    // Card Architecture Variables
    root.style.setProperty('--card-radius', settings.cardSettings.borderRadius);
    root.style.setProperty('--card-shadow', settings.cardSettings.shadowDepth);
    root.style.setProperty('--card-border', settings.cardSettings.borderWidth);
    
    if (settings.cardSettings.glassMode) {
      root.style.setProperty('--card-opacity', '0.85');
      root.style.setProperty('--card-blur', '16px');
    } else {
      root.style.setProperty('--card-opacity', '1');
      root.style.setProperty('--card-blur', '0px');
    }
  }, [settings.activeThemeId, settings.themes, settings.cardSettings]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('noor_v5_architect', JSON.stringify(updated));
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
