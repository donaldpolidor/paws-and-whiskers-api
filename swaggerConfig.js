// swaggerConfig.js
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Paws & Whiskers Database API",
      version: "1.0.0",
      description: "API for dog and cat breeds database",
      contact: {
        name: "API Support",
        email: "support@pawsandwhiskers.com"
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
              description: "Name of the cat breed"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the breed"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category"
            },
            coatLength: {
              type: "string",
              enum: ["Short", "Medium", "Long"],
              description: "Length of the coat"
            },
            temperament: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of temperament traits"
            },
            intelligence: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Intelligence rating (1-5)"
            },
            vocalization: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Vocalization level (1-5)"
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the breed"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          example: {
            breed: "Siamese",
            lifespan: "15-20 years",
            size: "Medium",
            coatLength: "Short",
            temperament: ["Vocal", "Social", "Intelligent"],
            intelligence: 5,
            vocalization: 5,
            imageUrl: "https://example.com/siamese.jpg"
          }
        },
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
              description: "Name of the dog breed"
            },
            lifespan: {
              type: "string",
              description: "Average lifespan of the breed"
            },
            size: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
              description: "Size category"
            },
            energyLevel: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Energy level rating (1-5)"
            },
            temperament: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of temperament traits"
            },
            goodWithKids: {
              type: "boolean",
              description: "Whether the breed is good with children"
            },
            shedding: {
              type: "string",
              enum: ["Low", "Medium", "High"],
              description: "Shedding level"
            },
            imageUrl: {
              type: "string",
              description: "URL to an image of the breed"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          example: {
            breed: "Golden Retriever",
            lifespan: "10-12 years",
            size: "Large",
            energyLevel: 4,
            temperament: ["Friendly", "Intelligent", "Devoted"],
            goodWithKids: true,
            shedding: "High",
            imageUrl: "https://example.com/golden-retriever.jpg"
          }
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message"
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Resource not found"
              }
            }
          }
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Validation failed: breed is required"
              }
            }
          }
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                error: "Internal server error occurred"
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Cats",
        description: "Operations about cat breeds"
      },
      {
        name: "Dogs",
        description: "Operations about dog breeds"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerOptions;