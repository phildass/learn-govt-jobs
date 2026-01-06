const express = require('express');
const router = express.Router();
const currentAffairsController = require('../controllers/currentAffairsController');
const { authenticate } = require('../middleware/auth');
const { requireSubscription } = require('../middleware/subscription');

// Public routes (limited access)
router.get('/', currentAffairsController.getCurrentAffairs);
router.get('/:id', currentAffairsController.getById);

// Protected routes (full access requires subscription)
router.get('/category/:category', authenticate, requireSubscription, currentAffairsController.getByCategory);
router.get('/date/:date', authenticate, requireSubscription, currentAffairsController.getByDate);

module.exports = router;
