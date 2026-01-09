
export type PlanValidity = 'lifetime' | 'monthly' | 'yearly' | 'daily';

export interface IPlan {
  id: string;
  name: string;
  price: number;
  dailyLimit: number;
  validityType: PlanValidity;
  validityValue: number;
  badgeColor: string;
  isRecommended: boolean;
  description?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt: string;
}

export const PlanSchema = {
  name: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  dailyLimit: { type: 'Number', required: true },
  validityType: { type: 'String', enum: ['lifetime', 'monthly', 'yearly', 'daily'], default: 'monthly' },
  validityValue: { type: 'Number', default: 30 },
  badgeColor: { type: 'String', default: '#f472b6' },
  isRecommended: { type: 'Boolean', default: false },
  isDeleted: { type: 'Boolean', default: false },
  deletedAt: { type: 'Date' },
  description: { type: 'String' },
  createdAt: { type: 'Date', default: 'Date.now' }
};
