# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

## Environment Setup

### 1. Backend Configuration

Copy the example environment file:
```bash
cd backend
cp .env.example .env
```

Update the following critical variables:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learn_govt_jobs
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_jwt_secret_key_change_in_production

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 2. Frontend Configuration

Copy the example environment file:
```bash
cd frontend
cp .env.example .env.local
```

Update the API URL:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Deployment Methods

### Method 1: Docker Compose (Recommended)

1. Create a `.env` file in the root directory with required secrets:
```env
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

2. Build and start services:
```bash
docker-compose up -d
```

3. Check service status:
```bash
docker-compose ps
```

4. View logs:
```bash
docker-compose logs -f
```

### Method 2: Manual Deployment

#### Backend

1. Install dependencies:
```bash
cd backend
npm install
```

2. Run database migrations:
```bash
npm run migrate
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

#### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Build for production:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

## Database Setup

### Create Database

```sql
CREATE DATABASE learn_govt_jobs;
CREATE USER learn_app WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE learn_govt_jobs TO learn_app;
```

### Run Migrations

The application will automatically sync models in development mode. For production, use migration scripts:

```bash
cd backend
npm run migrate
```

## Background Workers

Start background workers for job scraping and notifications:

```javascript
// In backend/src/index.js, uncomment:
const { scheduleJobScraping } = require('./workers/jobScrapingWorker');
scheduleJobScraping();
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure SSL/TLS certificates
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure database backups
- [ ] Set up monitoring (PM2, New Relic)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up log rotation
- [ ] Configure Redis persistence
- [ ] Set up CI/CD pipeline
- [ ] Configure firewall rules
- [ ] Set up database connection pooling
- [ ] Enable database SSL connections
- [ ] Set up error tracking (Sentry)

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring

### Health Checks

Backend health endpoint:
```
GET http://localhost:5000/health
```

### Logs

Backend logs are stored in:
```
backend/logs/error.log
backend/logs/combined.log
```

### PM2 (Production Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start src/index.js --name learn-govt-jobs-api

# Start frontend
cd frontend
pm2 start npm --name learn-govt-jobs-web -- start

# Save process list
pm2 save

# Setup startup script
pm2 startup
```

## Scaling

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy)
- Run multiple backend instances
- Use Redis for session management
- Implement database read replicas

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets

## Backup Strategy

### Database Backups

```bash
# Daily backup
pg_dump -U postgres learn_govt_jobs > backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres learn_govt_jobs < backup_20240106.sql
```

### Redis Backups

Redis automatically creates RDB snapshots. Configure in redis.conf:
```
save 900 1
save 300 10
save 60 10000
```

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify connection credentials
- Check firewall rules

### Redis Connection Issues
- Verify Redis is running
- Check Redis password (if set)
- Verify network connectivity

### API Not Responding
- Check process is running
- Verify port is not in use
- Check application logs

## Security

- Keep dependencies updated
- Use environment variables for secrets
- Implement rate limiting
- Enable CORS selectively
- Use HTTPS in production
- Sanitize user inputs
- Implement SQL injection prevention
- Use prepared statements
- Enable CSP headers
- Implement XSS protection
