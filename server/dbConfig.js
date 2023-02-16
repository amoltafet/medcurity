require('dotenv').config();
const mysql = require('mysql')

/**
* Provides the database info for user/query/admin controllers to query the mySQL database.
*/
// catch errors
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

module.exports = db;