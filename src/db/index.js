dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'event',
    password: '123456789',
    port: 5432,
});

module.exports = pool;