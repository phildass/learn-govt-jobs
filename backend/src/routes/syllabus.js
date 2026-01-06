const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');
const { authenticate } = require('../middleware/auth');
const { requireSubscription } = require('../middleware/subscription');

// All syllabus routes require authentication and subscription
router.use(authenticate, requireSubscription);

router.get('/', syllabusController.getTasks);
router.post('/', syllabusController.createTask);
router.get('/:id', syllabusController.getTaskById);
router.put('/:id', syllabusController.updateTask);
router.delete('/:id', syllabusController.deleteTask);
router.put('/:id/complete', syllabusController.markTaskComplete);

module.exports = router;
