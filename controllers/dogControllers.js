const mongoose = require('mongoose');
const Dog = require('../models/Dog');

// Get all dogs
const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDog = async (req, res) =>{
  try {
    const dog = new Dog(req.body);
    await dog.save();
    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getAllDogs, getDogById, postDog, updateDog, deleteDog}