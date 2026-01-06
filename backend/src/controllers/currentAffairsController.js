const { CurrentAffair } = require('../models');
const { Op } = require('sequelize');
const logger = require('../config/logger');

exports.getCurrentAffairs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, importance } = req.query;
    
    const where = { isPublished: true };
    if (category) where.category = category;
    if (importance) where.importance = importance;

    const offset = (page - 1) * limit;

    const { count, rows } = await CurrentAffair.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['date', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        currentAffairs: rows,
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
    logger.error('Get current affairs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current affairs'
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const affair = await CurrentAffair.findOne({
      where: {
        id: req.params.id,
        isPublished: true
      }
    });

    if (!affair) {
      return res.status(404).json({
        success: false,
        error: 'Current affair not found'
      });
    }

    res.json({
      success: true,
      data: { affair },
      disclaimer: process.env.DISCLAIMER_TEXT
    });
  } catch (error) {
    logger.error('Get current affair error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current affair'
    });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const offset = (page - 1) * limit;

    const { count, rows } = await CurrentAffair.findAndCountAll({
      where: {
        category,
        isPublished: true
      },
      limit: parseInt(limit),
      offset,
      order: [['date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        currentAffairs: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get by category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current affairs by category'
    });
  }
};

exports.getByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const affairs = await CurrentAffair.findAll({
      where: {
        date,
        isPublished: true
      },
      order: [['importance', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { currentAffairs: affairs }
    });
  } catch (error) {
    logger.error('Get by date error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current affairs by date'
    });
  }
};
