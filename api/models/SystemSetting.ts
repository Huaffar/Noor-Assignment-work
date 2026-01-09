
// Conceptual Mongoose Model for System Settings
export const SystemSettingSchema = {
  general: {
    siteName: { type: 'String', default: 'Noor Earning Platform' },
    logoUrl: { type: 'String', default: '' },
    footerText: { type: 'String', default: 'Pakistan\'s Premium Micro-Task Platform' },
    copyrightText: { type: 'String', default: '© 2024 Noor Official. All rights reserved.' }
  },
  hero: {
    heroImageUrl: { type: 'String', default: 'https://images.unsplash.com/photo-1573163067521-024c04023ec2?auto=format&fit=crop&q=80&w=1920' },
    heroCrop: { 
      x: { type: 'Number', default: 0 },
      y: { type: 'Number', default: 0 }
    },
    heroZoom: { type: 'Number', default: 1 }
  },
  company: {
    whatsappNumber: { type: 'String', default: '923001234567' },
    supportEmail: { type: 'String', default: 'support@noorofficial.com' },
    address: { type: 'String', default: 'Lahore, Pakistan' }
  },
  socials: {
    facebook: { type: 'String', default: '' },
    instagram: { type: 'String', default: '' },
    youtube: { type: 'String', default: '' },
    telegram: { type: 'String', default: '' }
  },
  modules: {
    isMaintenanceMode: { type: 'Boolean', default: false },
    allowRegistrations: { type: 'Boolean', default: true },
    enableReferralSystem: { type: 'Boolean', default: true }
  },
  finance: {
    currency: { type: 'String', default: 'PKR' },
    referralBonusPercentage: { type: 'Number', default: 10 },
    minWithdrawalLimit: { type: 'Number', default: 500 },
    paymentMethods: [
      {
        provider: { type: 'String', enum: ['EasyPaisa', 'JazzCash', 'Bank'] },
        number: { type: 'String' },
        title: { type: 'String' },
        bankName: { type: 'String' }, // Optional for bank
        iban: { type: 'String' }      // Optional for bank
      }
    ]
  },
  appearance: {
    heroImages: [{ type: 'String' }],
    activeThemeId: { type: 'String', default: 'pink' },
    themes: [
      {
        id: { type: 'String' },
        name: { type: 'String' },
        primary: { type: 'String' },
        text: { type: 'String' },
        bg: { type: 'String' },
        isDefault: { type: 'Boolean' }
      }
    ]
  },
  updatedAt: { type: 'Date', default: Date.now }
};
