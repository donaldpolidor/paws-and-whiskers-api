const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: [true, "Breed name is required"],
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
  energyLevel: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  temperament: [String],
  goodWithKids: {
    type: Boolean,
    default: false
  },
  shedding: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  imageUrl: String
}, {
  timestamps: true
});

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
