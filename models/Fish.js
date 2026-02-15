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
    enum: {
      values: ["Small", "Medium", "Large"],
      message: "{VALUE} is not a valid size. Must be Small, Medium, or Large"
    },
    required: [true, "Size is required"]
  },
  waterType: {
    type: String,
    enum: {
      values: ["Freshwater", "Saltwater", "Brackish"],
      message: "{VALUE} is not a valid water type"
    },
    required: [true, "Water type is required"]
  },
  temperament: {
    type: String,
    enum: {
      values: ["Peaceful", "Semi-aggressive", "Aggressive"],
      message: "{VALUE} is not a valid temperament"
    },
    default: "Peaceful"
  },
  careLevel: {
    type: String,
    enum: {
      values: ["Easy", "Moderate", "Difficult"],
      message: "{VALUE} is not a valid care level"
    },
    default: "Easy"
  },
  imageUrl: String
}, {
  timestamps: true
});

const Fish = mongoose.model("Fish", fishSchema);
module.exports = Fish;