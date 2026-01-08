
// Conceptual Mongoose Model for Plans
export const PlanSchema = {
  name: { type: 'String', required: true },
  price: { type: 'Number', required: true }, // Price in PKR
  dailyLimit: { type: 'Number', required: true }, // Max tasks per day
  validityDays: { type: 'Number', required: true },
  description: { type: 'String' },
  createdAt: { type: 'Date', default: 'Date.now' }
};
