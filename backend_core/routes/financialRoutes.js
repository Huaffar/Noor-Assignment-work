
const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');

router.post('/withdraw-request', async (req, res) => {
  try {
    const result = await financialController.processWithdrawal(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await financialController.getGlobalFinStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
