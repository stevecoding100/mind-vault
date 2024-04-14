// Handling business logic for UserControllers

const userModel = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, username, email, password } = req.body;
            const newUser = await userModel.createUser(
                name,
                username,
                email,
                password
            );
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const { name, username, email } = req.body;
        try {
            const updateUser = await userModel.updateUser(
                userId,
                name,
                username,
                email
            );
            res.json(updateUser);
        } catch (error) {
            console.error("Error updating user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            await userModel.deleteUser(userId);
            res.json({ message: "User deleted successfully!" });
        } catch (error) {
            console.error("Error deleting user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    authenticaUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await authMiddleware.authenticate(username, password);
            res.status(200).json(user);
        } catch (error) {
            console.error("Authentication error:", error);
            res.status(error.status || 500).json("Internal server error");
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            const token = req.headers.authorization; // Get the token from the request headers

            console.log("Token received in middleware:", token);
            // Verify the token and get user information
            const user = await authMiddleware.findUserWithToken(token);
            if (!token) {
                const error = new Error("Authentication token is missing");
                error.status = 401;
                throw error;
            }

            req.user = user;
            // Call the next middleware or route handler
            next();
        } catch (error) {
            next(error);
        }
    },
};
module.exports = userController;
