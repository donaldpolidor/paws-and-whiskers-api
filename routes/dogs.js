const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const {getAllDogs, getDogById, postDog, updateDog, deleteDog} = require("../controllers/dogControllers");

// GET all dogs
router.get("/", getAllDogs);

// GET single dog
router.get("/:id", getDogById);

// POST create dog
router.post("/", postDog);

module.exports = router;



// PUT update dog
router.put("/:id", updateDog)

// DELETE dog
router.delete("/:id", deleteDog);

module.exports = router;
