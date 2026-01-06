const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'e.g., Railways, Banking, Defense, PSU, SSC, UPSC'
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'State for state govt jobs'
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '10th, 12th, Graduate, Post-Graduate, etc.'
  },
  examType: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Written, Interview, Physical, etc.'
  },
  totalPosts: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  applicationStartDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  applicationEndDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  examDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ageMin: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ageMax: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  officialUrl: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notificationPdfUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'closed', 'result_declared'),
    defaultValue: 'upcoming'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aiSummary: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'AI-generated summary'
  },
  importantDates: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'JSON object with key dates'
  },
  eligibilityCriteria: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Structured eligibility data'
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  applicationFee: {
    type: DataTypes.STRING,
    allowNull: true
  },
  requiredDocuments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  sourceUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Original source URL from scraping'
  },
  scrapedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When job was published on govt portal'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Admin verified'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bookmarks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'jobs',
  indexes: [
    { fields: ['sector'] },
    { fields: ['state'] },
    { fields: ['qualification'] },
    { fields: ['status'] },
    { fields: ['applicationEndDate'] },
    { fields: ['publishedAt'] },
    { fields: ['createdAt'] }
  ]
});

module.exports = Job;
