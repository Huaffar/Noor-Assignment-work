import { IPlan } from '../models/Plan';

let plans: IPlan[] = [
  { id: 'p1', name: 'Student Bundle', price: 500, dailyLimit: 2, validityType: 'monthly', validityValue: 30, badgeColor: '#fb7185', isRecommended: false, isDeleted: false, createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Standard Node', price: 1500, dailyLimit: 5, validityType: 'monthly', validityValue: 30, badgeColor: '#f472b6', isRecommended: false, isDeleted: false, createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Gold Package', price: 3500, dailyLimit: 12, validityType: 'monthly', validityValue: 30, badgeColor: '#E11D48', isRecommended: true, isDeleted: false, createdAt: new Date().toISOString() },
  { id: 'p4', name: 'Diamond Pro', price: 7000, dailyLimit: 25, validityType: 'monthly', validityValue: 30, badgeColor: '#1e293b', isRecommended: false, isDeleted: false, createdAt: new Date().toISOString() }
];

export const getAllPlans = async (includeDeleted = false) => {
  return plans.filter(p => includeDeleted ? p.isDeleted : !p.isDeleted);
};

export const createPlan = async (data: any) => {
  const newPlan = { ...data, id: 'plan_' + Date.now(), isDeleted: false, createdAt: new Date().toISOString() };
  plans = [newPlan, ...plans];
  return { success: true, plan: newPlan };
};

export const updatePlan = async (id: string, data: any) => {
  plans = plans.map(p => p.id === id ? { ...p, ...data } : p);
  return { success: true };
};

export const softDeletePlan = async (id: string) => {
  plans = plans.map(p => p.id === id ? { ...p, isDeleted: true } : p);
  return { success: true };
};

export const restorePlan = async (id: string) => {
  plans = plans.map(p => p.id === id ? { ...p, isDeleted: false } : p);
  return { success: true };
};

export const purgePlan = async (id: string) => {
  plans = plans.filter(p => p.id !== id);
  return { success: true };
};
