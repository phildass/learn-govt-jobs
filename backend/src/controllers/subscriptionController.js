const { Subscription, Payment } = require('../models');
const logger = require('../config/logger');

exports.createSubscription = async (req, res) => {
  try {
    const { planType = 'annual', paymentGateway = 'razorpay' } = req.body;

    // Check for existing active subscription
    const existing = await Subscription.findOne({
      where: {
        userId: req.user.id,
        status: 'active'
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'You already have an active subscription'
      });
    }

    const amount = parseFloat(process.env.ANNUAL_SUBSCRIPTION_PRICE) || 999;

    const subscription = await Subscription.create({
      userId: req.user.id,
      planType,
      amount,
      currency: process.env.CURRENCY || 'INR',
      paymentGateway,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created. Please complete payment.',
      data: { subscription }
    });
  } catch (error) {
    logger.error('Create subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create subscription'
    });
  }
};

exports.getCurrentSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: {
        userId: req.user.id,
        status: 'active'
      },
      include: [{ model: Payment, as: 'payments' }]
    });

    res.json({
      success: true,
      data: { subscription }
    });
  } catch (error) {
    logger.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription'
    });
  }
};

exports.getSubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { subscriptions }
    });
  } catch (error) {
    logger.error('Get subscription history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription history'
    });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { reason } = req.body;

    const subscription = await Subscription.findOne({
      where: {
        userId: req.user.id,
        status: 'active'
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'No active subscription found'
      });
    }

    await subscription.update({
      status: 'cancelled',
      cancelledAt: new Date(),
      cancellationReason: reason,
      autoRenew: false
    });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    logger.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription'
    });
  }
};

exports.renewSubscription = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Not implemented yet'
  });
};
