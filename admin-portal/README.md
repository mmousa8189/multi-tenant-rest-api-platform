# Multi-Tenant API Admin Portal

## Overview
Angular-based admin portal for managing multi-tenant API applications with comprehensive features.

## Features
- User Authentication
- Application Registration
- Application Management
- Dashboard with Insights
- Responsive Design
- Material Design UI

## Prerequisites
- Node.js (v16+)
- Angular CLI (v17+)
- npm or yarn

## Setup and Installation

1. Clone the repository
```bash
git clone <repository-url>
cd admin-portal
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment
- Update `src/environments/environment.ts` with your backend API URL

4. Run Development Server
```bash
ng serve
```

5. Build for Production
```bash
ng build --configuration=production
```

## Project Structure
- `src/app/components/`: Angular components
- `src/app/services/`: Service classes for API interactions
- `src/app/guards/`: Route protection guards
- `src/app/interceptors/`: HTTP interceptors

## Authentication
- JWT-based authentication
- Protected routes
- Role-based access control

## API Integration
- Axios/HttpClient for API calls
- Interceptors for token management
- Error handling and notifications

## Deployment
- Compatible with various hosting platforms
- Supports containerization (Docker)

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
