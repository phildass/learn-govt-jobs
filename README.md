# Learn Govt Jobs - Government Jobs Portal

A comprehensive, AI-powered government jobs notification and exam preparation platform with paid membership model.

## Overview

Learn Govt Jobs is an information-centric platform that provides:
- Real-time government job notifications (sub-1 hour latency)
- AI-powered job summarization and eligibility matching
- Personalized exam preparation tools
- Current affairs tracking
- Application workflow management

**Disclaimer**: This is a private entity platform and is not affiliated with any government organization.

## Features

### User Management
- Email/OTP verified registration
- Secure authentication with SSO support
- User profiles and personalized dashboards
- Role-based access control

### Paid Membership
- Annual subscription model
- Integrated payment gateway (Razorpay/Stripe)
- Subscription management
- Payment history tracking

### Real-time Job Notifications
- Automated scraping from official government portals
- Sub-1 hour latency for new job postings
- Multi-source aggregation
- Duplicate detection and deduplication

### AI/LLM Features
- PDF parsing and text extraction
- Job notification summarization
- Candidate eligibility matching
- Personalized content generation
- Intelligent job recommendations

### Advanced Filtering
- State-wise filtering
- Sector-based filtering (Railways, Banking, Defense, etc.)
- Qualification-based filtering
- Exam type filtering
- Color-coded job status indicators

### Exam Preparation Tools
- Personalized syllabus planning
- Study task management
- Current affairs daily updates
- Document checklists for applications

### Mobile Support
- RESTful API for iOS/Android native apps
- Dynamic job feed
- Real-time notifications
- Offline support capabilities

## Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT with OTP verification
- **Payment**: Razorpay/Stripe integration
- **Scraping**: Puppeteer/Cheerio
- **AI/LLM**: OpenAI API / Custom models
- **Queue**: Bull (Redis-based)
- **Cache**: Redis

### Frontend
- **Framework**: React with Next.js
- **UI Library**: Material-UI / Tailwind CSS
- **State Management**: Redux Toolkit
- **API Client**: Axios
- **Forms**: React Hook Form

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Winston logging
- **Database Migrations**: Sequelize/TypeORM

## Project Structure

```
learn-govt-jobs/
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utility functions
│   │   └── workers/     # Background workers
│   ├── tests/           # Backend tests
│   └── package.json
├── frontend/            # React frontend
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── store/       # Redux store
│   │   ├── utils/       # Utility functions
│   │   └── styles/      # CSS/styling
│   └── package.json
├── database/            # Database schemas and migrations
│   ├── migrations/      # Migration files
│   ├── seeds/           # Seed data
│   └── schemas/         # Schema definitions
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── architecture/   # Architecture diagrams
│   └── deployment/     # Deployment guides
└── scripts/             # Utility scripts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (v6 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/phildass/learn-govt-jobs.git
cd learn-govt-jobs
```

2. Install dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

3. Set up environment variables:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Configure database:
```bash
# Update backend/.env with your PostgreSQL credentials
# Run migrations
cd backend && npm run migrate
```

5. Start development servers:
```bash
# From root directory
npm run dev
```

The backend will run on http://localhost:5000 and frontend on http://localhost:3000.

## Database Schemas

### Core Tables
- **users**: User accounts and profiles
- **subscriptions**: Membership and payment tracking
- **jobs**: Government job postings
- **applications**: User job applications
- **notifications**: User notifications
- **syllabus_tasks**: Study planning and tasks
- **current_affairs**: Daily current affairs updates
- **payments**: Payment transaction records

See `/database/schemas/` for detailed schema definitions.

## API Documentation

API documentation is available at `/docs/api/` or visit http://localhost:5000/api-docs when running the server.

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/jobs` - Get job listings (with filters)
- `GET /api/jobs/:id` - Get job details
- `POST /api/subscriptions/create` - Create subscription
- `GET /api/current-affairs` - Get current affairs

## Deployment

See `/docs/deployment/` for detailed deployment instructions.

## Compliance

**IMPORTANT DISCLAIMER**: Learn Govt Jobs is a private educational platform and is NOT affiliated with, endorsed by, or connected to any government organization or official government job portal. All information is aggregated from publicly available sources.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@learngovjobs.com or create an issue in the repository.

## Roadmap

- [ ] Phase 1: Core infrastructure setup
- [ ] Phase 2: User authentication and subscriptions
- [ ] Phase 3: Job scraping and notifications
- [ ] Phase 4: AI-powered features
- [ ] Phase 5: Mobile apps (iOS/Android)
- [ ] Phase 6: Advanced analytics and reporting
- [ ] Phase 7: Community features

## Acknowledgments

- Built as a subdomain within the iiskills-cloud ecosystem
- Inspired by the need for timely and accurate government job information