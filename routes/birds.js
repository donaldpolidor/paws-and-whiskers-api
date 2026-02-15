const express = require('express');
const router = express.Router();
const Bird = require('../models/Bird');
const { protect, admin } = require('../middleware/auth');

/**
 * @swagger
 * /api/birds:
 *   get:
 *     summary: Get all bird species
 *     tags: [Birds]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Bird"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get('/', async (req, res) => {
  try {
    const birds = await Bird.find();
    res.json(birds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/birds/{id}:
 *   get:
 *     summary: Get a bird species by ID
 *     tags: [Birds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get('/:id', async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) {
      return res.status(404).json({ error: 'Bird not found' });
    }
    res.json(bird);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/birds:
 *   post:
 *     summary: Create a new bird species
 *     tags: [Birds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bird"
 *     responses:
 *       201:
 *         description: Bird created successfully
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       401:
 *         description: Not authorized
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const bird = new Bird(req.body);
    await bird.save();
    res.status(201).json(bird);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/birds/{id}:
 *   put:
 *     summary: Update a bird species
 *     tags: [Birds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bird"
 *     responses:
 *       200:
 *         description: Bird updated successfully
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
    const bird = await Bird.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bird) {
      return res.status(404).json({ error: 'Bird not found' });
    }
    res.json(bird);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/birds/{id}:
 *   delete:
 *     summary: Delete a bird species
 *     tags: [Birds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Bird deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const bird = await Bird.findByIdAndDelete(req.params.id);
    if (!bird) {
      return res.status(404).json({ error: 'Bird not found' });
    }
    res.json({ message: 'Bird deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;