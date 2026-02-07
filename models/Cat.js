const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
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
  coatLength: {
    type: String,
    enum: ["Short", "Medium", "Long"],
    required: true
  },
  temperament: [String],
  intelligence: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  vocalization: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  imageUrl: String
}, {
  timestamps: true
});

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
