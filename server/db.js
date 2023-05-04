const { Pool } = require("pg");
// const Pool = require("pg").Pool
require('dotenv').config();

const pool = new Pool({
    user: process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'mealprepp'
})

module.exports = pool;

