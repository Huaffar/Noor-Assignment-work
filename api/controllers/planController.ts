
export const getAllPlans = async () => {
  return [
    { id: 'p1', name: 'Free Tier', price: 0, dailyLimit: 1, validityDays: 365 },
    { id: 'p2', name: 'Student Bundle', price: 500, dailyLimit: 5, validityDays: 30 },
    { id: 'p3', name: 'Gold Package', price: 2000, dailyLimit: 15, validityDays: 30 }
  ];
};

export const createPlan = async (data: any) => {
  console.log("Creating plan:", data);
  return { success: true, plan: { ...data, id: 'p_' + Date.now() } };
};

export const deletePlan = async (planId: string) => {
  console.log("Deleting plan:", planId);
  return { success: true };
};
