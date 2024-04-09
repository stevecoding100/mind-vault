const { Pool } = require("pg");

// Create a new PostgreSQL connection pool
const client = new Pool({
    user: "your_database_user",
    host: "localhost",
    database: "your_database_name",
    password: "your_database_password",
    port: 5432,
});

module.exports = client;
