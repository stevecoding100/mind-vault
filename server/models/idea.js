// Managing the ideas data logic, including database operations, data validation, and business rules.

const { client } = require("../database/db");
const uuid = require("uuid");
const ideaModel = {
    getAllIdeas: async () => {
        try {
            const SQL = `SELECT * FROM ideas`;
            const { rows } = await client.query(SQL);
            return rows;
        } catch (error) {
            console.error("Error fetching ideas: ", error);
            throw error;
        }
    },
    createIdea: async (title, description, category, userId) => {
        try {
            const SQL = `INSERT INTO ideas (idea_id, title, description, category, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [uuid.v4(), title, description, category, userId];
            const { rows } = await client.query(SQL, values);
            return rows[0];
        } catch (error) {
            console.error("Error creating idea", error);
            throw error;
        }
    },
    updateIdea: async (ideaId, title, description, category) => {
        try {
            const SQL = ` UPDATE ideas SET title = $1, description = $2, category = $3 WHERE idea_id = $4 RETURNING *`;
            const values = [title, description, category, ideaId];
            const { rows } = await client.query(SQL, values);
            return rows[0];
        } catch (error) {
            console.error("Error updating idea:", error);
            throw error;
        }
    },

    getIdeaById: async (ideaId) => {
        const SQL = `SELECT * FROM ideas WHERE idea_id = $1`;
        const response = await client.query(SQL, [ideaId]);
        return response.rows[0];
    },

    deleteIdea: async (ideaId) => {
        try {
            const SQL = `DELETE FROM ideas WHERE idea_id = $1`;
            await client.query(SQL, [ideaId]);
        } catch (error) {
            console.error("Error deleting idea:", error);
            throw error;
        }
    },
};
module.exports = ideaModel;
