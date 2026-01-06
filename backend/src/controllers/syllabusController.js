const { SyllabusTask } = require('../models');
const logger = require('../config/logger');

exports.getTasks = async (req, res) => {
  try {
    const { status, jobId } = req.query;
    
    const where = { userId: req.user.id };
    if (status) where.status = status;
    if (jobId) where.jobId = jobId;

    const tasks = await SyllabusTask.findAll({
      where,
      order: [
        ['priority', 'DESC'],
        ['dueDate', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    logger.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      topic,
      dueDate,
      priority,
      jobId,
      notes,
      resources
    } = req.body;

    const task = await SyllabusTask.create({
      userId: req.user.id,
      title,
      description,
      subject,
      topic,
      dueDate,
      priority,
      jobId,
      notes,
      resources
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task }
    });
  } catch (error) {
    logger.error('Create task error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await SyllabusTask.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: { task }
    });
  } catch (error) {
    logger.error('Get task error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task'
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await SyllabusTask.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    await task.update(req.body);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task }
    });
  } catch (error) {
    logger.error('Update task error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await SyllabusTask.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
};

exports.markTaskComplete = async (req, res) => {
  try {
    const task = await SyllabusTask.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    await task.update({
      status: 'completed',
      completedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Task marked as complete',
      data: { task }
    });
  } catch (error) {
    logger.error('Mark task complete error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark task as complete'
    });
  }
};
