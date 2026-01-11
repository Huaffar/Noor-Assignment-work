
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/dashboard/:id', async (req, res) => {
  try {
    const stats = await userController.getDashboardStats(req.params.id);
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/referrals/:id', async (req, res) => {
  try {
    const data = await userController.getReferralData(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
