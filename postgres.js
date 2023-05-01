const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'image_uploader',
  host: 'localhost',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;