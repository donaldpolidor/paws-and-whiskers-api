const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuration CORS améliorée pour Swagger
app.use(cors({
  origin: "*",  // Permet toutes les origines
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true
}));

app.use(express.json());

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => console.error(" MongoDB Connection Error:", err.message));

// Swagger Documentation
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Paws & Whiskers Database API",
      version: "1.0.0",
      description: "API for dog and cat breeds database"
    },
    servers: [
      { url: "https://paws-and-whiskers-api.onrender.com" },
      { url: "http://localhost:3000" }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", 
  swaggerUi.serve,
  (req, res, next) => {
    // Force les headers CORS pour Swagger
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Paws & Whiskers API"
  })
);

// Import routes
const dogsRoutes = require("./routes/dogs");
const catsRoutes = require("./routes/cats");

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Paws & Whiskers Database API",
    version: "1.0.0",
    documentation: "/api-docs",
    endpoints: {
      dogs: "/api/dogs",
      cats: "/api/cats"
    }
  });
});

// API Routes
app.use("/api/dogs", dogsRoutes);
app.use("/api/cats", catsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(" Server running on port " + PORT);
  console.log(" Swagger UI: http://localhost:" + PORT + "/api-docs");
});

module.exports = app;
