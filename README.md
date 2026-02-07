@'
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
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Authentication:** JWT, bcrypt
- **Documentation:** Swagger/OpenAPI
- **Deployment:** Render

### 🌐 **Live Deployment**
- **API URL:** https://paws-and-whiskers-api.onrender.com
- **GitHub Repository:** https://github.com/donaldpolidor/paws-and-whiskers-api
- **Status:** ✅ Live and functional

### 📞 **API Endpoints**

#### **Base Routes**
- `GET /` - Welcome message and API info
- `GET /api-docs` - Swagger documentation (coming soon)

#### **Dogs Collection**
- `GET /api/dogs` - Get all dog breeds
- `GET /api/dogs/:id` - Get specific dog breed
- `POST /api/dogs` - Create new dog breed
- `PUT /api/dogs/:id` - Update dog breed
- `DELETE /api/dogs/:id` - Delete dog breed

#### **Cats Collection**
- `GET /api/cats` - Get all cat breeds
- `GET /api/cats/:id` - Get specific cat breed
- `POST /api/cats` - Create new cat breed
- `PUT /api/cats/:id` - Update cat breed
- `DELETE /api/cats/:id` - Delete cat breed

### 🏃‍♂️ **Getting Started**

#### **Prerequisites**
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account

#### **Installation**
```bash
# Clone the repository
git clone https://github.com/donaldpolidor/paws-and-whiskers-api.git
cd paws-and-whiskers-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB credentials

# Run the application
npm run dev