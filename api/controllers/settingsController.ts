
import { uploadFile } from '../config/cloudinary';

export const getSettings = async () => {
  // Simulating fetching from Admin SystemSettings DB
  return {
    siteName: "Noor Earning Platform",
    maintenanceMode: false,
    minWithdrawal: 500,
    supportWhatsApp: "923001234567",
    activeThemeId: "pink",
    themes: [
      { id: "pink", name: "Royal Rose", primary: "#E11D48", text: "#1E293B", bg: "#FDF2F8", isDefault: true },
      { id: "green", name: "Emerald Growth", primary: "#10B981", text: "#064E3B", bg: "#F0FDF4" },
      { id: "black", name: "Slate Noir", primary: "#F43F5E", text: "#F8FAFC", bg: "#0F172A" },
      { id: "blue", name: "Oceanic Blue", primary: "#2563EB", text: "#1E3A8A", bg: "#EFF6FF" },
      { id: "yellow", name: "Amber Gold", primary: "#D97706", text: "#78350F", bg: "#FFFBEB" }
    ],
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
    payoutMethods: {
      easyPaisa: { number: "03001234567", title: "Noor Official HQ" },
      jazzCash: { number: "03017654321", title: "Noor Official Finance" }
    }
  };
};

export const updateSettings = async (adminId: string, payload: any) => {
  console.log(`[BACKEND] Admin ${adminId} triggered global configuration sync...`);
  console.log(`[BACKEND] Sync Payload:`, payload);
  
  // Simulate network delay for production-like feel
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: "Platform Engine Synchronized Across All Nodes",
    updatedAt: new Date().toISOString()
  };
};
