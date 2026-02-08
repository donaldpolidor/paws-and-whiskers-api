const express = require("express");
const router = express.Router();
const Cat = require("../models/Cat");
const {getAllCats, getCatById, postCat, updateCat, deleteCat} = require("../controllers/catControllers");

// GET all cats
router.get("/", getAllCats);

// GET single cat
router.get("/:id", getCatById);

// POST create cat
router.post("/", postCat);

router.put("/:id", updateCat)

router.delete("/:id", deleteCat)
  

module.exports = router;
