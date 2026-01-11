// Conceptual Schema for Backend Settings Core
export const GlobalConfigSchema = {
  general: {
    siteName: { type: 'String', default: 'Noor Official' },
    siteLogo: { type: 'String' }, // Cloudinary URL
    currencySymbol: { type: 'String', default: 'PKR' },
    primaryColor: { type: 'String', default: '#E11D48' },
    supportWhatsApp: { type: 'String', default: '923001234567' }
  },
  seo: {
    metaTitle: { type: 'String', default: "Noor Official | Pakistan's Trusted Earning Hub" },
    metaDescription: { type: 'String' },
    googleAnalyticsId: { type: 'String' },
    facebookPixelId: { type: 'String' }
  },
  configuration: {
    minWithdrawal: { type: 'Number', default: 500 },
    depositBonus: { type: 'Number', default: 10 },
    maintenanceMode: { type: 'Boolean', default: false },
    emailAlerts: { type: 'Boolean', default: true },
    smsGatewayActive: { type: 'Boolean', default: false }
  },
  advanced: {
    customCss: { type: 'String' },
    cacheLevel: { type: 'String', enum: ['standard', 'aggressive', 'bypass'], default: 'standard' }
  },
  updatedAt: { type: 'Date', default: 'Date.now' }
};