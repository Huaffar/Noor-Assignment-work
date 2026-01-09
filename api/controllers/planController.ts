import { IPlan } from '../models/Plan';

// Mock DB for demonstration
let plans: IPlan[] = [
  { id: 'p1', name: 'Student Bundle', price: 500, dailyLimit: 2, validityType: 'monthly', validityValue: 30, badgeColor: '#fb7185', isRecommended: false, isDeleted: false, createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Gold Package', price: 2000, dailyLimit: 8, validityType: 'monthly', validityValue: 30, badgeColor: '#E11D48', isRecommended: true, isDeleted: false, createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Diamond Pro', price: 5000, dailyLimit: 25, validityType: 'monthly', validityValue: 30, badgeColor: '#1e293b', isRecommended: false, isDeleted: false, createdAt: new Date().toISOString() }
];

export const getAllPlans = async (includeDeleted = false) => {
  return plans.filter(p => includeDeleted ? p.isDeleted : !p.isDeleted);
};

export const createPlan = async (data: Omit<IPlan, 'id' | 'createdAt'>) => {
  const newPlan: IPlan = {
    ...data,
    id: 'plan_' + Math.random().toString(36).substr(2, 9),
    isDeleted: false,
    createdAt: new Date().toISOString()
  };
  plans = [newPlan, ...plans];
  return { success: true, plan: newPlan };
};

export const updatePlan = async (id: string, data: Partial<IPlan>) => {
  plans = plans.map(p => p.id === id ? { ...p, ...data } : p);
  return { success: true };
};

export const softDeletePlan = async (id: string) => {
  plans = plans.map(p => p.id === id ? { ...p, isDeleted: true, deletedAt: new Date().toISOString() } : p);
  return { success: true };
};

export const restorePlan = async (id: string) => {
  plans = plans.map(p => p.id === id ? { ...p, isDeleted: false, deletedAt: undefined } : p);
  return { success: true };
};

export const purgePlan = async (id: string) => {
  plans = plans.filter(p => p.id !== id);
  return { success: true };
};