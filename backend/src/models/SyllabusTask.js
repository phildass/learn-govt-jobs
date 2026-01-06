const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SyllabusTask = sequelize.define('SyllabusTask', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'jobs',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resources: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  }
}, {
  tableName: 'syllabus_tasks',
  indexes: [
    { fields: ['userId'] },
    { fields: ['jobId'] },
    { fields: ['status'] },
    { fields: ['dueDate'] }
  ]
});

module.exports = SyllabusTask;
