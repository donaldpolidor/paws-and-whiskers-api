const express = require("express");
const Cat = require("../models/Cat");

const router = express.Router();
const {
  getAllCats,
  getCatById,
  postCat,
  updateCat,
  deleteCat
} = require("../controllers/catControllers");

/**
 * @swagger
 * tags:
 *   name: Cats
 *   description: Cat management API
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
 *       500:
 *         description: Server error
 */
router.get("/", getAllCats);

/**
 * @swagger
 * /api/cats/{id}:
 *   get:
 *     summary: Get a single cat by ID
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
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getCatById);

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
 *         description: Cat created successfully
 *       500:
 *         description: Server error
 */
router.post("/", postCat);

/**
 * @swagger
 * /api/cats/{id}:
 *   put:
 *     summary: Update a cat by ID
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
 *         description: Cat updated successfully
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateCat);

/**
 * @swagger
 * /api/cats/{id}:
 *   delete:
 *     summary: Delete a cat by ID
 *     tags: [Cats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cat deleted successfully
 *       404:
 *         description: Cat not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteCat);

module.exports = router;
