
// Conceptual Mongoose Model for Backend
// In a real environment, this would be used with mongoose.model()

export const UserSchema = {
  name: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  whatsapp: { type: 'String', required: true }, // Format: 03XX-XXXXXXX
  currency: { type: 'String', default: 'PKR' },
  balance: { type: 'Number', default: 0 },
  role: { type: 'String', enum: ['user', 'admin'], default: 'user' },
  status: { type: 'String', enum: ['active', 'banned'], default: 'active' },
  completedTasks: { type: 'Number', default: 0 },
  createdAt: { type: 'Date', default: 'Date.now' }
};
