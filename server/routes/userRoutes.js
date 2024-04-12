const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//Route to fetch all users
router.get("/users", userController.getAllUsers);

// Route to create a new user
router.post("/users", userController.createUser);

// Route to update an existing user
router.put("/users/:userId", userController.updateUser);

// Route to delete an idea
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
