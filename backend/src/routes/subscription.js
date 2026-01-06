const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');

// All subscription routes require authentication
router.use(authenticate);

router.post('/create', subscriptionController.createSubscription);
router.get('/current', subscriptionController.getCurrentSubscription);
router.get('/history', subscriptionController.getSubscriptionHistory);
router.post('/cancel', subscriptionController.cancelSubscription);
router.post('/renew', subscriptionController.renewSubscription);

module.exports = router;
