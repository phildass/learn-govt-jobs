const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
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
  subscriptionId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'subscriptions',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'INR'
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  paymentGateway: {
    type: DataTypes.ENUM('razorpay', 'stripe'),
    allowNull: false
  },
  gatewayPaymentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gatewayOrderId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gatewaySignature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'card, upi, netbanking, etc.'
  },
  receiptUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  failureReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'payments',
  indexes: [
    { fields: ['userId'] },
    { fields: ['subscriptionId'] },
    { fields: ['status'] },
    { fields: ['gatewayPaymentId'] }
  ]
});

module.exports = Payment;
