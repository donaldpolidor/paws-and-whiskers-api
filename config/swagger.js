const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Paws & Whiskers Database API",
      version: "1.0.0",
      description: "API documentation for Paws & Whiskers",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // adjust path to where your route files live
};

const swaggerSpec = swaggerJsdoc(options);

// Write swagger.json to disk (optional)
fs.writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));

module.exports = { swaggerSpec };