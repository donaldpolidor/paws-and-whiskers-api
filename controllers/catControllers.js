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

module.exports = {getAllCats, getCatById, postCat}