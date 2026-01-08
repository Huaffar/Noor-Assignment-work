
import { uploadFile } from '../config/cloudinary';

export const getSettings = async () => {
  // Mocking the DB fetch with updated site name and theme engine
  return {
    general: {
      siteName: "Noor Earning Platform",
      logoUrl: "https://placehold.co/200x50/e11d48/white?text=NOOR",
      footerText: "Pakistan's premium micro-task platform. Empowering thousands to earn daily.",
      copyrightText: "© 2024 Noor Official. All rights reserved."
    },
    company: {
      whatsappNumber: "923001234567",
      supportEmail: "support@noorofficial.com",
      address: "DHA Phase 5, Lahore, PK"
    },
    socials: {
      facebook: "https://fb.com/noorofficial",
      instagram: "https://insta.com/noorofficial",
      youtube: "https://youtube.com/noorofficial",
      telegram: "https://t.me/noorofficial"
    },
    modules: {
      isMaintenanceMode: false,
      allowRegistrations: true,
      enableReferralSystem: true
    },
    finance: {
      currency: "PKR",
      referralBonusPercentage: 10,
      minWithdrawalLimit: 500,
      paymentMethods: [
        { provider: "EasyPaisa", number: "03001234567", title: "Noor Official HQ" },
        { provider: "JazzCash", number: "03017654321", title: "Finance Dept" }
      ]
    },
    appearance: {
      heroImages: [
        "https://images.unsplash.com/photo-1573163067521-024c04023ec2?q=80&w=1920",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920"
      ],
      activeThemeId: "pink",
      themes: [
        { id: "pink", name: "Royal Rose", primary: "#E11D48", text: "#1E293B", bg: "#FDF2F8", isDefault: true },
        { id: "green", name: "Emerald Growth", primary: "#10B981", text: "#064E3B", bg: "#F0FDF4", isDefault: false },
        { id: "black", name: "Slate Noir", primary: "#1E293B", text: "#F8FAFC", bg: "#0F172A", isDefault: false },
        { id: "blue", name: "Oceanic Blue", primary: "#2563EB", text: "#1E3A8A", bg: "#EFF6FF", isDefault: false },
        { id: "yellow", name: "Amber Gold", primary: "#D97706", text: "#78350F", bg: "#FFFBEB", isDefault: false }
      ]
    }
  };
};

export const updateSettings = async (adminId: string, payload: any) => {
  console.log(`Admin ${adminId} updating system core...`, payload);
  await new Promise(resolve => setTimeout(resolve, 1200));
  return {
    success: true,
    message: "Global Configuration Synchronized",
    updatedAt: new Date().toISOString()
  };
};

export const uploadLogo = async (file: any) => {
  const url = await uploadFile(file);
  return { success: true, url };
};
