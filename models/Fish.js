const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema({
  species: {
    type: String,
    required: [true, "Species name is required"],
    unique: true,
    trim: true
  },
  lifespan: {
    type: String,
    required: [true, "Lifespan is required"]
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: true
  },
  waterType: {
    type: String,
    enum: ["Freshwater", "Saltwater", "Brackish"],
    required: true
  },
  temperament: {
    type: String,
    enum: ["Peaceful", "Semi-aggressive", "Aggressive"],
    default: "Peaceful"
  },
  careLevel: {
    type: String,
    enum: ["Easy", "Moderate", "Difficult"],
    default: "Easy"
  },
  imageUrl: String
}, {
  timestamps: true
});

const Fish = mongoose.model("Fish", fishSchema);
module.exports = Fish;