
// Conceptual Mongoose Model for Dynamic FAQs
export const FAQSchema = {
  question: { type: 'String', required: true },
  answer: { type: 'String', required: true },
  category: { 
    type: 'String', 
    enum: ['General', 'Payment', 'Account'], 
    default: 'General' 
  },
  isActive: { type: 'Boolean', default: true },
  createdAt: { type: 'Date', default: Date.now }
};
