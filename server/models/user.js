const uuid = require("uuid");
require("dotenv").config();
const { client } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

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
        const hashedPassword = await bcrypt.hash(password, 5);
        try {
            const SQL = `INSERT INTO users (name, username, email, password,) VALUE ($1,$2,$3,$4) RETURNING *`;
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
            const SQL = `UPDATE users SET name = $1, username = $2, email = $3, WHERE userId = $4 RETURNING *`;
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
            const SQL = `DELETE FROM users WHERE id = $1`;
            const response = await client.query(SQL, [userId]);
            // Return the deleted user
            return response.rows[0];
        } catch (error) {
            console.error("Error deleting user: ", error);
            throw error;
        }
    },
};

module.exports = userModel;
