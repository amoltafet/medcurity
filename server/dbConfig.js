require('dotenv').config();
const mysql = require('mysql2')

/**
* Provides the database info for user/query/admin controllers to query the mySQL database.
*/

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE 
})

module.exports = db;