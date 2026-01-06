# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "disclaimer": "This is a private educational platform..."
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "disclaimer": "This is a private educational platform..."
}
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
```
Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210"
}
```

#### Login
```
POST /auth/login
```
Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Verify Email
```
POST /auth/verify-email
```
Body:
```json
{
  "token": "verification_token"
}
```

#### Verify OTP
```
POST /auth/verify-otp
```
Body:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### Jobs

#### Get Jobs (Public)
```
GET /jobs?page=1&limit=20&sector=Railways&state=Maharashtra&status=ongoing
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sector` (optional): Filter by sector
- `state` (optional): Filter by state
- `qualification` (optional): Filter by qualification
- `examType` (optional): Filter by exam type
- `status` (optional): Filter by status
- `search` (optional): Search in title/organization

#### Get Job Details (Requires Subscription)
```
GET /jobs/:id/details
```
Headers: `Authorization: Bearer <token>`

#### Bookmark Job
```
POST /jobs/:id/bookmark
```
Headers: `Authorization: Bearer <token>`

### Subscriptions

#### Create Subscription
```
POST /subscriptions/create
```
Headers: `Authorization: Bearer <token>`
Body:
```json
{
  "planType": "annual",
  "paymentGateway": "razorpay"
}
```

#### Get Current Subscription
```
GET /subscriptions/current
```
Headers: `Authorization: Bearer <token>`

### Payments

#### Create Payment Order
```
POST /payments/create-order
```
Headers: `Authorization: Bearer <token>`
Body:
```json
{
  "subscriptionId": "uuid",
  "paymentGateway": "razorpay"
}
```

#### Verify Payment
```
POST /payments/verify
```
Headers: `Authorization: Bearer <token>`
Body:
```json
{
  "paymentId": "uuid",
  "gatewayPaymentId": "pay_xxx",
  "gatewayOrderId": "order_xxx",
  "gatewaySignature": "signature_xxx"
}
```

### User Profile

#### Get Profile
```
GET /users/profile
```
Headers: `Authorization: Bearer <token>`

#### Update Profile
```
PUT /users/profile
```
Headers: `Authorization: Bearer <token>`
Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210",
  "dateOfBirth": "1995-01-01",
  "state": "Maharashtra",
  "city": "Mumbai",
  "qualification": "Graduate"
}
```

#### Get Dashboard
```
GET /users/dashboard
```
Headers: `Authorization: Bearer <token>`

### Notifications

#### Get Notifications
```
GET /notifications?page=1&limit=20&type=job_alert&isRead=false
```
Headers: `Authorization: Bearer <token>`

#### Mark as Read
```
PUT /notifications/:id/read
```
Headers: `Authorization: Bearer <token>`

### Syllabus Tasks

#### Get Tasks
```
GET /syllabus?status=pending&jobId=uuid
```
Headers: `Authorization: Bearer <token>`

#### Create Task
```
POST /syllabus
```
Headers: `Authorization: Bearer <token>`
Body:
```json
{
  "title": "Complete Quantitative Aptitude",
  "description": "Practice 50 questions",
  "subject": "Mathematics",
  "topic": "Quantitative Aptitude",
  "dueDate": "2024-12-31",
  "priority": "high",
  "jobId": "uuid"
}
```

### Current Affairs

#### Get Current Affairs
```
GET /current-affairs?page=1&limit=10&category=Politics
```

#### Get by Date
```
GET /current-affairs/date/2024-01-06
```
Headers: `Authorization: Bearer <token>` (Requires subscription)

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Subscription required)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.
