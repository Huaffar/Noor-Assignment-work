import { uploadFile } from '../config/cloudinary';

export const getSettings = async () => {
  return {
    siteName: "Noor Official",
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
    heroConfig: {
      transitionDuration: 6,
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
      livePayoutTicker: true,
      kycRequired: false,
      demoLogin: true
    },
    payoutMethods: {
      easyPaisa: { number: "03001234567", title: "Noor Official HQ" },
      jazzCash: { number: "03017654321", title: "Noor Official Finance" }
    },
    companySEO: {
      description: "Earn daily PKR rewards by completing simple handwriting and digital assignments on Pakistan's premium task earning network."
    }
  };
};

export const updateSettings = async (adminId: string, payload: any) => {
  console.log(`[CORE_SYNC] Global Override initiated by ${adminId}`);
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    success: true,
    message: "Network Logic Synchronized",
    updatedAt: new Date().toISOString()
  };
};