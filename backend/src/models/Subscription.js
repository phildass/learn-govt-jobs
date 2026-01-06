const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subscription = sequelize.define('Subscription', {
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
  planType: {
    type: DataTypes.ENUM('annual', 'monthly', 'quarterly'),
    defaultValue: 'annual'
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'cancelled', 'pending'),
    defaultValue: 'pending'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'INR'
  },
  paymentGateway: {
    type: DataTypes.ENUM('razorpay', 'stripe'),
    allowNull: false
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subscriptionId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Gateway subscription ID'
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cancelledAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'subscriptions',
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['endDate'] }
  ]
});

module.exports = Subscription;
