
// Updated User Schema with Plan Interlinking
export const UserSchema = {
  name: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  whatsapp: { type: 'String', required: true },
  currency: { type: 'String', default: 'PKR' },
  balance: { type: 'Number', default: 0 },
  role: { type: 'String', enum: ['user', 'admin'], default: 'user' },
  status: { type: 'String', enum: ['active', 'banned'], default: 'active' },
  completedTasks: { type: 'Number', default: 0 },
  
  // Plan Tracking
  currentPlan: { type: 'String', default: null },
  planStatus: { type: 'String', enum: ['active', 'expired', 'none'], default: 'none' },
  planStartDate: { type: 'Date' },
  planExpiryDate: { type: 'Date' },
  dailyLimit: { type: 'Number', default: 0 },

  // KYC Fields
  kycStatus: { 
    type: 'String', 
    enum: ['pending', 'submitted', 'approved', 'rejected'], 
    default: 'pending' 
  },
  kycImage: { type: 'String' }, // Cloudinary URL
  kycRejectionReason: { type: 'String' },
  createdAt: { type: 'Date', default: 'Date.now' }
};
