// Mock Backend Controller for Global Configuration
let globalConfig = {
  general: { siteName: "Noor Official", currencySymbol: "PKR", primaryColor: "#E11D48", supportWhatsApp: "923001234567" },
  seo: { metaTitle: "Pakistan's Earning Hub", metaDescription: "Home earning portal" },
  configuration: { minWithdrawal: 500, depositBonus: 10, maintenanceMode: false, emailAlerts: true, smsGatewayActive: false },
  advanced: { customCss: "", isDemoMode: true }
};

exports.getSettings = async () => globalConfig;

exports.updateGeneral = async (data) => {
  globalConfig.general = { ...globalConfig.general, ...data };
  return { success: true, message: "General Settings Updated", data: globalConfig.general };
};

exports.updateSEO = async (data) => {
  globalConfig.seo = { ...globalConfig.seo, ...data };
  return { success: true, message: "SEO Parameters Synchronized", data: globalConfig.seo };
};

exports.updateConfig = async (data) => {
  globalConfig.configuration = { ...globalConfig.configuration, ...data };
  return { success: true, message: "Core Configuration Applied", data: globalConfig.configuration };
};

exports.resetSystem = async (scope) => {
  console.warn(`[SYSTEM] Reset initiated for scope: ${scope}`);
  // Logic to clear specific DB collections based on scope
  return { success: true, message: `System scope [${scope}] cleared successfully` };
};