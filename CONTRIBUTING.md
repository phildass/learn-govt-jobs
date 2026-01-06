# Contributing to Learn Govt Jobs

Thank you for your interest in contributing to Learn Govt Jobs! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Enhancements

1. Check if the enhancement has been suggested
2. Create a new issue with:
   - Clear description of the enhancement
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Write/update tests if applicable
5. Ensure all tests pass
6. Commit with clear messages (`git commit -m 'Add AmazingFeature'`)
7. Push to your branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Git

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/phildass/learn-govt-jobs.git
cd learn-govt-jobs
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend
cd ../frontend
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start development servers:
```bash
# From root directory
npm run dev
```

## Coding Standards

### JavaScript/Node.js

- Use ES6+ features
- Follow Airbnb style guide
- Use async/await over callbacks
- Handle errors properly
- Add JSDoc comments for functions

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Use meaningful component names
- Keep components focused and small

### Database

- Use migrations for schema changes
- Add proper indexes
- Use transactions for multiple operations
- Follow naming conventions

### Git Commit Messages

Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```
feat(jobs): Add advanced filtering options

- Added state-wise filtering
- Added qualification-based filtering
- Updated API endpoints

Closes #123
```

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Code Review Process

1. All PRs require at least one review
2. Address review comments
3. Keep PRs focused and small
4. Ensure CI/CD passes
5. Update documentation if needed

## Project Structure

```
learn-govt-jobs/
├── backend/          # Node.js backend
├── frontend/         # Next.js frontend
├── database/         # Database schemas
├── docs/            # Documentation
└── scripts/         # Utility scripts
```

## Questions?

Feel free to:
- Open an issue for questions
- Reach out to maintainers
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
