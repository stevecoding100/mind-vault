// Middleware for authentication
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../database/db");
const JWT = process.env.JWT;
