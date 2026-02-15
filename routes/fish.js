const express = require('express');
const router = express.Router();
const Fish = require('../models/Fish');
const { protect, admin } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Fish
 *   description: Operations about fish species
 */

/**
 * @swagger
 * /api/fish:
 *   get:
 *     summary: Get all fish species
 *     tags: [Fish]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Fish"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get('/', async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json(fish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fish/{id}:
 *   get:
 *     summary: Get a fish species by ID
 *     tags: [Fish]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fish species ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Fish"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
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

/**
 * @swagger
 * /api/fish:
 *   post:
 *     summary: Create a new fish species
 *     tags: [Fish]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Fish"
 *     responses:
 *       201:
 *         description: Fish created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Fish"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       401:
 *         description: Not authorized
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const fish = new Fish(req.body);
    await fish.save();
    res.status(201).json(fish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fish/{id}:
 *   put:
 *     summary: Update a fish species
 *     tags: [Fish]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fish species ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Fish"
 *     responses:
 *       200:
 *         description: Fish updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Fish"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       401:
 *         description: Not authorized
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
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

/**
 * @swagger
 * /api/fish/{id}:
 *   delete:
 *     summary: Delete a fish species
 *     tags: [Fish]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fish species ID
 *     responses:
 *       200:
 *         description: Fish deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fish deleted successfully"
 *       401:
 *         description: Not authorized
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
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