const express = require("express");
const router = express.Router();
const Cat = require("../models/Cat");  


/**
 * @swagger
 * /api/cats:
 *   get:
 *     summary: Get all cat breeds
 *     tags: [Cats]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Cat"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/", async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/cats/{id}:
 *   get:
 *     summary: Get a cat breed by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cat breed ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cat"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
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

/**
 * @swagger
 * /api/cats:
 *   post:
 *     summary: Create a new cat breed
 *     tags: [Cats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Cat"
 *     responses:
 *       201:
 *         description: Cat breed created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cat"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/", async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/cats/{id}:
 *   put:
 *     summary: Update a cat breed
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cat breed ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Cat"
 *     responses:
 *       200:
 *         description: Cat breed updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cat"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.put("/:id", async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/cats/{id}:
 *   delete:
 *     summary: Delete a cat breed
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cat breed ID
 *     responses:
 *       200:
 *         description: Cat breed deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cat deleted successfully"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.delete("/:id", async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }
    res.json({ message: "Cat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;