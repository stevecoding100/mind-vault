const express = require("express");
const ideaController = require("../controllers/ideaController");
const userController = require("../controllers/userController");

const router = express.Router();

//Route to fetch all ideas
router.get("/ideas", userController.isLoggedIn, ideaController.getAllIdeas);

// Route to create a new idea
router.post("/ideas/:userID", ideaController.createIdea);

// Route to update an existing idea
router.put("/ideas/:ideaId", ideaController.updateIdea);

//  Route to geta single idea
router.get("/ideas/:ideaId", ideaController.getIdeaById);

// Route to delete an idea
router.delete("/ideas/:ideaId", ideaController.deleteIdea);

module.exports = router;
