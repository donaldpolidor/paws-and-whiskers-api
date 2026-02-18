// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: false  
  },
  googleId: {         
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {           
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;