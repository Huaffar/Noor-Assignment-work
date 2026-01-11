
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', async (req, res) => {
  try {
    const result = await authController.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authController.loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
});

module.exports = router;
