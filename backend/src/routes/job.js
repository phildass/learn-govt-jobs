const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middleware/auth');
const { requireSubscription } = require('../middleware/subscription');

// Public routes (basic info only)
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected routes (full details require subscription)
router.get('/:id/details', authenticate, requireSubscription, jobController.getJobDetails);
router.post('/:id/bookmark', authenticate, jobController.bookmarkJob);
router.delete('/:id/bookmark', authenticate, jobController.removeBookmark);
router.get('/user/bookmarks', authenticate, jobController.getUserBookmarks);

// Application routes
router.post('/:id/apply', authenticate, requireSubscription, jobController.applyToJob);

module.exports = router;
