
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', async (req, res) => {
  try {
    const stats = await adminController.getAdminDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/plan-requests', async (req, res) => {
  try {
    const requests = await adminController.getPlanRequests();
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
