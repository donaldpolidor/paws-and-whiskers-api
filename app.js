const express = require('express');
const connectDB = require('./config/db');
const { swaggerSpec} = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to Database
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Paws & Whiskers Database API',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;