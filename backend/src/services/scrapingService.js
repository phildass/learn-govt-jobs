const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const logger = require('../config/logger');
const { Job } = require('../models');

class ScrapingService {
  constructor() {
    this.sources = [
      {
        name: 'SSC Official',
        url: 'https://ssc.nic.in',
        selector: '.job-listing'
      },
      {
        name: 'UPSC Official',
        url: 'https://upsc.gov.in',
        selector: '.notification-list'
      }
      // Add more sources
    ];
  }

  async scrapeWithCheerio(url, selector) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': process.env.SCRAPING_USER_AGENT
        },
        timeout: parseInt(process.env.SCRAPING_TIMEOUT_MS) || 30000
      });

      const $ = cheerio.load(response.data);
      const jobs = [];

      $(selector).each((index, element) => {
        // Extract job data from element
        const job = {
          title: $(element).find('.title').text().trim(),
          organization: $(element).find('.org').text().trim(),
          url: $(element).find('a').attr('href')
        };
        jobs.push(job);
      });

      return jobs;
    } catch (error) {
      logger.error(`Cheerio scraping error for ${url}:`, error);
      return [];
    }
  }

  async scrapeWithPuppeteer(url, selector) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent(process.env.SCRAPING_USER_AGENT);
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: parseInt(process.env.SCRAPING_TIMEOUT_MS) || 30000
      });

      const jobs = await page.evaluate((sel) => {
        const elements = document.querySelectorAll(sel);
        return Array.from(elements).map(el => ({
          title: el.querySelector('.title')?.textContent?.trim() || '',
          organization: el.querySelector('.org')?.textContent?.trim() || '',
          url: el.querySelector('a')?.href || ''
        }));
      }, selector);

      await browser.close();
      return jobs;
    } catch (error) {
      logger.error(`Puppeteer scraping error for ${url}:`, error);
      if (browser) await browser.close();
      return [];
    }
  }

  async scrapeAllSources() {
    const allJobs = [];

    for (const source of this.sources) {
      logger.info(`Scraping ${source.name}...`);
      
      try {
        // Try Cheerio first (faster)
        let jobs = await this.scrapeWithCheerio(source.url, source.selector);
        
        // Fallback to Puppeteer if Cheerio fails
        if (jobs.length === 0) {
          jobs = await this.scrapeWithPuppeteer(source.url, source.selector);
        }

        allJobs.push(...jobs);
        logger.info(`Found ${jobs.length} jobs from ${source.name}`);
        
        // Delay between requests
        await this.delay(parseInt(process.env.SCRAPING_DELAY_MS) || 1000);
      } catch (error) {
        logger.error(`Failed to scrape ${source.name}:`, error);
      }
    }

    return allJobs;
  }

  async saveJobs(scrapedJobs) {
    let saved = 0;

    for (const jobData of scrapedJobs) {
      try {
        // Check if job already exists
        const existing = await Job.findOne({
          where: { sourceUrl: jobData.url }
        });

        if (!existing) {
          await Job.create({
            ...jobData,
            sourceUrl: jobData.url,
            scrapedAt: new Date(),
            publishedAt: new Date(),
            status: 'ongoing'
          });
          saved++;
        }
      } catch (error) {
        logger.error('Failed to save job:', error);
      }
    }

    return saved;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new ScrapingService();
