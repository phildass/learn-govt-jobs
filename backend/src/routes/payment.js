const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

// Payment routes
router.post('/create-order', authenticate, paymentController.createOrder);
router.post('/verify', authenticate, paymentController.verifyPayment);
router.get('/history', authenticate, paymentController.getPaymentHistory);

// Webhook routes (no authentication)
router.post('/webhook/razorpay', paymentController.razorpayWebhook);
router.post('/webhook/stripe', paymentController.stripeWebhook);

module.exports = router;
