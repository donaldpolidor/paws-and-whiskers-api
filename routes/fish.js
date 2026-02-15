const express = require('express');
const router = express.Router();
const Fish = require('../models/Fish');
const { protect, admin } = require('../middleware/auth');

// GET all fish
router.get('/', async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json(fish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET fish by ID
router.get('/:id', async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);
    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' });
    }
    res.json(fish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create fish (protégé - ADMIN seulement)
router.post('/', protect, admin, async (req, res) => {
  try {
    const fish = new Fish(req.body);
    await fish.save();
    res.status(201).json(fish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update fish (protégé - ADMIN seulement)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const fish = await Fish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' });
    }
    res.json(fish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE fish (protégé - ADMIN seulement)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const fish = await Fish.findByIdAndDelete(req.params.id);
    if (!fish) {
      return res.status(404).json({ error: 'Fish not found' });
    }
    res.json({ message: 'Fish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;