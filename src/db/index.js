dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'event',
    password: '123456789',
    port: 5432,
});

console.log(process.env.DB_USER);

module.exports = pool;