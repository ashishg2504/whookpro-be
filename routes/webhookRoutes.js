const express = require('express');
const webhookController = require('../controllers/webhookController');
const { validateToken } = require('../middlewares/auth');
const router = express.Router();

router.use(validateToken)

router.post('/create', webhookController.createWebhook);
router.get('/fetchAll', webhookController.getAllWebhook);
router.get('/fetch/:id', webhookController.getWebhookDetail);
router.put('/cancel/:id', webhookController.cancelWebhook);

module.exports = router;