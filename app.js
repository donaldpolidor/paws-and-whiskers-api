const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport'); 
require("dotenv").config();

const app = express();

// Session middleware (for OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configuration CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true
}));

app.use(express.json());

// Importez et utilisez la connexion DB
const connectDB = require("./config/db");
connectDB();

// Swagger Documentation
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swaggerConfig");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", 
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Paws & Whiskers API",
    swaggerOptions: {
      persistAuthorization: true
    }
  })
);

// Import routes
const authRoutes = require("./routes/auth");
const dogsRoutes = require("./routes/dogs");
const catsRoutes = require("./routes/cats");
const birdsRoutes = require("./routes/birds");
const fishRoutes = require("./routes/fish");

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Paws & Whiskers Database API",
    version: "1.0.0",
    documentation: "/api-docs",
    endpoints: {
      auth: "/api/auth",
      dogs: "/api/dogs",
      cats: "/api/cats",
      birds: "/api/birds",
      fish: "/api/fish"
    }
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogsRoutes);
app.use("/api/cats", catsRoutes);
app.use("/api/birds", birdsRoutes);
app.use("/api/fish", fishRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

module.exports = app;