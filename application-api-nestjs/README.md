# Multi-Tenant REST API Platform - NestJS Implementation

This is a NestJS implementation of a multi-tenant REST API platform that allows users to create and manage multiple applications with their own API keys.

## Features

- User authentication with JWT
- API key authentication for applications
- CRUD operations for applications
- Multi-tenant support
- Swagger API documentation
- Winston logging
- Rate limiting
- Security middleware (Helmet, CORS)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Copy `.env.example` to `.env` and update the values:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/multi-tenant-api
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:4200
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Security

The application implements several security measures:
- JWT authentication for users
- API key authentication for applications
- Rate limiting
- Helmet security headers
- CORS protection
- Input validation

## License

MIT
