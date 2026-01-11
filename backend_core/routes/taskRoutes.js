
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/assignment', async (req, res) => {
  try {
    const result = await taskController.getDailyAssignment(req.query.userId, req.body.user);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { userId, taskId, image, user } = req.body;
    const result = await taskController.submitWork(userId, taskId, image, user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
