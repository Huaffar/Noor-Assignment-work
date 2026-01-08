
// Conceptual Mongoose Schema for Administrators
export const AdminSchema = {
  name: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true }, // To be hashed with bcrypt
  role: { 
    type: 'String', 
    enum: ['super_admin', 'manager', 'support'], 
    default: 'super_admin' 
  },
  status: { type: 'String', enum: ['active', 'suspended'], default: 'active' },
  createdBy: { type: 'ObjectId', ref: 'Admin' },
  lastLogin: { type: 'Date' },
  createdAt: { type: 'Date', default: Date.now }
};
