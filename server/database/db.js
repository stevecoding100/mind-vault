const pg = require("pg");
require("dotenv").config();

const client = new pg.Client(process.env.DATABASE_URL);

const createTables = async () => {
    const SQL = `
      -- MindVault DB

      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create ideas table
      CREATE TABLE IF NOT EXISTS ideas (
        idea_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title  VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(20) NOT NULL,
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create favorites table
      CREATE TABLE IF NOT EXISTS favorites (
        favorite_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        idea_id UUID REFERENCES ideas(idea_id) ON DELETE CASCADE,
        CONSTRAINT unique_favorite UNIQUE (user_id, idea_id)
      );
    `;
    await client.query(SQL);
};

module.exports = { client, createTables };
