// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Dog = require("./models/Dog");
const Cat = require("./models/Cat");

const dogs = [
  {
    breed: "Golden Retriever",
    lifespan: "10-12 years",
    size: "Large",
    energyLevel: 4,
    temperament: ["Friendly", "Intelligent"],
    goodWithKids: true,
    shedding: "High"
  },
  {
    breed: "Beagle",
    lifespan: "12-15 years",
    size: "Medium",
    energyLevel: 4,
    temperament: ["Friendly", "Curious"],
    goodWithKids: true,
    shedding: "Medium"
  }
];

const cats = [
  {
    breed: "Siamese",
    lifespan: "15-20 years",
    size: "Medium",
    coatLength: "Short",
    temperament: ["Vocal", "Social"],
    intelligence: 5,
    vocalization: 5
  }
];

async function seed() {
  try {
    console.log(" Seeding database...");
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB");
    
    // Clear existing
    await Dog.deleteMany({});
    await Cat.deleteMany({});
    
    // Insert dogs
    const insertedDogs = await Dog.insertMany(dogs);
    console.log(` Added ${insertedDogs.length} dogs`);
    
    // Insert cats
    const insertedCats = await Cat.insertMany(cats);
    console.log(` Added ${insertedCats.length} cats`);
    
    console.log(" Seeding completed!");
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error(" Error:", error.message);
  }
}

seed();