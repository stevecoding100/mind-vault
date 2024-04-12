const express = require("express");
const ideaController = require("../controllers/ideaController");

const router = express.Router();

//Route to fetch all ideas
router.get("/ideas", ideaController.getAllIdeas);

// Route to create a new idea
router.post("/ideas", ideaController.createIdea);

// Route to update an existing idea
router.put("/ideas/:id", ideaController.updateIdea);

// Route to delete an idea
router.delete("/ideas/:id", ideaController.deleteIdea);

module.exports = router;
