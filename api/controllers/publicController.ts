
// Public Controller for unauthenticated data
export const getPublicSettings = async () => {
  // Simulate fetching from Admin SystemSettings DB
  return {
    siteName: "Noor Official",
    logoUrl: "/logo.png",
    maintenanceMode: false, // Set to true to trigger maintenance screen
    supportNumber: "923001234567",
    currency: "PKR",
    socialLinks: {
      whatsapp: "https://wa.me/923001234567",
      telegram: "https://t.me/noorofficial"
    },
    heroImages: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200"
    ]
  };
};

export const getLiveStats = async () => {
  // Real DB data
  const realUsers = 420;
  const realPayouts = 154000;
  
  // Admin Multiplier (e.g., x30 to look bigger on launch)
  const multiplier = 30;
  
  return {
    totalUsers: realUsers * multiplier,
    totalPayouts: (realPayouts * multiplier).toLocaleString(),
    tasksCompleted: (1240 * multiplier).toLocaleString(),
    activeNow: 48
  };
};

export const getPublicPlans = async () => {
  // Fetch from Plan Collection
  return [
    { id: 'p2', name: 'Student Bundle', price: 500, limit: 5, validity: 30, commission: 5 },
    { id: 'p3', name: 'Gold Package', price: 2000, limit: 15, validity: 30, commission: 10 },
    { id: 'p4', name: 'Diamond Pro', price: 5000, limit: 50, validity: 30, commission: 15 }
  ];
};
