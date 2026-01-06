const { Subscription } = require('../models');

const requireSubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Check for active subscription
    const subscription = await Subscription.findOne({
      where: {
        userId: req.user.id,
        status: 'active',
      }
    });

    if (!subscription) {
      return res.status(403).json({
        success: false,
        error: 'Active subscription required',
        message: 'Please subscribe to access this feature'
      });
    }

    // Check if subscription is expired
    if (subscription.endDate && new Date() > new Date(subscription.endDate)) {
      await subscription.update({ status: 'expired' });
      return res.status(403).json({
        success: false,
        error: 'Subscription expired',
        message: 'Please renew your subscription'
      });
    }

    req.subscription = subscription;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to verify subscription'
    });
  }
};

module.exports = { requireSubscription };
