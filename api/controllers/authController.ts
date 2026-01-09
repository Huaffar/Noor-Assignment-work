
// This represents the backend controller logic
export const registerUser = async (data: any) => {
  const { name, email, password, whatsapp } = data;
  
  // Validation for Pakistani Phone Format
  const phoneRegex = /^03\d{9}$/;
  if (!phoneRegex.test(whatsapp.replace(/\D/g, ''))) {
    throw new Error("Invalid Pakistani WhatsApp number. Use format 03XXXXXXXXX");
  }

  // Simulate password hashing and DB save
  const newUser = {
    id: 'u_' + Math.random().toString(36).substr(2, 9),
    name,
    email,
    whatsapp,
    balance: 0,
    currency: 'PKR',
    role: 'user',
    status: 'active',
    completedTasks: 0,
    currentPlan: 'None',
    planStatus: 'none',
    dailyLimit: 0
  };

  return {
    success: true,
    token: "mock_jwt_token_" + Date.now(),
    user: newUser
  };
};

export const loginUser = async (credentials: any) => {
  const { email, password } = credentials;
  
  // Simulate DB lookup for demo users
  if (email === "demo@noorofficial.com") {
    return {
      success: true,
      token: "mock_jwt_token_demo",
      user: {
        id: 'demo_user',
        name: 'Demo Worker',
        email: 'demo@noorofficial.com',
        whatsapp: '03001234567',
        balance: 2450,
        currency: 'PKR',
        completedTasks: 12,
        role: 'user', 
        status: 'active',
        currentPlan: 'Gold Package',
        planStatus: 'active',
        dailyLimit: 8
      }
    };
  }

  if (email === "admin@noorofficial.com") {
    return {
      success: true,
      token: "mock_jwt_token_admin",
      user: {
        id: 'admin_root',
        name: 'Admin Controller',
        email: 'admin@noorofficial.com',
        whatsapp: '03112233445',
        balance: 999999,
        currency: 'PKR',
        role: 'admin', 
        status: 'active',
        currentPlan: 'System Root',
        planStatus: 'active',
        dailyLimit: 100
      }
    };
  }
  
  throw new Error("Invalid credentials");
};
