const express = require("express");
const router = express.Router();
const Cat = require("../models/Cat");

// GET all cats
router.get("/", async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single cat
router.get("/:id", async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create cat
router.post("/", async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
