// swaggerConfig.js
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Paws & Whiskers Database API",
      version: "1.0.0",
      description: "API for dog, cat, bird and fish breeds database with JWT authentication",
      contact: {
        name: "API Support",
        email: "support@pawsandwhiskers.com",
        url: "https://github.com/donaldpolidor/paws-and-whiskers-api"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "https://paws-and-whiskers-api.onrender.com",
        description: "Production server"
      },
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ],
    components: {
      schemas: {
        // CAT Schema
        Cat: {
          type: "object",
          required: ["breed", "lifespan", "size", "coatLength", "intelligence", "vocalization"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier"
            },
            breed: {
              type: "string",
              description: "Name of the cat breed",
              example: "Siamese"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the breed",
              example: "15-20 years"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category",
              example: "Medium"
            },
            coatLength: {
              type: "string",
              enum: ["Short", "Medium", "Long"],
              description: "Length of the coat",
              example: "Short"
            },
            temperament: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of temperament traits",
              example: ["Vocal", "Social", "Intelligent"]
            },
            intelligence: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Intelligence rating (1-5)",
              example: 5
            },
            vocalization: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Vocalization level (1-5)",
              example: 5
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the breed",
              example: "https://example.com/siamese.jpg"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        
        // DOG Schema
        Dog: {
          type: "object",
          required: ["breed", "lifespan", "size", "energyLevel"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier"
            },
            breed: {
              type: "string",
              description: "Name of the dog breed",
              example: "Golden Retriever"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the breed",
              example: "10-12 years"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category",
              example: "Large"
            },
            energyLevel: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Energy level rating (1-5)",
              example: 4
            },
            temperament: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of temperament traits",
              example: ["Friendly", "Intelligent", "Devoted"]
            },
            goodWithKids: {
              type: "boolean",
              description: "Whether the breed is good with children",
              example: true
            },
            shedding: {
              type: "string",
              enum: ["Low", "Medium", "High"],
              description: "Shedding level",
              example: "High"
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the breed",
              example: "https://example.com/golden-retriever.jpg"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        
        // BIRD Schema
        Bird: {
          type: "object",
          required: ["species", "lifespan", "size", "color"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier"
            },
            species: {
              type: "string",
              description: "Name of the bird species",
              example: "Cockatiel"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the species",
              example: "15-20 years"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category",
              example: "Small"
            },
            color: {
              type: "string",
              description: "Primary color of the bird",
              example: "Grey with yellow"
            },
            talkingAbility: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Talking ability rating (1-5)",
              example: 3
            },
            flightAbility: {
              type: "string",
              enum: ["Poor", "Moderate", "Excellent"],
              description: "Flight ability level",
              example: "Excellent"
            },
            temperament: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of temperament traits",
              example: ["Gentle", "Playful", "Social"]
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the bird",
              example: "https://example.com/cockatiel.jpg"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        
        // FISH Schema
        Fish: {
          type: "object",
          required: ["species", "lifespan", "size", "waterType"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier"
            },
            species: {
              type: "string",
              description: "Name of the fish species",
              example: "Betta"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the species",
              example: "3-5 years"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category",
              example: "Small"
            },
            waterType: {
              type: "string",
              enum: ["Freshwater", "Saltwater", "Brackish"],
              description: "Type of water required",
              example: "Freshwater"
            },
            temperament: {
              type: "string",
              enum: ["Peaceful", "Semi-aggressive", "Aggressive"],
              description: "Temperament of the fish",
              example: "Semi-aggressive"
            },
            careLevel: {
              type: "string",
              enum: ["Easy", "Moderate", "Difficult"],
              description: "Difficulty level of care",
              example: "Easy"
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the fish",
              example: "https://example.com/betta.jpg"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        
        // USER Schema
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier"
            },
            username: {
              type: "string",
              description: "Unique username",
              example: "johndoe"
            },
            email: {
              type: "string",
              format: "email",
              description: "Unique email address",
              example: "john@example.com"
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "User role",
              default: "USER",
              example: "USER"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        
        // AUTH Response Schema
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            token: {
              type: "string",
              description: "JWT token for authentication",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            },
            user: {
              $ref: "#/components/schemas/User"
            }
          }
        },
        
        // ERROR Schema
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
              example: "Resource not found"
            },
            code: {
              type: "string",
              description: "Error code",
              example: "NOT_FOUND"
            }
          }
        }
      },
      
      responses: {
        // 200 Success
        Success: {
          description: "Successful operation"
        },
        
        // 201 Created
        Created: {
          description: "Resource created successfully"
        },
        
        // 400 Bad Request
        BadRequest: {
          description: "Bad request - Invalid parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              }
            }
          }
        },
        
        // 401 Unauthorized
        Unauthorized: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Not authorized to access this route",
                code: "NO_TOKEN"
              }
            }
          }
        },
        
        // 403 Forbidden
        Forbidden: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Admin access required",
                code: "ADMIN_ONLY"
              }
            }
          }
        },
        
        // 404 Not Found
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Resource not found",
                code: "NOT_FOUND"
              }
            }
          }
        },
        
        // 400 Validation Error
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Validation failed: breed is required",
                code: "VALIDATION_ERROR"
              }
            }
          }
        },
        
        // 409 Conflict
        Conflict: {
          description: "Resource already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "User already exists",
                code: "DUPLICATE_KEY"
              }
            }
          }
        },
        
        // 500 Server Error
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Internal server error occurred",
                code: "SERVER_ERROR"
              }
            }
          }
        }
      },
      
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>"
        }
      }
    },
    
    security: [
      {
        bearerAuth: []
      }
    ],
    
    tags: [
      {
        name: "Authentication",
        description: "User authentication and registration endpoints"
      },
      {
        name: "Cats",
        description: "Operations about cat breeds"
      },
      {
        name: "Dogs",
        description: "Operations about dog breeds"
      },
      {
        name: "Birds",
        description: "Operations about bird species"
      },
      {
        name: "Fish",
        description: "Operations about fish species"
      }
    ],
    
    externalDocs: {
      description: "GitHub Repository",
      url: "https://github.com/donaldpolidor/paws-and-whiskers-api"
    }
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerOptions;