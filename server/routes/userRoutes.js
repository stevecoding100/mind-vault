const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//Route to fetch all users
router.get("/user/:userId", userController.getUserById);

// Route to create a new user
router.post("/users/signup", userController.createUser);

// Route to update an existing user
router.put("/users/:userId", userController.updateUser);

// Route to delete a user
router.delete("/users/:userId", userController.deleteUser);

// Route to login an existing user
router.post("/users/login", userController.authenticaUser);

module.exports = router;
