
const express = require('express');
const cors = require('cors');

// Kernel Module Imports
const authRoutes = require('../backend_core/routes/authRoutes');
const userRoutes = require('../backend_core/routes/userRoutes');
const taskRoutes = require('../backend_core/routes/taskRoutes');
const planRoutes = require('../backend_core/routes/planRoutes');
const adminRoutes = require('../backend_core/routes/adminRoutes');
const systemRoutes = require('../backend_core/routes/systemRoutes');
const financialRoutes = require('../backend_core/routes/financialRoutes');

const app = express();

// Global Kernel Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// System Health Pulse
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Kernel v4.5.1 Online', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString() 
  });
});

// Monolith Routing Table
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/finance', financialRoutes);

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Node Point Not Found" });
});

// Platform Exception Boundary
app.use((err, req, res, next) => {
  console.error('[KERNEL_CRITICAL]', err);
  res.status(500).json({ 
    success: false, 
    message: "Kernel Panic: " + err.message,
    code: 500
  });
});

module.exports = app;
