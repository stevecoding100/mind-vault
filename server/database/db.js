// Database connection

const pg = require("pg");
require("dotenv").config();

const client = new pg.Client(process.env.DATABASE_URL);

const createTables = async () => {
    const SQL = `
    -- MindVault DB

    DROP TABLE IF EXISTS users CASCADE; -- Drop users table and dependent objects
    DROP TABLE IF EXISTS ideas CASCADE;
    DROP TABLE IF EXISTS favorites;
  
    -- Create users table
    CREATE TABLE users (
      user_id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create ideas table
    CREATE TABLE ideas (
      idea_id UUID PRIMARY KEY,
      title  VARCHAR(250) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(20) NOT NULL,
      user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create favorites table
    CREATE TABLE favorites (
      favorite_id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
      idea_id UUID REFERENCES ideas(idea_id) ON DELETE CASCADE,
      CONSTRAINT unique_favorite UNIQUE (user_id, idea_id)
    );
  `;
    await client.query(SQL);
};

module.exports = { client, createTables };
