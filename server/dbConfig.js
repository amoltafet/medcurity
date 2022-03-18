const mysql = require('mysql2')
const serverConfig = require('./serverConfig.json')

/**
* Provides the database info for user/query/admin controllers to query the mySQL database.
*/

const db = mysql.createConnection({
    host: serverConfig.database.host,
    user: serverConfig.database.user,
    password: serverConfig.database.password,
    database: serverConfig.database.database 
})

module.exports = db;