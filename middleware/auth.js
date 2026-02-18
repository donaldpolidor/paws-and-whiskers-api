// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Not authorized to access this route',
        code: 'NO_TOKEN'
      });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        error: 'Not authorized to access this route',
        code: 'INVALID_TOKEN'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Allow only administrators
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ 
      error: 'Admin access required',
      code: 'ADMIN_ONLY'
    });
  }
};

// Middleware to verify whether the user is logged in via OAuth
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Not authenticated',
    code: 'NOT_AUTHENTICATED'
  });
};