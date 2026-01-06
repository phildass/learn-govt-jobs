#!/bin/bash

# Learn Govt Jobs - Setup Script
# This script sets up the development environment

set -e

echo "========================================="
echo "Learn Govt Jobs - Development Setup"
echo "========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

command -v node >/dev/null 2>&1 || { echo "Error: Node.js is required but not installed. Please install Node.js 18+"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is required but not installed."; exit 1; }

# Check for PostgreSQL or Docker
if ! command -v psql >/dev/null 2>&1 && ! command -v docker >/dev/null 2>&1; then
    echo "Error: PostgreSQL or Docker is required but neither is installed."
    echo "Please install PostgreSQL 14+ or Docker to use Docker Compose."
    exit 1
fi

# Check for Redis or Docker
if ! command -v redis-cli >/dev/null 2>&1 && ! command -v docker >/dev/null 2>&1; then
    echo "Error: Redis or Docker is required but neither is installed."
    echo "Please install Redis 6+ or Docker to use Docker Compose."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✓ Node.js $(node -v) detected"
echo "✓ npm $(npm -v) detected"
echo ""

# Setup Backend
echo "Setting up backend..."
cd backend

if [ ! -f .env ]; then
    echo "Creating backend .env file from template..."
    cp .env.example .env
    echo "✓ Created backend/.env - Please update with your configuration"
else
    echo "✓ Backend .env already exists"
fi

echo "Installing backend dependencies..."
npm install
echo "✓ Backend dependencies installed"
echo ""

cd ..

# Setup Frontend
echo "Setting up frontend..."
cd frontend

if [ ! -f .env.local ]; then
    echo "Creating frontend .env.local file from template..."
    cp .env.example .env.local
    echo "✓ Created frontend/.env.local - Please update with your configuration"
else
    echo "✓ Frontend .env.local already exists"
fi

echo "Installing frontend dependencies..."
npm install
echo "✓ Frontend dependencies installed"
echo ""

cd ..

# Install root dependencies
echo "Installing root dependencies..."
npm install
echo "✓ Root dependencies installed"
echo ""

# Create required directories
echo "Creating required directories..."
mkdir -p backend/logs
mkdir -p backend/uploads
echo "✓ Directories created"
echo ""

# Database setup instructions
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Configure your environment variables:"
echo "   - Edit backend/.env with your database credentials"
echo "   - Edit backend/.env with your API keys (OpenAI, Razorpay/Stripe)"
echo "   - Edit frontend/.env.local with your API URL"
echo ""
echo "2. Set up PostgreSQL database:"
echo "   $ psql -U postgres"
echo "   postgres=# CREATE DATABASE learn_govt_jobs;"
echo "   postgres=# \\q"
echo ""
echo "3. Start Redis server:"
echo "   $ redis-server"
echo ""
echo "4. Start the development servers:"
echo "   $ npm run dev"
echo ""
echo "   Or separately:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "5. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000/api"
echo "   Health Check: http://localhost:5000/health"
echo ""
echo "========================================="
echo "Setup complete! 🎉"
echo "========================================="
