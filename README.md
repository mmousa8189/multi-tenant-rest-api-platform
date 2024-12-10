# Multi-Tenant REST API Platform

A multi-tenant REST API platform with an admin portal for managing applications and API keys.

## Features

- Application registration with unique API keys
- Admin portal for application management
- Secure API endpoints with API key authentication
- Application domain description endpoint
- Dashboard for data insights

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Angular CLI

## Project Structure

The project is organized into two main components:
- `application-api/`: Backend REST API service
- `admin-portal/`: Frontend admin interface

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd application-api
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env`

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup (Angular Admin Portal)

### Prerequisites
- Node.js (v16+)
- Angular CLI (v17+)

### Installation
1. Navigate to admin-portal directory
```bash
cd admin-portal
```

2. Install dependencies
```bash
npm install
```

3. Start Development Server
```bash
ng serve
```

4. Build for Production
```bash
ng build --configuration=production
```

### Environment Configuration
- Update `src/environments/environment.ts` with your backend API URL
- Ensure CORS is configured in backend for frontend access

## API Endpoints

### Admin Endpoints (Protected)
- POST /api/auth/login - Admin login
- POST /api/applications - Register new application
- GET /api/applications - List all applications
- GET /api/applications/:id - Get application details
- PUT /api/applications/:id - Update application
- DELETE /api/applications/:id - Delete application

### Public API Endpoints (Requires API Key)
- GET /api/applications/test/domain - Get application domain description

## Authentication

### Admin Authentication
Use JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### API Authentication
Use API key in the X-API-Key header:
```
X-API-Key: <api-key>
```
