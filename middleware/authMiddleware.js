const jwt = require("jsonwebtoken");

// Middleware to protect routes and ensure the user is authenticated
const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

// Middleware to restrict access to admin-only routes
const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
};