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
    enum: {
      values: ["Small", "Medium", "Large"],
      message: "{VALUE} is not a valid size. Must be Small, Medium, or Large"
    },
    required: [true, "Size is required"]
  },
  color: {
    type: String,
    required: [true, "Color is required"]
  },
  talkingAbility: {
    type: Number,
    min: [1, "Talking ability must be at least 1"],
    max: [5, "Talking ability cannot exceed 5"],
    default: 1
  },
  flightAbility: {
    type: String,
    enum: {
      values: ["Poor", "Moderate", "Excellent"],
      message: "{VALUE} is not a valid flight ability"
    },
    default: "Excellent"
  },
  temperament: [String],
  imageUrl: String
}, {
  timestamps: true
});

const Bird = mongoose.model("Bird", birdSchema);
module.exports = Bird;