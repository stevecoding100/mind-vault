const express = require("express");
const ideaController = require("../controllers/ideaController");
const userController = require("../controllers/userController");

const router = express.Router();

//Route to fetch all ideas
router.get(
    "/ideas/:userId",
    userController.isLoggedIn,
    ideaController.getAllIdeas
);

// Route to create a new idea
router.post(
    "/ideas/:userId",
    userController.isLoggedIn,
    ideaController.createIdea
);

// Route to update an existing idea
router.put(
    "/ideas/:ideaId",
    userController.isLoggedIn,
    ideaController.updateIdea
);

//  Route to get single idea
router.get(
    "/ideas/:ideaId",
    userController.isLoggedIn,
    ideaController.getIdeaById
);

// Route to delete an idea
router.delete(
    "/ideas/:ideaId",
    userController.isLoggedIn,
    ideaController.deleteIdea
);

module.exports = router;
