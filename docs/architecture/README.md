# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                           │
├─────────────────────────────────────────────────────────────┤
│  iOS App  │  Android App  │  Web Browser (Next.js/React)    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS/REST API
                 │
┌────────────────▼────────────────────────────────────────────┐
│                   API Gateway / Load Balancer                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │
┌────────────────▼────────────────────────────────────────────┐
│                   Application Layer                          │
├─────────────────────────────────────────────────────────────┤
│              Node.js/Express Backend API                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Controllers │ Middleware │ Routes │ Services         │  │
│  └──────────────────────────────────────────────────────┘  │
└────┬──────────────┬──────────────┬──────────────┬──────────┘
     │              │              │              │
     │              │              │              │
┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌────▼──────────┐
│PostgreSQL│  │  Redis   │  │  OpenAI  │  │Payment Gateway│
│ Database │  │  Cache   │  │   API    │  │(Razorpay/     │
│          │  │& Queue   │  │          │  │ Stripe)       │
└──────────┘  └──────────┘  └──────────┘  └───────────────┘
```

## Component Architecture

### Backend Services

1. **API Server** (Express.js)
   - RESTful API endpoints
   - Authentication & Authorization
   - Request validation
   - Response formatting

2. **Background Workers** (Bull Queue)
   - Job Scraping Worker
   - Notification Worker
   - Email Worker (future)
   - Analytics Worker (future)

3. **Services Layer**
   - AI Service (OpenAI integration)
   - Scraping Service (Puppeteer/Cheerio)
   - Email Service (future)
   - SMS Service (future)
   - Payment Service

### Frontend Architecture

```
┌───────────────────────────────────────────┐
│           Next.js Application             │
├───────────────────────────────────────────┤
│  Pages/                                   │
│  ├── Home                                 │
│  ├── Jobs (List & Detail)                │
│  ├── Dashboard                            │
│  ├── Profile                              │
│  └── Auth (Login/Register)               │
├───────────────────────────────────────────┤
│  Components/                              │
│  ├── Layout                               │
│  ├── JobCard                              │
│  ├── Filters                              │
│  └── Common UI                            │
├───────────────────────────────────────────┤
│  State Management (Redux)                 │
│  ├── Auth Slice                           │
│  ├── Jobs Slice (future)                 │
│  └── User Slice (future)                 │
├───────────────────────────────────────────┤
│  Services/                                │
│  └── API Client (Axios)                  │
└───────────────────────────────────────────┘
```

## Data Flow

### Job Notification Flow

```
1. Scraping Worker (every 30 min)
   ↓
2. Fetch from Govt Portals
   ↓
3. AI Processing (PDF parse, summarize)
   ↓
4. Store in Database
   ↓
5. Match with User Preferences
   ↓
6. Queue Notifications
   ↓
7. Send to Users (Push/Email/SMS)
```

### User Subscription Flow

```
1. User Registration
   ↓
2. Email/OTP Verification
   ↓
3. Browse Jobs (limited)
   ↓
4. Choose Subscription Plan
   ↓
5. Payment Gateway Integration
   ↓
6. Payment Verification
   ↓
7. Activate Subscription
   ↓
8. Full Access Granted
```

## Database Schema

### Core Entities

- **Users**: Authentication, profile, preferences
- **Subscriptions**: Plan, status, billing
- **Jobs**: Postings, metadata, AI analysis
- **Applications**: User applications tracking
- **Payments**: Transaction records
- **Notifications**: User alerts
- **SyllabusTasks**: Study planning
- **CurrentAffairs**: Daily updates

### Relationships

- User 1:N Subscriptions
- User 1:N Applications
- User 1:N Payments
- User 1:N Notifications
- User 1:N SyllabusTasks
- Job 1:N Applications
- Subscription 1:N Payments

## Security Architecture

### Authentication Flow

```
1. User Login (email/password)
   ↓
2. Verify Credentials
   ↓
3. Generate JWT Token
   ↓
4. Return Token to Client
   ↓
5. Client Stores Token
   ↓
6. Include Token in API Requests
   ↓
7. Verify Token on Server
   ↓
8. Grant Access to Resources
```

### Security Layers

1. **Network Layer**
   - HTTPS/TLS encryption
   - Firewall rules
   - DDoS protection

2. **Application Layer**
   - JWT authentication
   - Rate limiting
   - Input validation
   - CORS policy

3. **Data Layer**
   - Encrypted passwords (bcrypt)
   - SQL injection prevention
   - XSS protection
   - CSRF tokens

## Scalability Considerations

### Horizontal Scaling

- Stateless API servers
- Redis for session management
- Load balancer distribution
- Database read replicas

### Caching Strategy

- Redis for:
  - Session data
  - Frequently accessed jobs
  - API response caching
  - Queue management

### Performance Optimization

- Database indexing
- Query optimization
- CDN for static assets
- Image optimization
- Code splitting
- Lazy loading

## Monitoring & Logging

### Logs

- Application logs (Winston)
- Access logs (Morgan)
- Error logs
- Audit logs

### Metrics

- API response times
- Database query performance
- Cache hit/miss rates
- Worker job processing times
- User engagement metrics

## Deployment Architecture

### Production Environment

```
┌────────────────────────────────────────────┐
│          CDN (Static Assets)               │
└────────────────┬───────────────────────────┘
                 │
┌────────────────▼───────────────────────────┐
│      Load Balancer (Nginx/HAProxy)         │
└────┬──────────────────────┬────────────────┘
     │                      │
┌────▼────────┐      ┌──────▼───────┐
│ Web Server  │      │  Web Server  │  (Multiple instances)
│  (Next.js)  │      │   (Next.js)  │
└─────────────┘      └──────────────┘
     │                      │
     └──────────┬───────────┘
                │
┌───────────────▼────────────────────────────┐
│      API Servers (Node.js/Express)         │
│   ┌────────┐  ┌────────┐  ┌────────┐      │
│   │Server 1│  │Server 2│  │Server 3│      │
│   └────────┘  └────────┘  └────────┘      │
└───────┬──────────────────┬─────────────────┘
        │                  │
   ┌────▼─────┐      ┌────▼─────┐
   │PostgreSQL│      │  Redis   │
   │ Primary  │      │  Cluster │
   └────┬─────┘      └──────────┘
        │
   ┌────▼─────┐
   │PostgreSQL│
   │ Replica  │
   └──────────┘
```

## Technology Stack Details

### Backend
- **Runtime**: Node.js 18 LTS
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 14+
- **ORM**: Sequelize 6.x
- **Cache/Queue**: Redis 6+, Bull 4.x
- **Authentication**: JWT, Passport.js
- **Logging**: Winston 3.x

### Frontend
- **Framework**: Next.js 14.x
- **UI Library**: React 18.x
- **State**: Redux Toolkit
- **Styling**: Material-UI 5.x
- **HTTP Client**: Axios

### AI/ML
- **LLM**: OpenAI GPT-4
- **PDF Parsing**: pdf-parse
- **Web Scraping**: Puppeteer, Cheerio

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions (future)
- **Monitoring**: PM2, Winston
