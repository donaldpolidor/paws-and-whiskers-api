
# Paws & Whiskers Database API

## CSE 341 Final Project - Week 05, Part 1

### Team Collaboration

#### Team Members
| Name | Role | Responsibilities | GitHub |
|------|------|-----------------|--------|
| Donald Polidor | Backend Lead | MongoDB setup, Models, Routes, Deployment | [@donaldpolidor](https://github.com/donaldpolidor) |
| Innocent Dzowera | Documentation Lead | Swagger API, Testing, Frontend integration | [GitHub Username] |

#### Project Timeline & Responsibilities

##### Week 05 - Initial Setup (Donald)
- Git repository creation and sharing
- Node.js/Express project initialization  
- MongoDB Atlas configuration & database setup
- Basic project structure (MVC architecture)
- Deployment to Render

##### Week 06 - Core Development & Documentation (Innocent)
- [ ] Complete Swagger/OpenAPI documentation
- [ ] All GET routes implementation for dogs and cats
- [ ] API documentation available at `/api-docs`
- [ ] Error handling improvements
- [ ] Testing with Postman/Thunder Client

##### Week 07 - Authentication & CRUD (Both)
- [ ] JWT authentication system
- [ ] User registration/login endpoints
- [ ] Protected routes (ADMIN vs USER roles)
- [ ] Complete CRUD operations
- [ ] Data validation
- [ ] Comprehensive testing
- [ ] Security review
- [ ] Video presentation
- [ ] Final submission

### Project Overview

A RESTful API for managing a comprehensive database of dog and cat breeds with authentication and authorization features.

### Technology Stack
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose ODM
- Authentication: JWT, bcrypt
- Documentation: Swagger/OpenAPI
- Deployment: Render

### Live Deployment
- API URL: https://paws-and-whiskers-api.onrender.com
- GitHub Repository: https://github.com/donaldpolidor/paws-and-whiskers-api
- Status: Live and functional

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Dogs Collection (CRUD)
- `GET /api/dogs` - Get all dogs (public)
- `GET /api/dogs/:id` - Get specific dog (public)
- `POST /api/dogs` - Create dog (ADMIN only)
- `PUT /api/dogs/:id` - Update dog (ADMIN only)
- `DELETE /api/dogs/:id` - Delete dog (ADMIN only)

#### Cats Collection (CRUD)
- `GET /api/cats` - Get all cats (public)
- `GET /api/cats/:id` - Get specific cat (public)
- `POST /api/cats` - Create cat (ADMIN only)
- `PUT /api/cats/:id` - Update cat (ADMIN only)
- `DELETE /api/cats/:id` - Delete cat (ADMIN only)

#### Birds Collection (NEW)
- `GET /api/birds` - Get all birds (public)
- `GET /api/birds/:id` - Get specific bird (public)
- `POST /api/birds` - Create bird (ADMIN only)
- `PUT /api/birds/:id` - Update bird (ADMIN only)
- `DELETE /api/birds/:id` - Delete bird (ADMIN only)

#### Fish Collection (NEW)
- `GET /api/fish` - Get all fish (public)
- `GET /api/fish/:id` - Get specific fish (public)
- `POST /api/fish` - Create fish (ADMIN only)
- `PUT /api/fish/:id` - Update fish (ADMIN only)
- `DELETE /api/fish/:id` - Delete fish (ADMIN only)

### Authentication Flow

1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Get Token: Copy the JWT token from response
4. Authorize: Click "Authorize" button in Swagger UI and paste: `Bearer YOUR_TOKEN`

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch