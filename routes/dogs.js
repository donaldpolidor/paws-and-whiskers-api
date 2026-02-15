const express = require("express");
const Dog = require("../models/Dog");

const router = express.Router();
const {
  getAllDogs,
  getDogById,
  postDog,
  updateDog,
  deleteDog
} = require("../controllers/dogControllers");

const { protect, adminOnly } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: Dog management API
 */

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Get all dogs
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: List of dogs
 *       500:
 *         description: Server error
 */
router.get("/", getAllDogs);

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Get a single dog by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dog ID
 *     responses:
 *       200:
 *         description: Dog found
 *       404:
 *         description: Dog not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getDogById);

/**
 * @swagger
 * /api/dogs:
 *   post:
 *     summary: Create a new dog
 *     tags: [Dogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       201:
 *         description: Dog created successfully
 *       500:
 *         description: Server error
 */
router.post("/", protect, adminOnly, postDog);

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Update a dog by ID
 *     tags: [Dogs]
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
 *             $ref: '#/components/schemas/Dog'
 *     responses:
 *       200:
 *         description: Dog updated successfully
 *       404:
 *         description: Dog not found
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, adminOnly, updateDog);

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Delete a dog by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dog deleted successfully
 *       404:
 *         description: Dog not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, adminOnly, deleteDog);

module.exports = router;
