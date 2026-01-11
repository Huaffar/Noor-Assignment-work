
exports.registerUser = async (data) => {
  const { name, email, password, whatsapp } = data;
  const phoneRegex = /^03\d{9}$/;
  if (!phoneRegex.test(whatsapp.replace(/\D/g, ''))) {
    throw new Error("Invalid Pakistani WhatsApp number. Use format 03XXXXXXXXX");
  }

  const newUser = {
    id: 'u_' + Math.random().toString(36).substr(2, 9),
    name, email, whatsapp, balance: 0,
    currency: 'PKR', role: 'user', status: 'active',
    completedTasks: 0, currentPlan: 'None',
    planStatus: 'none', dailyLimit: 0
  };

  return { success: true, token: "jwt_" + Date.now(), user: newUser };
};

exports.loginUser = async (credentials) => {
  const { email, password } = credentials;
  if (email === "demo@noorofficial.com") {
    return {
      success: true,
      token: "jwt_demo",
      user: {
        id: 'demo_user', name: 'Demo Worker', email: 'demo@noorofficial.com',
        whatsapp: '03001234567', balance: 2450, currency: 'PKR',
        completedTasks: 12, role: 'user', status: 'active',
        currentPlan: 'Gold Package', planStatus: 'active', dailyLimit: 8
      }
    };
  }
  if (email === "admin@noorofficial.com") {
    return {
      success: true,
      token: "jwt_admin",
      user: {
        id: 'admin_root', name: 'Admin Manager', email: 'admin@noorofficial.com',
        role: 'admin', balance: 999999, status: 'active'
      }
    };
  }
  throw new Error("Invalid credentials");
};
