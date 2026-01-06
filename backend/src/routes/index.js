const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./user');
const jobRoutes = require('./job');
const subscriptionRoutes = require('./subscription');
const paymentRoutes = require('./payment');
const notificationRoutes = require('./notification');
const syllabusRoutes = require('./syllabus');
const currentAffairsRoutes = require('./currentAffairs');

// API version and disclaimer
router.get('/', (req, res) => {
  res.json({
    message: 'Learn Govt Jobs API',
    version: process.env.API_VERSION || 'v1',
    disclaimer: process.env.DISCLAIMER_TEXT,
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      jobs: '/api/jobs',
      subscriptions: '/api/subscriptions',
      payments: '/api/payments',
      notifications: '/api/notifications',
      syllabus: '/api/syllabus',
      currentAffairs: '/api/current-affairs'
    }
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/payments', paymentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/syllabus', syllabusRoutes);
router.use('/current-affairs', currentAffairsRoutes);

module.exports = router;
