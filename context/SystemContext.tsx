
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  minWithdrawal: number;
  supportWhatsApp: string;
  payoutMethods: {
    easyPaisa: { number: string; title: string };
    jazzCash: { number: string; title: string };
  };
  liveStats: {
    totalUsers: number;
    totalPayouts: string;
    tasksCompleted: string;
  };
}

interface SystemContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  isLoading: boolean;
}

const defaultSettings: SystemSettings = {
  siteName: "Noor Official",
  maintenanceMode: false,
  minWithdrawal: 500,
  supportWhatsApp: "923001234567",
  payoutMethods: {
    easyPaisa: { number: "03001234567", title: "Noor Official HQ" },
    jazzCash: { number: "03017654321", title: "Noor Official Finance" }
  },
  liveStats: {
    totalUsers: 37500,
    totalPayouts: "4,620,000",
    tasksCompleted: "37,200"
  }
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching public settings and live stats on mount
    const fetchSystemData = async () => {
      try {
        // In a real app: const data = await axios.get('/api/public/settings')
        await new Promise(resolve => setTimeout(resolve, 800)); // Sim delay
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to sync system settings");
        setIsLoading(false);
      }
    };
    fetchSystemData();
  }, []);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SystemContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within a SystemProvider');
  return context;
};
