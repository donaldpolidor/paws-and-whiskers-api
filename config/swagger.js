// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0", // version of OpenAPI
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "Auto-generated Swagger docs for my Express API",
    },
  },
  // Paths to files containing OpenAPI definitions (your routes/controllers)
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;