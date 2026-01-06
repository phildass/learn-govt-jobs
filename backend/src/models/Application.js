const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
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
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('saved', 'applied', 'shortlisted', 'rejected', 'selected'),
    defaultValue: 'saved'
  },
  applicationNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  appliedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  documents: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Uploaded documents metadata'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reminders: {
    type: DataTypes.ARRAY(DataTypes.DATE),
    defaultValue: []
  }
}, {
  tableName: 'applications',
  indexes: [
    { fields: ['userId'] },
    { fields: ['jobId'] },
    { fields: ['status'] },
    { unique: true, fields: ['userId', 'jobId'] }
  ]
});

module.exports = Application;
