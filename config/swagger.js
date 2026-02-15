// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Paws & Whiskers API",
      version: "1.0.0",
      description: "Auto-generated Swagger docs for my Express API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    // This enables the 🔒 Authorize button globally
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, "../routes/*.js")], // look for @swagger comments
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
