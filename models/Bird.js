const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
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
  color: {
    type: String,
    required: [true, "Color is required"]
  },
  talkingAbility: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  flightAbility: {
    type: String,
    enum: ["Poor", "Moderate", "Excellent"],
    default: "Excellent"
  },
  temperament: [String],
  imageUrl: String
}, {
  timestamps: true
});

const Bird = mongoose.model("Bird", birdSchema);
module.exports = Bird;