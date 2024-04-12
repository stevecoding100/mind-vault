// Managing the users data logic, including database operations, data validation, and business rules.
const uuid = require("uuid");
require("dotenv").config();
const { client } = require("../database/db");
const bcrypt = require("bcrypt");

const userModel = {
    getAllUsers: async () => {
        try {
            const SQL = `SELECT * FROM users`;
            const { rows } = await client.query(SQL);
            return rows;
        } catch (error) {
            console.error("Error fetching users: ", error);
            throw error;
        }
    },
    createUser: async (name, username, email, password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 5);
            const SQL = `INSERT INTO users (user_id, name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [uuid.v4(), name, username, email, hashedPassword];
            const { rows } = await client.query(SQL, values);
            return rows[0];
        } catch (error) {
            console.error("Error creating user", error);
            throw error;
        }
    },
    updateUser: async (userId, name, username, email) => {
        try {
            const SQL = `UPDATE users SET name = $1, username = $2, email = $3 WHERE user_id = $4 RETURNING *`;
            const values = [name, username, email, userId];
            const { rows } = await client.query(SQL, values);
            return rows[0];
        } catch (error) {
            console.error("Error updating user: ", error);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            const SQL = `DELETE FROM users WHERE user_id = $1`;
            await client.query(SQL, [userId]);
            return true;
        } catch (error) {
            console.error("Error deleting user: ", error);
            throw error;
        }
    },
};

module.exports = userModel;
