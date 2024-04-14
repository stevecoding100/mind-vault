const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../database/db");
const JWT = process.env.JWT;

const authMiddleware = {
    authenticate: async (username, password) => {
        const SQL = `
            SELECT * FROM users WHERE username = $1
        `;
        const response = await client.query(SQL, [username]);
        if (!response.rows.length) {
            const error = new Error("User not found");
            error.status = 401;
            throw error;
        }
        const user = response.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error = new Error("Incorrect password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ id: user.user_id }, JWT);
        return { token, userId: user.user_id };
    },
    findUserWithToken: async (token) => {
        try {
            // Verify the JWT token
            const payload = jwt.verify(token, JWT);

            // Fetch the user from the database using the user_id from the token
            const SQL = `SELECT * FROM users WHERE user_id = $1`;
            const response = await client.query(SQL, [payload.user_id]);

            // If user not found, throw an error
            if (response.rows.length === 0) {
                throw new Error("User not found");
            }
            // Return the user
            return response.rows[0];
        } catch (error) {
            throw new Error("Invalid token");
        }
    },
};

module.exports = authMiddleware;
