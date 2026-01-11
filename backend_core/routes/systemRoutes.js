
const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/settings', async (req, res) => {
  try {
    const settings = await settingsController.getSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/settings', async (req, res) => {
  try {
    const result = await settingsController.updateSettings('admin_root', req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
