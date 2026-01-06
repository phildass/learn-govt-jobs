const Queue = require('bull');
const redis = require('../config/redis');
const scrapingService = require('../services/scrapingService');
const logger = require('../config/logger');

// Create job scraping queue
const jobScrapingQueue = new Queue('job-scraping', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  }
});

// Process job scraping tasks
jobScrapingQueue.process(async (job) => {
  logger.info('Starting job scraping task...');
  
  try {
    // Scrape all sources
    const scrapedJobs = await scrapingService.scrapeAllSources();
    
    // Save new jobs to database
    const savedCount = await scrapingService.saveJobs(scrapedJobs);
    
    logger.info(`Scraping completed: ${scrapedJobs.length} found, ${savedCount} new jobs saved`);
    
    return {
      totalScraped: scrapedJobs.length,
      newJobsSaved: savedCount,
      timestamp: new Date()
    };
  } catch (error) {
    logger.error('Job scraping failed:', error);
    throw error;
  }
});

// Schedule recurring job scraping
const scheduleJobScraping = () => {
  const intervalMinutes = parseInt(process.env.JOB_CHECK_INTERVAL_MINUTES) || 30;
  
  jobScrapingQueue.add(
    {},
    {
      repeat: {
        every: intervalMinutes * 60 * 1000 // Convert to milliseconds
      },
      removeOnComplete: 10,
      removeOnFail: 50
    }
  );
  
  logger.info(`Job scraping scheduled every ${intervalMinutes} minutes`);
};

// Event listeners
jobScrapingQueue.on('completed', (job, result) => {
  logger.info('Job scraping completed:', result);
});

jobScrapingQueue.on('failed', (job, err) => {
  logger.error('Job scraping failed:', err);
});

module.exports = {
  jobScrapingQueue,
  scheduleJobScraping
};
