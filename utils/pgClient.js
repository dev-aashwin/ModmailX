// utils/pgClient.js
// PostgreSQL client setup for XShield Bot
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  // Or use user, password, host, port, database from .env
});

module.exports = pool;
