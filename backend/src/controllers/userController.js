const { User, Subscription, Application, Job } = require('../models');
const logger = require('../config/logger');

exports.getProfile = async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      state,
      city,
      qualification
    } = req.body;

    await req.user.update({
      firstName,
      lastName,
      phone,
      dateOfBirth,
      state,
      city,
      qualification
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: req.user }
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isMatch = await req.user.checkPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    await req.user.update({ password: newPassword });

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    logger.error('Update password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update password'
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    // Get subscription info
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id, status: 'active' }
    });

    // Get applications count
    const applicationsCount = await Application.count({
      where: { userId: req.user.id }
    });

    // Get saved jobs count
    const savedJobsCount = await Application.count({
      where: { userId: req.user.id, status: 'saved' }
    });

    // Get recent applications
    const recentApplications = await Application.findAll({
      where: { userId: req.user.id },
      include: [{ model: Job, as: 'job' }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        user: req.user,
        subscription,
        stats: {
          applications: applicationsCount,
          savedJobs: savedJobsCount
        },
        recentApplications
      }
    });
  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferredSectors, preferredStates } = req.body;

    await req.user.update({
      preferredSectors,
      preferredStates
    });

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: { user: req.user }
    });
  } catch (error) {
    logger.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  }
};
