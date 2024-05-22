// Handling business logic for UserControllers

const userModel = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const userController = {
    getUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const users = await userModel.getUserById(userId);
            res.json(users);
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            res.status(500).json({
                message: "UserController error fetching user by ID",
            });
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, username, email, password } = req.body;

            const user = await userModel.createUser(
                name,
                username,
                email,
                password
            );
            const token = jwt.sign({ id: user.user_id }, JWT_SECRET);

            // Respond with token and user data
            res.status(201).json({
                token,
                user,
            });
        } catch (error) {
            console.error("Error creating user: ", error);
            res.status(500).json({
                message: "UserController error creating user",
            });
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
            res.status(500).json({
                message: "UserController error updating user",
            });
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            await userModel.deleteUser(userId);
            res.json({ message: "User deleted successfully!" });
        } catch (error) {
            console.error("Error deleting user", error);
            res.status(500).json({
                message: " UserController error deleting user",
            });
        }
    },
    authenticaUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const { token, user } = await authMiddleware.authenticate(
                username,
                password
            );
            if (!user) {
                return res.status(401).json({
                    message: "Invalid username or password",
                });
            }

            res.status(200).json({
                token,
                user,
            });
        } catch (error) {
            console.error("Authentication error:", error);
            res.status(error.status || 500).json(
                "UserController error authenticating user"
            );
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1]; // Get the token from the request headers
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Authentication token is missing" });
            }
            const user = await authMiddleware.findUserWithToken(token);
            req.user = user;
            next();
        } catch (error) {
            console.error("Authentication error:", error);
            res.status(error.status || 500).json({ message: error.message });
        }
    },
};
module.exports = userController;
