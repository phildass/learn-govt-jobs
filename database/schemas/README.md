# Database Schemas

This directory contains SQL schema definitions for the Learn Govt Jobs platform.

## Tables

### users
Stores user account information including authentication and profile details.
- Primary authentication via email/password
- Support for SSO (Google OAuth)
- OTP verification for phone and email
- User preferences for job recommendations

### subscriptions
Manages user subscription plans and status.
- Annual/monthly/quarterly subscription plans
- Payment gateway integration (Razorpay/Stripe)
- Auto-renewal support
- Cancellation tracking

### jobs
Government job postings aggregated from official sources.
- Comprehensive job details
- AI-generated summaries
- Structured eligibility criteria
- Real-time scraping metadata

### applications
Tracks user applications to jobs.
- Application status workflow
- Document management
- Reminder system
- Notes and tracking

### payments
Payment transaction records.
- Multi-gateway support
- Transaction status tracking
- Receipt generation
- Webhook handling

### notifications
User notifications for job alerts and updates.
- Multiple notification types
- Priority levels
- Read/unread status
- Action URLs

### syllabus_tasks
Study planning and task management.
- Subject-wise organization
- Due date tracking
- Priority management
- Resource links

### current_affairs
Daily current affairs updates.
- Category-wise organization
- Relevance tagging for exams
- Importance levels
- Source tracking

## Relationships

- User -> Subscriptions (1:N)
- User -> Applications (1:N)
- User -> Payments (1:N)
- User -> Notifications (1:N)
- User -> SyllabusTasks (1:N)
- Job -> Applications (1:N)
- Job -> Notifications (1:N)
- Subscription -> Payments (1:N)

## Indexes

All tables include appropriate indexes for:
- Foreign keys
- Frequently queried fields
- Date-based queries
- Status filters

## Migrations

See `/database/migrations/` for migration scripts to create and update schemas.
