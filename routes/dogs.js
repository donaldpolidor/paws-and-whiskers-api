const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Get all dog breeds
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Dog"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Get a dog breed by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog breed ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Dog"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/dogs:
 *   post:
 *     summary: Create a new dog breed
 *     tags: [Dogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dog"
 *     responses:
 *       201:
 *         description: Dog breed created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Dog"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/", async (req, res) => {
  try {
    const dog = new Dog(req.body);
    await dog.save();
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Update a dog breed
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog breed ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Dog"
 *     responses:
 *       200:
 *         description: Dog breed updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Dog"
 *       400:
 *         $ref: "#/components/responses/ValidationError"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Delete a dog breed
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog breed ID
 *     responses:
 *       200:
 *         description: Dog breed deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dog deleted successfully"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.delete("/:id", async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;