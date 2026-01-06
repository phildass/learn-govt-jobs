const { Job, Application } = require('../models');
const { Op } = require('sequelize');
const logger = require('../config/logger');

exports.getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sector,
      state,
      qualification,
      examType,
      status = 'ongoing',
      search
    } = req.query;

    const where = {};

    if (sector) where.sector = sector;
    if (state) where.state = state;
    if (qualification) where.qualification = qualification;
    if (examType) where.examType = examType;
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { organization: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Job.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        jobs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jobs'
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Increment views
    await job.increment('views');

    res.json({
      success: true,
      data: { job },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Get job error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job'
    });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: { job },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Get job details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job details'
    });
  }
};

exports.bookmarkJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if already bookmarked (application with status 'saved')
    const existing = await Application.findOne({
      where: {
        userId: req.user.id,
        jobId: id
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Job already bookmarked'
      });
    }

    await Application.create({
      userId: req.user.id,
      jobId: id,
      status: 'saved'
    });

    // Increment bookmark count
    await Job.increment('bookmarks', { where: { id } });

    res.json({
      success: true,
      message: 'Job bookmarked successfully'
    });
  } catch (error) {
    logger.error('Bookmark job error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to bookmark job'
    });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findOne({
      where: {
        userId: req.user.id,
        jobId: id,
        status: 'saved'
      }
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Bookmark not found'
      });
    }

    await application.destroy();
    await Job.decrement('bookmarks', { where: { id } });

    res.json({
      success: true,
      message: 'Bookmark removed successfully'
    });
  } catch (error) {
    logger.error('Remove bookmark error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove bookmark'
    });
  }
};

exports.getUserBookmarks = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: {
        userId: req.user.id,
        status: 'saved'
      },
      include: [{
        model: Job,
        as: 'job'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { bookmarks: applications }
    });
  } catch (error) {
    logger.error('Get bookmarks error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookmarks'
    });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationNumber, documents, notes } = req.body;

    const application = await Application.findOne({
      where: {
        userId: req.user.id,
        jobId: id
      }
    });

    if (application && application.status === 'applied') {
      return res.status(400).json({
        success: false,
        error: 'Already applied to this job'
      });
    }

    if (application) {
      await application.update({
        status: 'applied',
        applicationNumber,
        documents,
        notes,
        appliedAt: new Date()
      });
    } else {
      await Application.create({
        userId: req.user.id,
        jobId: id,
        status: 'applied',
        applicationNumber,
        documents,
        notes,
        appliedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    logger.error('Apply to job error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application'
    });
  }
};
