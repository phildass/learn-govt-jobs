const User = require('./User');
const Subscription = require('./Subscription');
const Job = require('./Job');
const Application = require('./Application');
const Payment = require('./Payment');
const Notification = require('./Notification');
const SyllabusTask = require('./SyllabusTask');
const CurrentAffair = require('./CurrentAffair');

// Define associations
User.hasMany(Subscription, { foreignKey: 'userId', as: 'subscriptions' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Application, { foreignKey: 'userId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(SyllabusTask, { foreignKey: 'userId', as: 'syllabusTasks' });
SyllabusTask.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

Job.hasMany(Notification, { foreignKey: 'jobId', as: 'notifications' });
Notification.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

Job.hasMany(SyllabusTask, { foreignKey: 'jobId', as: 'syllabusTasks' });
SyllabusTask.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

Subscription.hasMany(Payment, { foreignKey: 'subscriptionId', as: 'payments' });
Payment.belongsTo(Subscription, { foreignKey: 'subscriptionId', as: 'subscription' });

module.exports = {
  User,
  Subscription,
  Job,
  Application,
  Payment,
  Notification,
  SyllabusTask,
  CurrentAffair
};
