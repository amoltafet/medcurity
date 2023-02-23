require('dotenv').config();
const mysql = require('mysql2')

/**
* Provides the database info for user/query/admin controllers to query the mySQL database.
*/
// catch errors
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'med.mysql.database.azure.com',
    user: process.env.DB_USER || 'medcurity',
    password: process.env.DB_PASS || 'Learn4good!',
    database: process.env.DB_DATABASE || 'medcurity',
    port: process.env.DB_PORT || 3306,
})

module.exports = db;