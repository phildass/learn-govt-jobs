const OpenAI = require('openai');
const pdfParse = require('pdf-parse');
const logger = require('../config/logger');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async parsePDF(pdfBuffer) {
    try {
      const data = await pdfParse(pdfBuffer);
      return data.text;
    } catch (error) {
      logger.error('PDF parsing error:', error);
      throw new Error('Failed to parse PDF');
    }
  }

  async summarizeJobNotification(jobText) {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at summarizing government job notifications. Provide concise, structured summaries highlighting key information like positions, qualifications, dates, and application process.'
          },
          {
            role: 'user',
            content: `Summarize this government job notification:\n\n${jobText}`
          }
        ],
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.3
      });

      return response.choices[0].message.content;
    } catch (error) {
      logger.error('AI summarization error:', error);
      throw new Error('Failed to generate summary');
    }
  }

  async extractEligibilityCriteria(jobText) {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract eligibility criteria from government job notifications. Return structured JSON with age, qualification, experience, and other requirements.'
          },
          {
            role: 'user',
            content: `Extract eligibility criteria from:\n\n${jobText}`
          }
        ],
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.2,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      logger.error('AI eligibility extraction error:', error);
      throw new Error('Failed to extract eligibility criteria');
    }
  }

  async matchCandidateEligibility(userProfile, jobEligibility) {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at matching candidate profiles with job eligibility criteria. Analyze and provide a match score (0-100) with detailed explanation.'
          },
          {
            role: 'user',
            content: `User Profile: ${JSON.stringify(userProfile)}\n\nJob Eligibility: ${JSON.stringify(jobEligibility)}\n\nProvide match analysis.`
          }
        ],
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.3
      });

      return response.choices[0].message.content;
    } catch (error) {
      logger.error('AI eligibility matching error:', error);
      throw new Error('Failed to match eligibility');
    }
  }

  async generatePersonalizedContent(userProfile, jobData) {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate personalized job recommendations and preparation tips based on user profile and job requirements.'
          },
          {
            role: 'user',
            content: `User: ${JSON.stringify(userProfile)}\n\nJob: ${JSON.stringify(jobData)}\n\nGenerate personalized recommendations.`
          }
        ],
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.7
      });

      return response.choices[0].message.content;
    } catch (error) {
      logger.error('AI content generation error:', error);
      throw new Error('Failed to generate personalized content');
    }
  }

  async extractImportantDates(jobText) {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract all important dates from job notifications. Return JSON with dates for application start, application end, exam date, result date, etc.'
          },
          {
            role: 'user',
            content: `Extract dates from:\n\n${jobText}`
          }
        ],
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.2,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      logger.error('AI date extraction error:', error);
      throw new Error('Failed to extract dates');
    }
  }
}

module.exports = new AIService();
