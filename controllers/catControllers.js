const mongoose = require('mongoose');
const Cat = require('../models/Cat');

/**
 * @swagger
 * tags:
 *   name: Cats
 *   description: Cat management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cat:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *         name:
 *           type: string
 *           example: Whiskers
 *         age:
 *           type: number
 *           example: 3
 *         breed:
 *           type: string
 *           example: Persian
 *       example:
 *         _id: 65f2c9d8a12b3c4d5e6f7890
 *         name: Whiskers
 *         age: 3
 *         breed: Persian
 */

/**
 * @swagger
 * /api/cats:
 *   get:
 *     summary: Get all cats
 *     tags: [Cats]
 *     responses:
 *       200:
 *         description: List of cats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cat'
 *       500:
 *         description: Server error
 */
const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cat ID
 *     responses:
 *       200:
 *         description: Cat found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
const getCatById = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cats:
 *   post:
 *     summary: Create a new cat
 *     tags: [Cats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cat'
 *     responses:
 *       201:
 *         description: Cat created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *       500:
 *         description: Server error
 */
const postCat = async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cats/{id}:
 *   put:
 *     summary: Update a cat
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cat'
 *     responses:
 *       200:
 *         description: Cat updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cat'
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
const updateCat = async (req, res) => {
  try {
    const cat = await Cat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cats/{id}:
 *   delete:
 *     summary: Delete a cat
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cat deleted
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
const deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    res.status(200).json({ message: 'Cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCats,
  getCatById,
  postCat,
  updateCat,
  deleteCat
};
