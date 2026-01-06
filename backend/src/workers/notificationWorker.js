const Queue = require('bull');
const { Notification } = require('../models');
const logger = require('../config/logger');

// Create notification queue
const notificationQueue = new Queue('notifications', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  }
});

// Process notification tasks
notificationQueue.process(async (job) => {
  const { userId, jobId, type, title, message, priority, actionUrl, metadata } = job.data;
  
  try {
    // Create notification in database
    const notification = await Notification.create({
      userId,
      jobId,
      type,
      title,
      message,
      priority,
      actionUrl,
      metadata
    });
    
    // TODO: Send push notification, email, SMS based on user preferences
    
    logger.info(`Notification sent to user ${userId}: ${title}`);
    
    return { notificationId: notification.id };
  } catch (error) {
    logger.error('Notification sending failed:', error);
    throw error;
  }
});

// Helper function to queue notification
const sendNotification = async (notificationData) => {
  return await notificationQueue.add(notificationData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

// Event listeners
notificationQueue.on('completed', (job, result) => {
  logger.debug('Notification sent:', result);
});

notificationQueue.on('failed', (job, err) => {
  logger.error('Notification failed:', err);
});

module.exports = {
  notificationQueue,
  sendNotification
};
