const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.LOCAL_PG_USER,
    host: 'localhost',
    database: process.env.LOCAL_PG_DB,
    password: process.env.LOCAL_PG_PASSWORD,
    port: 5432
});

module.exports = pool;