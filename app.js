const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express"); 
const swaggerSpec = require("./config/swagger");

require("dotenv").config();

const app = express();

// Serve swagger.json directly
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware
app.use(express.json());

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

connectDB();

// Import routes
const dogsRoutes = require("./routes/dogs");
const catsRoutes = require("./routes/cats");
const oauthRoutes = require("./routes/oauthRoutes");


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
app.use("/auth", oauthRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["/", "/api/dogs", "/api/cats"]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
