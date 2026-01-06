const { Payment, Subscription } = require('../models');
const logger = require('../config/logger');

exports.createOrder = async (req, res) => {
  try {
    const { subscriptionId, paymentGateway = 'razorpay' } = req.body;

    const subscription = await Subscription.findOne({
      where: {
        id: subscriptionId,
        userId: req.user.id
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      subscriptionId: subscription.id,
      amount: subscription.amount,
      currency: subscription.currency,
      paymentGateway,
      status: 'pending'
    });

    // TODO: Create order with Razorpay/Stripe
    // Development mode: Return mock data
    if (process.env.NODE_ENV !== 'production') {
      return res.json({
        success: true,
        message: 'Payment order created (DEVELOPMENT MODE)',
        data: {
          payment,
          orderId: 'mock_order_' + payment.id
        }
      });
    }

    // Production: Implement actual payment gateway integration
    throw new Error('Payment gateway integration required for production');
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment order'
    });
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment order'
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      paymentId,
      gatewayPaymentId,
      gatewayOrderId,
      gatewaySignature
    } = req.body;

    const payment = await Payment.findByPk(paymentId);

    if (!payment || payment.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    // TODO: Verify signature with gateway

    await payment.update({
      status: 'completed',
      gatewayPaymentId,
      gatewayOrderId,
      gatewaySignature
    });

    // Activate subscription
    const subscription = await Subscription.findByPk(payment.subscriptionId);
    if (subscription) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // Annual subscription

      await subscription.update({
        status: 'active',
        startDate,
        endDate,
        paymentId: payment.id
      });
    }

    res.json({
      success: true,
      message: 'Payment verified and subscription activated'
    });
  } catch (error) {
    logger.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment'
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [{ model: Subscription, as: 'subscription' }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { payments }
    });
  } catch (error) {
    logger.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment history'
    });
  }
};

exports.razorpayWebhook = async (req, res) => {
  try {
    // TODO: Implement Razorpay webhook handling
    logger.info('Razorpay webhook received:', req.body);
    res.json({ success: true });
  } catch (error) {
    logger.error('Razorpay webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

exports.stripeWebhook = async (req, res) => {
  try {
    // TODO: Implement Stripe webhook handling
    logger.info('Stripe webhook received:', req.body);
    res.json({ success: true });
  } catch (error) {
    logger.error('Stripe webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
