
export const getAllPlans = async () => {
  return [
    { 
      id: 'p1', 
      name: 'Starter Plan', 
      price: 1000, 
      dailyLimit: 1, 
      validityDays: 30,
      analytics: {
        totalSubscribers: 1250,
        activeSubscribers: 850,
        tasksCompleted: 4500,
        grossRevenue: 1250000
      }
    },
    { 
      id: 'p2', 
      name: 'Professional Bundle', 
      price: 2500, 
      dailyLimit: 5, 
      validityDays: 30,
      analytics: {
        totalSubscribers: 840,
        activeSubscribers: 620,
        tasksCompleted: 15400,
        grossRevenue: 2100000
      }
    },
    { 
      id: 'p3', 
      name: 'Elite Gold', 
      price: 5000, 
      dailyLimit: 15, 
      validityDays: 30,
      analytics: {
        totalSubscribers: 420,
        activeSubscribers: 390,
        tasksCompleted: 28900,
        grossRevenue: 2100000
      }
    }
  ];
};

export const createPlan = async (data: any) => {
  return { success: true, plan: { ...data, id: 'p_' + Date.now(), analytics: { totalSubscribers: 0, tasksCompleted: 0, grossRevenue: 0 } } };
};
