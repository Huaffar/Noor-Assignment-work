
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', async (req, res) => {
  try {
    const plans = await planController.getAllPlans();
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
