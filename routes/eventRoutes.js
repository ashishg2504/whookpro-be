const express = require('express');
const eventController = require('../controllers/eventController');
const { validateToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/:code', eventController.createEvent);

// Protected Routes Below 
router.use(validateToken)

router.get("/:id", eventController.getAllEvent)

module.exports = router;