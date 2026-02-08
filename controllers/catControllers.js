const mongoose = require('mongoose');
const Cat = require('../models/Cat');

// Get all cats
const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postCat = async (req, res) =>{
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const updateCat = async(req, res) => {
  try {
    const cat = await Cat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const deleteCat = async (req, res) =>{
  try {
    const cat = Cat.findByIdAndDelete(req.params.id)
    if(!cat){
      return res.status(404).json({ error: "Cat not found" });
    }
    res.status(200).json({message: "Cat deleted successfully"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {getAllCats, getCatById, postCat, updateCat, deleteCat}