const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// All routes here should be protected by restrictTo('admin')
router.get('/', async (req, res) => {
  const settings = await settingsController.getSettings();
  res.json({ success: true, data: settings });
});

router.put('/general', async (req, res) => {
  const result = await settingsController.updateGeneral(req.body);
  res.json(result);
});

router.put('/seo', async (req, res) => {
  const result = await settingsController.updateSEO(req.body);
  res.json(result);
});

router.put('/config', async (req, res) => {
  const result = await settingsController.updateConfig(req.body);
  res.json(result);
});

router.post('/reset', async (req, res) => {
  const result = await settingsController.resetSystem(req.body.scope);
  res.json(result);
});

module.exports = router;