const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CurrentAffair = sequelize.define('CurrentAffair', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Politics, Economy, Sports, International, etc.'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  sourceUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  importance: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  relevantFor: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    comment: 'Exam types this is relevant for: UPSC, SSC, Banking, etc.'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'current_affairs',
  indexes: [
    { fields: ['date'] },
    { fields: ['category'] },
    { fields: ['importance'] },
    { fields: ['isPublished'] }
  ]
});

module.exports = CurrentAffair;
